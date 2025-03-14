  export const handleDownloadToCSV = (filePath: string) => {
    const fileUrl = `${import.meta.env.VITE_BACKEND_URL}${filePath.replace(
      "uploads",
      ""
    )}`;
    const fileName = filePath.split("/").pop(); // Extract file name from path

    fetch(fileUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to download file");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = fileName || "download"; // Use extracted name or fallback
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error downloading file:", error));
  };