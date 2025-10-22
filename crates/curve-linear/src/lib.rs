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

const MAX_NUMBER_LEN: usize = 8;
const SEGMENT_LEN: usize = 1 + MAX_NUMBER_LEN + 1 + MAX_NUMBER_LEN;

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
unsafe fn write_small_uint(value: u32, out: *mut u8) -> *mut u8 {
    if value < 10 {
        *out = b'0' + value as u8;
        return out.add(1);
    }
    if value < 100 {
        let idx = (value as usize) * 2;
        *out = DIGIT_TABLE[idx];
        *out.add(1) = DIGIT_TABLE[idx + 1];
        return out.add(2);
    }
    if value < 1000 {
        let (hundreds, last) = div_mod_100(value);
        *out = b'0' + hundreds as u8;
        let idx = (last as usize) * 2;
        *out.add(1) = DIGIT_TABLE[idx];
        *out.add(2) = DIGIT_TABLE[idx + 1];
        return out.add(3);
    }
    let (thousands, rem) = div_mod_1000(value);
    let (hundreds, last) = div_mod_100(rem);
    *out = b'0' + thousands as u8;
    *out.add(1) = b'0' + hundreds as u8;
    let idx = (last as usize) * 2;
    *out.add(2) = DIGIT_TABLE[idx];
    *out.add(3) = DIGIT_TABLE[idx + 1];
    out.add(4)
}

#[inline(always)]
unsafe fn write_scaled(value: u32, out: *mut u8) -> *mut u8 {
    let (whole, fractional) = div_mod_100(value);
    let mut next = write_small_uint(whole, out);
    if fractional != 0 {
        *next = b'.';
        next = next.add(1);
        let idx = (fractional as usize) * 2;
        *next = DIGIT_TABLE[idx];
        *next.add(1) = DIGIT_TABLE[idx + 1];
        next = next.add(2);
    }
    next
}

#[inline(always)]
unsafe fn write_delta(delta: f64, mut out: *mut u8) -> *mut u8 {
    let negative = delta < 0.0;
    let scaled = if negative {
        ((-delta) * 100.0 + 0.5) as u32
    } else {
        (delta * 100.0 + 0.5) as u32
    };
    if negative {
        *out = b'-';
        out = out.add(1);
    }

    write_scaled(scaled, out)
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
    if coords_ptr.is_null() || output_ptr.is_null() || points == 0 {
        return 0;
    }
    let required_capacity = points
        .checked_mul(SEGMENT_LEN)
        .unwrap_or(usize::MAX);
    if output_capacity < required_capacity {
        return 0;
    }
    unsafe {
        let mut current_out = output_ptr;
        let mut coords_iter = coords_ptr;

        *current_out = b'M';
        current_out = current_out.add(1);
        let first_x = *coords_iter;
        coords_iter = coords_iter.add(1);
        let first_y = *coords_iter;
        coords_iter = coords_iter.add(1);
        current_out = write_delta(first_x, current_out);
        *current_out = b' ';
        current_out = current_out.add(1);
        current_out = write_delta(first_y, current_out);

        let mut prev_x = first_x;
        let mut prev_y = first_y;
        for _ in 1..points {
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
            current_out = write_delta(dx, current_out);
            *current_out = b' ';
            current_out = current_out.add(1);
            current_out = write_delta(dy, current_out);
        }

        current_out.offset_from(output_ptr) as usize
    }
}
