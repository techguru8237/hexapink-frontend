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

export const verifyEmail = async (email: string) => {
  try {
    await api.post("/api/users/verify-email", { email });
  } catch (error: any) {
    console.error("Error verifying email:", error);
    if (error.response) {
      // Server responded with a status other than 200 range
      alert(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      // Request was made but no response received
      alert("Error: No response from server. Please try again later.");
    } else {
      // Something else happened while setting up the request
      alert("Error: Unable to verify email. Please try again.");
    }
  }
};

export const signup = async (formData: SignupData, onSuccess: () => void) => {
  try {
    const response = await api.post("/api/users/signup", formData);
    if (response.status === 201) {
      onSuccess();
    }
  } catch (error: any) {
    console.error("Error signing up:", error);
    if (error.response) {
      // Server responded with a status other than 200 range
      alert(`Error: ${error.response.data.message}`);
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
  onSuccess: () => void
) => {
  try {
    const response = await api.post("/api/users/login", { email, password });
    if (response.status === 201) {
      onSuccess();
    }
  } catch (error: any) {
    console.error("Error logging in:", error);
    if (error.response) {
      // Server responded with a status other than 200 range
      alert(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      // Request was made but no response received
      alert("Error: No response from server. Please try again later.");
    } else {
      // Something else happened while setting up the request
      alert("Error: Unable to log in. Please try again.");
    }
  }
};

export const forgotPassword = async (email: string) => {
  try {
    await api.post("/api/users/forgot-password", { email });
    alert("Password reset link sent to your email.");
  } catch (error: any) {
    console.error("Error sending password reset link:", error);
    if (error.response) {
      alert(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      alert("Error: No response from server. Please try again later.");
    } else {
      alert("Error: Unable to send password reset link. Please try again.");
    }
  }
};

export const resetPassword = async (token: string, password: string) => {
  try {
    await api.post("/api/users/reset-password", { token, password });
    alert("Password has been reset.");
  } catch (error: any) {
    console.error("Error resetting password:", error);
    if (error.response) {
      alert(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      alert("Error: No response from server. Please try again later.");
    } else {
      alert("Error: Unable to reset password. Please try again.");
    }
  }
};