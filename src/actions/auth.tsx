import { toast } from "react-toastify";
import api from "./api";

interface SignupData {
  firstName: string;
  secondName: string;
  country: string;
  phone: string;
  industry: string;
  company: string;
  email: string;
  password: string;
  passwordConfirm: string;
  verificationCode?: string;
}

interface VerifyEmailResponse {
  message: string;
}

interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: string;
  };
}

export const verifyEmail = async (
  email: string,
  onSuccess: (data: VerifyEmailResponse) => void
) => {
  try {
    const response = await api.post("/api/auth/verify-email", { email });

    if (response.status === 200) {
      onSuccess(response.data);
    }
  } catch (error: any) {
    console.error("Error verifying email:", error);
    if (error.response) {
      // Server responded with a status other than 200 range
      toast.error(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      // Request was made but no response received
      toast.error("Error: No response from server. Please try again later.");
    } else {
      // Something else happened while setting up the request
      toast.error("Error: Unable to verify email. Please try again.");
    }
  }
};

export const signup = async (formData: SignupData, onSuccess: () => void) => {
  try {
    const response = await api.post("/api/auth/signup", formData);
    if (response.status === 201) {
      onSuccess();
    }
  } catch (error: any) {
    console.error("Error signing up:", error);
    if (error.response) {
      // Server responded with a status other than 200 range
      toast.error(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      // Request was made but no response received
      alert("Error: No response from server. Please try again later.");
    } else {
      // Something else happened while setting up the request
      alert("Error: Unable to sign up. Please try again.");
    }
  }
};

export const login = async (
  email: string,
  password: string,
  onSuccess: (data: LoginResponse) => void
) => {
  try {
    const response = await api.post("/api/auth/login", { email, password });
    if (response.status === 200) {
      onSuccess(response.data);
    }
  } catch (error: any) {
    console.error("Error logging in:", error);
    if (error.response) {
      // Server responded with a status other than 200 range
      toast.error(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      // Request was made but no response received
      alert("Error: No response from server. Please try again later.");
    } else {
      // Something else happened while setting up the request
      alert("Error: Unable to log in. Please try again.");
    }
  }
};

export const forgotPassword = async (
  email: string,
  onSuccess: (data: { message: string }) => void
) => {
  try {
    const response = await api.post("/api/auth/forgot-password", { email });
    if (response.status === 200) {
      onSuccess(response.data);
    }
  } catch (error: any) {
    console.error("Error sending password reset link:", error);
    if (error.response) {
      // Server responded with a status other than 200 range
      toast.error(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      // Request was made but no response received
      toast.error("Error: No response from server. Please try again later.");
    } else {
      // Something else happened while setting up the request
      toast.error(
        "Error: Unable to send password reset link. Please try again."
      );
    }
  }
};

export const resetPassword = async (
  token: string | undefined,
  password: string,
  onSuccess: (data: { message: string }) => void
) => {
  try {
    const response = await api.post("/api/auth/reset-password", {
      token,
      password,
    });
    if (response.status === 200) {
      onSuccess(response.data);
    }
  } catch (error: any) {
    console.error("Error resetting password:", error);
    if (error.response) {
      // Server responded with a status other than 200 range
      toast.error(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      // Request was made but no response received
      toast.error("Error: No response from server. Please try again later.");
    } else {
      // Something else happened while setting up the request
      toast.error("Error: Unable to reset password. Please try again.");
    }
  }
};
