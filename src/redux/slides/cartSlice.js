import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        count: 0, // Đếm số lần sản phẩm được thêm vào, không phải số lượng sản phẩm
        status: 'idle',
        error: null
    },
    reducers: {
        addToCart: (state, action) => {
            // Sử dụng cả productId, versionId và sizeId để xác định sản phẩm duy nhất
            const existingIndex = state.items.findIndex(item =>
                item.productId === action.payload.productId &&
                item.versionId === action.payload.versionId &&
                item.sizeId === action.payload.sizeId
            );

            if (existingIndex >= 0) {
                // Nếu sản phẩm đã có trong giỏ, chỉ cập nhật số lượng
                state.items[existingIndex].quantity += action.payload.quantity;
            } else {
                // Nếu chưa có, thêm sản phẩm mới vào giỏ hàng
                state.items.push({ ...action.payload });
            }
            // Tăng count cho mỗi sản phẩm được thêm vào giỏ hàng, không phụ thuộc số lượng
            state.count += 1;
        },
        resetCartCount: (state) => {
            state.count = 0; // Reset count về 0 khi người dùng mở giỏ hàng
        },
        // Các reducer khác để quản lý việc xóa sản phẩm khỏi giỏ hàng hoặc cập nhật số lượng có thể được thêm vào nếu cần
    }
});

// Export actions
export const { addToCart, resetCartCount } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
