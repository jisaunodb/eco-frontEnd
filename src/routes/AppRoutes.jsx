// import React, { Suspense } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { MainLayout } from "../layouts/MainLayout";
// import { AdminLayout } from "../layouts/AdminLayout";
// import { UserLayout } from "../layouts/UserLayout";
// import { ProtectedRoute } from "./ProtectedRoute";
// import { Loader } from "../components/common/Loader";
// import { Home } from "../pages/public/Home";
// import { Shop } from "../pages/public/Shop";
// import { CategoriesPage } from "../pages/public/CategoriesPage";
// import { ProductDetails } from "../pages/public/ProductDetails";
// import { CartPage } from "../pages/public/CartPage";
// import { WishlistPage } from "../pages/public/WishlistPage";
// import { CheckoutPage } from "../pages/public/CheckoutPage";
// import { OrderSuccessPage } from "../pages/public/OrderSuccessPage";
// import { OffersPage } from "../pages/public/OffersPage";
// import { AboutPage } from "../pages/public/AboutPage";
// import { ContactPage } from "../pages/public/ContactPage";
// import { FAQPage } from "../pages/public/FAQPage";
// import { PrivacyPolicyPage } from "../pages/public/PrivacyPolicyPage";
// import { TermsPage } from "../pages/public/TermsPage";
// import { NotFoundPage } from "../pages/public/NotFoundPage";
// import { LoginPage } from "../pages/auth/LoginPage";
// import { RegisterPage } from "../pages/auth/RegisterPage";
// import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage";
// import { ResetPasswordPage } from "../pages/auth/ResetPasswordPage";
// import { VerifyEmailPage } from "../pages/auth/VerifyEmailPage";
// import { UserProfilePage } from "../pages/user/UserProfilePage";
// import { UserOrdersPage } from "../pages/user/UserOrdersPage";
// import { UserOrderDetailsPage } from "../pages/user/UserOrderDetailsPage";
// import { UserAddressPage } from "../pages/user/UserAddressPage";
// import { ChangePasswordPage } from "../pages/user/ChangePasswordPage";
// import { AdminDashboard } from "../pages/admin/AdminDashboard";
// import { AdminProductsList } from "../pages/admin/AdminProductsList";
// import { AdminCreateProduct } from "../pages/admin/AdminCreateProduct";
// import { AdminEditProduct } from "../pages/admin/AdminEditProduct";
// import { AdminOrdersList } from "../pages/admin/AdminOrdersList";
// import { AdminUsersList } from "../pages/admin/AdminUsersList";
// import { AdminCategoriesPage } from "../pages/admin/AdminCategoriesPage";
// import { AdminAnalyticsPage } from "../pages/admin/AdminAnalyticsPage";
// import { AdminSettingsPage } from "../pages/admin/AdminSettingsPage";
// import { AdminProfilePage } from "../pages/admin/AdminProfilePage";
// export const AppRoutes = () => {
//   return /* @__PURE__ */ React.createElement(Suspense, { fallback: /* @__PURE__ */ React.createElement(Loader, { fullScreen: true, text: "Loading EcoBazar..." }) }, /* @__PURE__ */ React.createElement(Routes, null, /* @__PURE__ */ React.createElement(Route, { path: "/", element: /* @__PURE__ */ React.createElement(MainLayout, null) }, /* @__PURE__ */ React.createElement(Route, { index: true, element: /* @__PURE__ */ React.createElement(Home, null) }), /* @__PURE__ */ React.createElement(Route, { path: "shop", element: /* @__PURE__ */ React.createElement(Shop, null) }), /* @__PURE__ */ React.createElement(Route, { path: "search", element: /* @__PURE__ */ React.createElement(Shop, null) }), /* @__PURE__ */ React.createElement(Route, { path: "categories", element: /* @__PURE__ */ React.createElement(CategoriesPage, null) }), /* @__PURE__ */ React.createElement(Route, { path: "product/:id", element: /* @__PURE__ */ React.createElement(ProductDetails, null) }), /* @__PURE__ */ React.createElement(Route, { path: "cart", element: /* @__PURE__ */ React.createElement(CartPage, null) }), /* @__PURE__ */ React.createElement(Route, { path: "wishlist", element: /* @__PURE__ */ React.createElement(WishlistPage, null) }), /* @__PURE__ */ React.createElement(Route, { path: "offers", element: /* @__PURE__ */ React.createElement(OffersPage, null) }), /* @__PURE__ */ React.createElement(Route, { path: "about", element: /* @__PURE__ */ React.createElement(AboutPage, null) }), /* @__PURE__ */ React.createElement(Route, { path: "contact", element: /* @__PURE__ */ React.createElement(ContactPage, null) }), /* @__PURE__ */ React.createElement(Route, { path: "faq", element: /* @__PURE__ */ React.createElement(FAQPage, null) }), /* @__PURE__ */ React.createElement(Route, { path: "privacy-policy", element: /* @__PURE__ */ React.createElement(PrivacyPolicyPage, null) }), /* @__PURE__ */ React.createElement(Route, { path: "terms", element: /* @__PURE__ */ React.createElement(TermsPage, null) }), /* @__PURE__ */ React.createElement(Route, { path: "login", element: /* @__PURE__ */ React.createElement(LoginPage, null) }), /* @__PURE__ */ React.createElement(Route, { path: "register", element: /* @__PURE__ */ React.createElement(RegisterPage, null) }), /* @__PURE__ */ React.createElement(Route, { path: "forgot-password", element: /* @__PURE__ */ React.createElement(ForgotPasswordPage, null) }), /* @__PURE__ */ React.createElement(Route, { path: "verifyemail/:token", element: /* @__PURE__ */ React.createElement(VerifyEmailPage, null) }),
// React.createElement(Route, { path: "resetpassword/:token", element: /* @__PURE__ */ React.createElement(ResetPasswordPage, null) }),
// React.createElement(
//     Route,
//     {
//       path: "checkout",
//       element: /* @__PURE__ */ React.createElement(ProtectedRoute, null, /* @__PURE__ */ React.createElement(CheckoutPage, null))
//     }
//   ), /* @__PURE__ */ React.createElement(
//     Route,
//     {
//       path: "order-success",
//       element: /* @__PURE__ */ React.createElement(ProtectedRoute, null, /* @__PURE__ */ React.createElement(OrderSuccessPage, null))
//     }
//   )), /* @__PURE__ */ React.createElement(
//     Route,
//     {
//       path: "/user",
//       element: /* @__PURE__ */ React.createElement(ProtectedRoute, null, /* @__PURE__ */ React.createElement(UserLayout, null))
//     },
//     /* @__PURE__ */ React.createElement(Route, { index: true, element: /* @__PURE__ */ React.createElement(Navigate, { to: "/user/profile", replace: true }) }),
//     /* @__PURE__ */ React.createElement(Route, { path: "profile", element: /* @__PURE__ */ React.createElement(UserProfilePage, null) }),
//     /* @__PURE__ */ React.createElement(Route, { path: "orders", element: /* @__PURE__ */ React.createElement(UserOrdersPage, null) }),
//     /* @__PURE__ */ React.createElement(Route, { path: "orders/:id", element: /* @__PURE__ */ React.createElement(UserOrderDetailsPage, null) }),
//     /* @__PURE__ */ React.createElement(Route, { path: "addresses", element: /* @__PURE__ */ React.createElement(UserAddressPage, null) }),
//     /* @__PURE__ */ React.createElement(Route, { path: "change-password", element: /* @__PURE__ */ React.createElement(ChangePasswordPage, null) })
//   ), /* @__PURE__ */ React.createElement(
//     Route,
//     {
//       path: "/admin",
//       element: /* @__PURE__ */ React.createElement(ProtectedRoute, { adminOnly: true }, /* @__PURE__ */ React.createElement(AdminLayout, null))
//     },
//     /* @__PURE__ */ React.createElement(Route, { index: true, element: /* @__PURE__ */ React.createElement(Navigate, { to: "/admin/dashboard", replace: true }) }),
//     /* @__PURE__ */ React.createElement(Route, { path: "dashboard", element: /* @__PURE__ */ React.createElement(AdminDashboard, null) }),
//     /* @__PURE__ */ React.createElement(Route, { path: "products", element: /* @__PURE__ */ React.createElement(AdminProductsList, null) }),
//     /* @__PURE__ */ React.createElement(Route, { path: "products/create", element: /* @__PURE__ */ React.createElement(AdminCreateProduct, null) }),
//     /* @__PURE__ */ React.createElement(Route, { path: "products/edit/:id", element: /* @__PURE__ */ React.createElement(AdminEditProduct, null) }),
//     /* @__PURE__ */ React.createElement(Route, { path: "orders", element: /* @__PURE__ */ React.createElement(AdminOrdersList, null) }),
//     /* @__PURE__ */ React.createElement(Route, { path: "users", element: /* @__PURE__ */ React.createElement(AdminUsersList, null) }),
//     /* @__PURE__ */ React.createElement(Route, { path: "categories", element: /* @__PURE__ */ React.createElement(AdminCategoriesPage, null) }),
//     /* @__PURE__ */ React.createElement(Route, { path: "analytics", element: /* @__PURE__ */ React.createElement(AdminAnalyticsPage, null) }),
//     /* @__PURE__ */ React.createElement(Route, { path: "settings", element: /* @__PURE__ */ React.createElement(AdminSettingsPage, null) }),
//     /* @__PURE__ */ React.createElement(Route, { path: "profile", element: /* @__PURE__ */ React.createElement(AdminProfilePage, null) })
//   ), /* @__PURE__ */ React.createElement(Route, { path: "*", element: /* @__PURE__ */ React.createElement(MainLayout, null) }, /* @__PURE__ */ React.createElement(Route, { path: "*", element: /* @__PURE__ */ React.createElement(NotFoundPage, null) }))));
// };



import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { AdminLayout } from "../layouts/AdminLayout";
import { UserLayout } from "../layouts/UserLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { Loader } from "../components/common/Loader";
import { Home } from "../pages/public/Home";
import { Shop } from "../pages/public/Shop";
import { CategoriesPage } from "../pages/public/CategoriesPage";
import { ProductDetails } from "../pages/public/ProductDetails";
import { CartPage } from "../pages/public/CartPage";
import { WishlistPage } from "../pages/public/WishlistPage";
import { CheckoutPage } from "../pages/public/CheckoutPage";
import { OrderSuccessPage } from "../pages/public/OrderSuccessPage";
import { OffersPage } from "../pages/public/OffersPage";
import { AboutPage } from "../pages/public/AboutPage";
import { ContactPage } from "../pages/public/ContactPage";
import { FAQPage } from "../pages/public/FAQPage";
import { PrivacyPolicyPage } from "../pages/public/PrivacyPolicyPage";
import { TermsPage } from "../pages/public/TermsPage";
import { NotFoundPage } from "../pages/public/NotFoundPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "../pages/auth/ResetPasswordPage";
import { VerifyEmailPage } from "../pages/auth/VerifyEmailPage";
import { UserProfilePage } from "../pages/user/UserProfilePage";
import { UserOrdersPage } from "../pages/user/UserOrdersPage";
import { OrderTrackingPage } from "../pages/user/orderTrackingPage";
import { UserOrderDetailsPage } from "../pages/user/UserOrderDetailsPage";
import { UserAddressPage } from "../pages/user/UserAddressPage";
import { ChangePasswordPage } from "../pages/user/ChangePasswordPage";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { AdminProductsList } from "../pages/admin/AdminProductsList";
import { AdminCreateProduct } from "../pages/admin/AdminCreateProduct";
import { AdminEditProduct } from "../pages/admin/AdminEditProduct";
import { AdminOrdersList } from "../pages/admin/AdminOrdersList";
import { AdminUsersList } from "../pages/admin/AdminUsersList";
import { AdminCategoriesPage } from "../pages/admin/AdminCategoriesPage";
import { AdminAnalyticsPage } from "../pages/admin/AdminAnalyticsPage";
import { AdminSettingsPage } from "../pages/admin/AdminSettingsPage";
import { AdminProfilePage } from "../pages/admin/AdminProfilePage";

export const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader fullScreen text="Loading EcoBazar..." />}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="search" element={<Shop />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="verifyemail/:token" element={<VerifyEmailPage />} />
          <Route path="resetpassword/:token" element={<ResetPasswordPage />} />
          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="order-success"
            element={
              <ProtectedRoute>
                <OrderSuccessPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* User */}
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/user/profile" replace />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="orders" element={<UserOrdersPage />} />
          <Route path="orders/track/:tranId" element={<OrderTrackingPage />} />
          <Route path="orders/:id" element={<UserOrderDetailsPage />} />
          <Route path="addresses" element={<UserAddressPage />} />
          <Route path="change-password" element={<ChangePasswordPage />} />
        </Route>

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProductsList />} />
          <Route path="products/create" element={<AdminCreateProduct />} />
          <Route path="products/edit/:id" element={<AdminEditProduct />} />
          <Route path="orders" element={<AdminOrdersList />} />
          <Route path="users" element={<AdminUsersList />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="profile" element={<AdminProfilePage />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<MainLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};
