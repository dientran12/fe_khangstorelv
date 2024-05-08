import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as CateService from '~/services/CateService'
import { createSlugify } from '~/ultils/helpers';

// First, create the thunk
export const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async (_, { rejectWithValue }) => {
        try {
            const response = await CateService.getAllCategories();
            const categoriesWithSlug = response.data.map(category => ({
                ...category,
                slug: createSlugify(category.name)
            }));
            return categoriesWithSlug; // Trả về danh sách các danh mục có cả slug
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);


// Then, create the slice
export const categorySlice = createSlice({
    name: 'category',
    initialState: {
        items: [],
        status: 'idle', // Cập nhật trạng thái khởi đầu thành 'idle'
        error: null, // Khởi tạo giá trị cho 'error'
    },
    reducers: {
        addCategory: (state, action) => {
            state.items.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCategories.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload; // Lưu dữ liệu vào state
            })
            .addCase(fetchCategories.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload; // Lưu lỗi vào state nếu có
            });
    },
});

export const { addCategory } = categorySlice.actions;

export default categorySlice.reducer;
