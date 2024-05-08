import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as UserApi from '~/services/UserService';
import apiClient from '~/axios';

// Đăng nhập người dùng
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await UserApi.Login({ email, password });
            if (response.status === 'OK' && response.accessToken) {
                localStorage.setItem('accessToken', response.accessToken);
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.accessToken}`;
                return { ...response.user, accessToken: response.accessToken };
            } else {
                return rejectWithValue(response.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue(error.response?.data?.message || "An error occurred during login.");
        }
    }
);

// Cập nhật thông tin người dùng
export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async ({ id, userDetails }, { rejectWithValue }) => {
        console.log('id at updateProfile', id)
        try {
            const response = await UserApi.UpdateProfile(id, userDetails);
            return response;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to update profile.");
        }
    }
);

// Tạo một async thunk để refresh accessToken
export const refreshAccessToken = createAsyncThunk(
    'user/refreshAccessToken',
    async (_, { getState, dispatch, rejectWithValue }) => {
        try {
            // Giả sử bạn có một API endpoint để refresh token
            const { accessToken: currentToken } = getState().user;
            const response = await UserApi.refreshToken(currentToken); // Gọi API refresh token
            if (response.status === 'OK') {
                localStorage.setItem('accessToken', response.accessToken);
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.accessToken}`;
                return response.accessToken
            } else {
                return rejectWithValue('Failed to refresh token');
            }
        } catch (error) {
            return rejectWithValue('Failed to refresh token due to an error');
        }
    }
);


const initialState = {
    name: '',
    email: '',
    phone: '',
    image: '',
    address: '',
    id: '',
    accessToken: ''
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        updateUser: (state, action) => {
            const { name, email, address, phone, image, id, accessToken } = action.payload;
            state.name = name;
            state.email = email;
            state.address = address;
            state.phone = phone || '';
            state.image = image; // Đảm bảo rằng image là URL mới nhận được từ server
            state.id = id;
            state.accessToken = accessToken || '';
        },
        resetUser: () => initialState,
    },

    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                Object.assign(state, action.payload);
            })
            .addCase(loginUser.rejected, (state, action) => {
                console.error('Login failed:', action.payload);
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                const { name, email, address, phone, image, id } = action.payload;
                state.name = name;
                state.email = email;
                state.address = address;
                state.phone = phone;
                state.image = image;
                state.id = id;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                console.error('Update profile failed:', action.payload);
            })
            .addCase(refreshAccessToken.fulfilled, (state, action) => {
                state.accessToken = action.payload.accessToken;
            })
            .addCase(refreshAccessToken.rejected, (state, action) => {
                console.error('Refresh token failed:', action.payload);
                localStorage.removeItem('accessToken');
                // Có thể thêm logic để chuyển hướng người dùng đến trang đăng nhập ở đây
            });
    },
});

export const { updateUser, resetUser } = userSlice.actions;

export default userSlice.reducer;
