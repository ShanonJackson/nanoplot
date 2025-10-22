use std::alloc::{alloc as std_alloc, dealloc as std_dealloc, Layout};
use std::ptr;

const fn build_digit_table() -> [u8; 200] {
    let mut table = [0u8; 200];
    let mut i = 0;
    while i < 100 {
        table[i * 2] = b'0' + (i / 10) as u8;
        table[i * 2 + 1] = b'0' + (i % 10) as u8;
        i += 1;
    }
    table
}

const DIGIT_TABLE: [u8; 200] = build_digit_table();

#[inline(always)]
unsafe fn write_uint(mut value: u64, out: *mut u8, end: *mut u8) -> Option<*mut u8> {
    if value < 10 {
        if out >= end {
            return None;
        }
        *out = b'0' + value as u8;
        return Some(out.add(1));
    }
    if value < 100 {
        if out.add(2) > end {
            return None;
        }
        let idx = (value as usize) * 2;
        *out = DIGIT_TABLE[idx];
        *out.add(1) = DIGIT_TABLE[idx + 1];
        return Some(out.add(2));
    }
    if value < 1_000 {
        if out.add(3) > end {
            return None;
        }
        let hundreds = value / 100;
        let rem = (value % 100) as usize;
        *out = b'0' + hundreds as u8;
        let idx = rem * 2;
        *out.add(1) = DIGIT_TABLE[idx];
        *out.add(2) = DIGIT_TABLE[idx + 1];
        return Some(out.add(3));
    }
    if value < 10_000 {
        if out.add(4) > end {
            return None;
        }
        let thousands = value / 1000;
        let rem = (value % 1000) as usize;
        let hundreds = rem / 100;
        let last = (rem % 100) as usize;
        *out = b'0' + thousands as u8;
        *out.add(1) = b'0' + hundreds as u8;
        let idx = last * 2;
        *out.add(2) = DIGIT_TABLE[idx];
        *out.add(3) = DIGIT_TABLE[idx + 1];
        return Some(out.add(4));
    }
    let mut digits = [0u8; 20];
    let mut idx = digits.len();
    while value >= 100 {
        let rem = (value % 100) as usize;
        value /= 100;
        idx -= 2;
        digits[idx] = DIGIT_TABLE[rem * 2];
        digits[idx + 1] = DIGIT_TABLE[rem * 2 + 1];
    }
    if value < 10 {
        idx -= 1;
        digits[idx] = b'0' + value as u8;
    } else {
        let rem = (value as usize) * 2;
        idx -= 2;
        digits[idx] = DIGIT_TABLE[rem];
        digits[idx + 1] = DIGIT_TABLE[rem + 1];
    }
    let len = digits.len() - idx;
    if out.add(len) > end {
        return None;
    }
    ptr::copy_nonoverlapping(digits.as_ptr().add(idx), out, len);
    Some(out.add(len))
}

#[inline(always)]
unsafe fn write_scaled(raw: u32, mut out: *mut u8, end: *mut u8) -> Option<*mut u8> {
    let negative = (raw & 0x8000_0000) != 0;
    let magnitude = (raw & 0x7fff_ffff) as u64;
    if negative {
        if out >= end {
            return None;
        }
        *out = b'-';
        out = out.add(1);
    }
    let whole = magnitude / 100;
    let frac_part = (magnitude - whole * 100) as usize;
    let mut next = write_uint(whole, out, end)?;
    if frac_part != 0 {
        if next.add(3) > end {
            return None;
        }
        *next = b'.';
        next = next.add(1);
        let idx = frac_part * 2;
        *next = DIGIT_TABLE[idx];
        *next.add(1) = DIGIT_TABLE[idx + 1];
        next = next.add(2);
    }
    Some(next)
}

#[no_mangle]
pub extern "C" fn alloc(size: usize) -> *mut u8 {
    if size == 0 {
        return std::ptr::null_mut();
    }
    let layout = Layout::from_size_align(size, 8).expect("invalid allocation layout");
    unsafe { std_alloc(layout) }
}

#[no_mangle]
pub extern "C" fn dealloc(ptr: *mut u8, size: usize) {
    if ptr.is_null() || size == 0 {
        return;
    }
    let layout = Layout::from_size_align(size, 8).expect("invalid deallocation layout");
    unsafe { std_dealloc(ptr, layout) }
}

#[no_mangle]
pub extern "C" fn linear_path(
    coords_ptr: *const u32,
    points: usize,
    output_ptr: *mut u8,
    output_capacity: usize,
) -> usize {
    if coords_ptr.is_null() || output_ptr.is_null() || points == 0 || output_capacity == 0 {
        return 0;
    }
    unsafe {
        let mut current_out = output_ptr;
        let end = output_ptr.add(output_capacity);
        let mut coords_iter = coords_ptr;

        if current_out >= end {
            return 0;
        }
        *current_out = b'M';
        current_out = current_out.add(1);
        let first_x = *coords_iter;
        coords_iter = coords_iter.add(1);
        let first_y = *coords_iter;
        coords_iter = coords_iter.add(1);
        current_out = match write_scaled(first_x, current_out, end) {
            Some(ptr) => ptr,
            None => return 0,
        };
        if current_out >= end {
            return 0;
        }
        *current_out = b' ';
        current_out = current_out.add(1);
        current_out = match write_scaled(first_y, current_out, end) {
            Some(ptr) => ptr,
            None => return 0,
        };

        for _ in 1..points {
            if current_out >= end {
                return 0;
            }
            *current_out = b'l';
            current_out = current_out.add(1);
            let x = *coords_iter;
            coords_iter = coords_iter.add(1);
            let y = *coords_iter;
            coords_iter = coords_iter.add(1);
            current_out = match write_scaled(x, current_out, end) {
                Some(ptr) => ptr,
                None => return 0,
            };
            if current_out >= end {
                return 0;
            }
            *current_out = b' ';
            current_out = current_out.add(1);
            current_out = match write_scaled(y, current_out, end) {
                Some(ptr) => ptr,
                None => return 0,
            };
        }

        current_out.offset_from(output_ptr) as usize
    }
}
