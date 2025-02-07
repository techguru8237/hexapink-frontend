import { toast } from "react-toastify";
import { formApi } from "./api";

export const createTable = async (fileData: FormData, onSuccess: () => void) => {
  try {
    const response = await formApi.post("/api/table/create", fileData);
    onSuccess()
    console.log("response.data", response.data);
    toast.success("Successfully created table.")
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
