import CustomFileButton_M from "./CustomFileButton_M";

export default function HexapinkPaperFourCustomButton_M() {
  const handleCustomFileButton = () => {
    alert("My Custom File Buttton clicked");
  };
  return (
    <CustomFileButton_M onClick={handleCustomFileButton}>
      <span>Make My Custom File</span>
    </CustomFileButton_M>
  );
}
