import { Routes, Route, Navigate } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import "./App.css";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Tables from "./pages/admin/Tables";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";
import PaymentMethods from "./pages/admin/PaymentMethods";
import Collections from "./pages/admin/Collection/Collections";
import CreateCollection from "./pages/admin/Collection/CreateCollection";

import UserLayout from "./pages/user/UserLayout";

import Files from "./pages/user/Files";
import Lookup from "./pages/user/Lookup";

import HomePage from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPasswordPage from "./pages/ResetPassword";
import EditCollection from "./pages/admin/Collection/EditCollection";

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
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="payments/:page?" element={<PaymentMethods />} />
          <Route path="collections" element={<Collections />} />
          <Route path="collections/new" element={<CreateCollection />} />
          <Route
            path="collections/edit/:collectionId"
            element={<EditCollection />}
          />
          <Route path="tables/:page?" element={<Tables />} />
          <Route path="users" element={<Users />} />
        </Route>

        {/* User Routes */}
        <Route path="/user" element={<UserLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="files" element={<Files />} />
          <Route path="orders" element={<Orders />} />
          <Route path="lookup" element={<Lookup />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
