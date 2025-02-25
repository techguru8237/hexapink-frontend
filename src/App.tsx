import { Routes, Route, Navigate } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "./App.css";

// Pages
import HomePage from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPasswordPage from "./pages/auth/ResetPassword";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/Dashboard";
import Tables from "./pages/admin/Tables";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";
import PaymentMethods from "./pages/admin/PaymentMethods";
import Collections from "./pages/admin/Collection/Collections";
import CreateCollection from "./pages/admin/Collection/CreateCollection";
import EditCollection from "./pages/admin/Collection/EditCollection";
import ViewCollection from "./pages/admin/Collection/ViewCollection";

import UserLayout from "./pages/user/UserLayout";
import UserDashboard from "./pages/user/Dashboard/Dashboard";
import Files from "./pages/user/File/Files";
import Lookup from "./pages/user/Lookup";
import Wallet from "./pages/user/Wallet/Wallet";
import CreateFile from "./pages/user/File/CreateFile";

// Components
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="light"
        transition={Bounce}
      />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup/:step" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin", "manager"]} redirectTo="/">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="payments/:page?" element={<PaymentMethods />} />
          <Route path="collections" element={<Collections />} />
          <Route path="collections/new" element={<CreateCollection />} />
          <Route
            path="collections/edit/:collectionId"
            element={<EditCollection />}
          />
          <Route
            path="collections/view/:collectionId"
            element={<ViewCollection />}
          />
          <Route path="tables/:page?" element={<Tables />} />
          <Route path="users" element={<Users />} />
        </Route>

        {/* User Routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["user", "manager"]} redirectTo="/">
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<UserDashboard />} />
          <Route path="files" element={<Files />} />
          <Route path="files/new" element={<CreateFile />} />
          <Route path="orders" element={<Orders />} />
          <Route path="lookup" element={<Lookup />} />
          <Route path="wallet" element={<Wallet />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
