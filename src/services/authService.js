// import { apiClient } from "./api";
// import { API_ENDPOINTS } from "../constants/apiEndpoints";
// import { MOCK_USER_CUSTOMER, MOCK_USER_ADMIN } from "../constants/mockData";
// export const authService = {
//   login: async (credentials) => {
//     try {
//       const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
//       return response.data;
//     } catch {
//       if (credentials.email.includes("admin")) {
//         return {
//           success: true,
//           token: "mock_jwt_admin_token_8812",
//           user: MOCK_USER_ADMIN
//         };
//       }
//       return {
//         success: true,
//         token: "mock_jwt_customer_token_9041",
//         user: MOCK_USER_CUSTOMER
//       };
//     }
//   },
//   register: async (userData) => {
//     try {
//       const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData);
//       return response.data;
//     } catch {
//       const newUser = {
//         _id: `usr_${Date.now()}`,
//         name: userData.name,
//         email: userData.email,
//         role: "user",
//         phone: userData.phone || "+1 (555) 000-1122",
//         avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
//         isVerified: true,
//         createdAt: (/* @__PURE__ */ new Date()).toISOString()
//       };
//       return {
//         success: true,
//         token: `mock_jwt_${Date.now()}`,
//         user: newUser
//       };
//     }
//   },
//   forgotPassword: async (email) => {
//     try {
//       const response = await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
//       return response.data;
//     } catch {
//       return {
//         success: true,
//         message: "Password reset link sent to your registered email."
//       };
//     }
//   },
//   resetPassword: async (token, newPassword) => {
//     try {
//       const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, { token, newPassword });
//       return response.data;
//     } catch {
//       return {
//         success: true,
//         message: "Password reset successfully."
//       };
//     }
//   },
//   verifyEmail: async (token) => {
//     try {
//       const response = await apiClient.get(`${API_ENDPOINTS.AUTH.VERIFY_EMAIL}/${token}`);
//       return response.data;
//     } catch {
//       return {
//         success: true,
//         message: "Email address verified successfully."
//       };
//     }
//   }
// };


import { apiClient } from "./api";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
export const authService = {
  // login: async (credentials) => {
  //   const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
  //   return response.data;
  // },
  // register: async (userData) => {
  //   const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER,userData);
  // return response.data;
  // },

  login: async (credentials) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    const data = response.data;

    // backend response ke frontend format e convert
    return {
      success: data.success ?? true,
      token: data.token || data.accessToken || `token_${Date.now()}`,
      user: data.user || {
        _id: data.id || data._id,
        name: data.name || data.username,
        email: data.email,
        role: data.role || "user"
      },
      message: data.message || data.massage
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.response?.data?.massage || "Login failed"
    };
  }
},

register: async (userData) => {
  try {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, {
      username: userData.name,  // backend username expect korte pare
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      password: userData.password
    });
    const data = response.data;

    return {
      success: data.success ?? true,
      token: data.token || `token_${Date.now()}`,
      user: data.user || {
        _id: data.id || data._id,
        name: userData.name,
        email: userData.email,
        role: "user"
      }
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.response?.data?.massage || "Registration failed"
    };
  }
},

  forgotPassword: async (email) => {

      const response = await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
      return response.data;

  },
  resetPassword: async (token, newPassword, confirmPassword) => {
  const response = await apiClient.post(`${API_ENDPOINTS.AUTH.RESET_PASSWORD}/${token}`, {
    newPassword,
    confirmPassword
  });
  return response.data;
},
changePassword: async (token, oldPassword, newPassword, confirmPassword) => {
  const response = await apiClient.post(`${API_ENDPOINTS.USER.PASSWORD}/${token}`, {
    currentPassword:oldPassword,
    newPassword,
    confirmPassword
  });
  return response.data;
},

  verifyEmail: async (token) => {

      const response = await apiClient.post(`${API_ENDPOINTS.AUTH.VERIFY_EMAIL}/${token}`);
      return response.data;

  }
};