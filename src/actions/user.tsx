import api from "./api";

interface userData {
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

export const createUser = async (
  formData: userData,
  onSuccess: () => void
) => {
  try {
    const response = await api.post("/api/users/create", formData);
    if (response.status === 201) {
      onSuccess();
    }
  } catch (error: any) {
    console.error("Error creating user:", error);
    if (error.response) {
      alert(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      alert("Error: No response from server. Please try again later.");
    } else {
      alert("Error: Unable to create user. Please try again.");
    }
  }
};

export const updateUser = async (
  id: string,
  formData: userData,
  onSuccess: () => void
) => {
  try {
    const response = await api.put(`/api/users/update/${id}`, formData);
    if (response.status === 200) {
      onSuccess();
    }
  } catch (error: any) {
    console.error("Error updating user:", error);
    if (error.response) {
      alert(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      alert("Error: No response from server. Please try again later.");
    } else {
      alert("Error: Unable to update user. Please try again.");
    }
  }
};

export const getAllUsers = async () => {
  try {
    const response = await api.get("/api/users");
    return response.data;
  } catch (error: any) {
    console.error("Error fetching users:", error);
    if (error.response) {
      alert(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      alert("Error: No response from server. Please try again later.");
    } else {
      alert("Error: Unable to fetch users. Please try again.");
    }
  }
};

export const getUserById = async (id: string) => {
  try {
    const response = await api.get(`/api/users/one?id=${id}`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching user:", error);
    if (error.response) {
      alert(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      alert("Error: No response from server. Please try again later.");
    } else {
      alert("Error: Unable to fetch user. Please try again.");
    }
  }
};

export const deleteUserById = async (id: string) => {
  try {
    await api.delete(`/api/users/delete/${id}`);
    alert("User deleted successfully.");
  } catch (error: any) {
    console.error("Error deleting user:", error);
    if (error.response) {
      alert(`Error: ${error.response.data.message}`);
    } else if (error.request) {
      alert("Error: No response from server. Please try again later.");
    } else {
      alert("Error: Unable to delete user. Please try again.");
    }
  }
};
