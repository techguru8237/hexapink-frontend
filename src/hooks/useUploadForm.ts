import { useState } from "react";
import axios from "axios";
import { User } from "../types";

export const useUploadForm = (url: string) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [progress, setProgress] = useState(0);

  const currentUserString = localStorage.getItem("currentUser");
  const currentUser: User = currentUserString ? JSON.parse(currentUserString) : null; // Parse the string into a User object

  const uploadForm = async (formData: FormData) => {
    await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: `Bearer ${currentUser.token}`,
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const progress = (progressEvent.loaded / progressEvent.total) * 50;
          setProgress(progress);
        }
      },
      onDownloadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const progress =
            50 + (progressEvent.loaded / progressEvent.total) * 50;
          setProgress(progress);
        }
      },
    });
    setIsSuccess(true);
  };

  return { uploadForm, isSuccess, progress };
};
