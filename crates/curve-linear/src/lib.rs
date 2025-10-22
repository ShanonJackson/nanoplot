use std::alloc::{alloc as std_alloc, dealloc as std_dealloc, Layout};

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

const DIV100_MAGIC: u64 = 0x51EB_851F;
const DIV100_SHIFT: u32 = 37;
const DIV1000_MAGIC: u64 = 0x20C4_9BA5_E4;
const DIV1000_SHIFT: u32 = 47;

#[inline(always)]
fn div_mod_100(value: u32) -> (u32, u32) {
    let quotient = ((value as u64 * DIV100_MAGIC) >> DIV100_SHIFT) as u32;
    let remainder = value - quotient * 100;
    (quotient, remainder)
}

#[inline(always)]
fn div_mod_1000(value: u32) -> (u32, u32) {
    let quotient = ((value as u64 * DIV1000_MAGIC) >> DIV1000_SHIFT) as u32;
    let remainder = value - quotient * 1000;
    (quotient, remainder)
}

#[inline(always)]
unsafe fn write_small_uint(value: u32, out: *mut u8, end: *mut u8) -> Option<*mut u8> {
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
    if value < 1000 {
        if out.add(3) > end {
            return None;
        }
        let (hundreds, last) = div_mod_100(value);
        *out = b'0' + hundreds as u8;
        let idx = (last as usize) * 2;
        *out.add(1) = DIGIT_TABLE[idx];
        *out.add(2) = DIGIT_TABLE[idx + 1];
        return Some(out.add(3));
    }
    if out.add(4) > end {
        return None;
    }
    let (thousands, rem) = div_mod_1000(value);
    let (hundreds, last) = div_mod_100(rem);
    *out = b'0' + thousands as u8;
    *out.add(1) = b'0' + hundreds as u8;
    let idx = (last as usize) * 2;
    *out.add(2) = DIGIT_TABLE[idx];
    *out.add(3) = DIGIT_TABLE[idx + 1];
    Some(out.add(4))
}

#[inline(always)]
unsafe fn write_scaled(mut value: u32, out: *mut u8, end: *mut u8) -> Option<*mut u8> {
    let (whole, fractional) = div_mod_100(value);
    value = fractional;
    let mut next = write_small_uint(whole, out, end)?;
    if value != 0 {
        if next.add(3) > end {
            return None;
        }
        *next = b'.';
        next = next.add(1);
        let idx = (value as usize) * 2;
        *next = DIGIT_TABLE[idx];
        *next.add(1) = DIGIT_TABLE[idx + 1];
        next = next.add(2);
    }
    Some(next)
}

#[inline(always)]
unsafe fn write_delta(delta: f64, mut out: *mut u8, end: *mut u8) -> Option<*mut u8> {
    let negative = delta < 0.0;
    let scaled = if negative {
        ((-delta) * 100.0 + 0.5) as u32
    } else {
        (delta * 100.0 + 0.5) as u32
    };
    if negative {
        if out >= end {
            return None;
        }
        *out = b'-';
        out = out.add(1);
    }

    write_scaled(scaled, out, end)
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
    coords_ptr: *const f64,
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
        current_out = match write_delta(first_x, current_out, end) {
            Some(ptr) => ptr,
            None => return 0,
        };
        if current_out >= end {
            return 0;
        }
        *current_out = b' ';
        current_out = current_out.add(1);
        current_out = match write_delta(first_y, current_out, end) {
            Some(ptr) => ptr,
            None => return 0,
        };

        let mut prev_x = first_x;
        let mut prev_y = first_y;
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
            let dx = x - prev_x;
            let dy = y - prev_y;
            prev_x = x;
            prev_y = y;
            current_out = match write_delta(dx, current_out, end) {
                Some(ptr) => ptr,
                None => return 0,
            };
            if current_out >= end {
                return 0;
            }
            *current_out = b' ';
            current_out = current_out.add(1);
            current_out = match write_delta(dy, current_out, end) {
                Some(ptr) => ptr,
                None => return 0,
            };
        }

        current_out.offset_from(output_ptr) as usize
    }
}
