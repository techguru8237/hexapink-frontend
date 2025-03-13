export const formatDate = (dateString: string | undefined) => {
  if (dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
    // const day = String(date.getDate()).padStart(2, "0");
    // const month = String(date.getMonth() + 1).padStart(2, "0");
    // const year = date.getFullYear();
    // return `${day}-${month}-${year}`;
  } else {
    return "";
  }
};
