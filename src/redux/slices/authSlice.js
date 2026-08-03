import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../../services/authService";
import { getStorageItem, setStorageItem, removeStorageItem, STORAGE_KEYS } from "../../utils/storage";


const storedToken = getStorageItem(STORAGE_KEYS.TOKEN, null);
const storedUser = getStorageItem(STORAGE_KEYS.USER, null);
const initialState = {
  user: storedUser,
  token: storedToken,
  isAuthenticated: !!storedUser,
  isLoading: false,
  error: null
};
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authService.login(credentials);

            if (response.success) {
            removeStorageItem(STORAGE_KEYS.TOKEN);
            setStorageItem(STORAGE_KEYS.TOKEN, response.token);
            setStorageItem(STORAGE_KEYS.USER, response.data);

            return {
            success: response.success,
            user: response.data,
            token: response.token,
            };
            }

      return rejectWithValue(response.message || "Login failed");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await authService.register(userData);
      if (response.success) {
        return response;
      }
      return rejectWithValue(response.message || "Registration failed");
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (updatedData, { dispatch }) => {
    dispatch(updateUserProfile(updatedData));
    return updatedData;
  }
);
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      removeStorageItem(STORAGE_KEYS.TOKEN);
      removeStorageItem(STORAGE_KEYS.USER);
    },
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        setStorageItem(STORAGE_KEYS.USER, state.user);
      }
    },
    clearAuthError: (state) => {
      state.error = null;
    }
  },
  // extraReducers: (builder) => {
  //   builder.addCase(loginUser.pending, (state) => {
  //     state.isLoading = true;
  //     state.error = null;
  //   }).addCase(loginUser.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.isAuthenticated = true;
  //     state.user = action.payload.user;
  //     state.token = action.payload.token;
  //   }).addCase(loginUser.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   }).addCase(registerUser.pending, (state) => {
  //     state.isLoading = true;
  //     state.error = null;
  //   }).addCase(registerUser.fulfilled, (state, action) => {
  //     state.isLoading = false;
  //     state.isAuthenticated = true;
  //     state.user = action.payload.user;
  //     state.token = action.payload.token;
  //   }).addCase(registerUser.rejected, (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   });
  // }

  extraReducers: (builder) => {
  builder

    // ================= LOGIN =================
    .addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })

    .addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.token = action.payload.token || null;
      state.error = null;
    })

    .addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;

      removeStorageItem(STORAGE_KEYS.USER);
      removeStorageItem(STORAGE_KEYS.TOKEN);
    })



    // ================= REGISTER =================
    .addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })

    .addCase(registerUser.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;

    })

    .addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
}

});
export const { logout, updateUserProfile, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
