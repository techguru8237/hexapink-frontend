import { JSX, useState } from "react";
import Input from "../Common/Input";
import FileUpload from "../Common/FileUpload";

import { PiPlusCircle } from "react-icons/pi";
import { createTable } from "../../actions/table";

const CreateTable = (): JSX.Element => {
  const [tableName, setTableName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState({
    tableName: "",
    file: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      setErrors((prev) => ({ ...prev, file: "" }));
    }
  };

  const handleSubmit = async () => {
    if (!tableName) {
      setErrors((prev) => ({ ...prev, tableName: "Table Name is required." }));
      return;
    }
    if (!file) {
      setErrors((prev) => ({ ...prev, file: "File is required." }));
      return;
    }

    // Create FormData
    const fileData = new FormData();
    fileData.append("tableName", tableName);
    fileData.append("file", file);

    createTable(fileData);
    setFile(null)
    setTableName("")
  };

  return (
    <div className="flex flex-col w-[350px] items-start relative">
      <div className="flex flex-col items-center relative w-full bg-white rounded-lg overflow-hidden border border-solid border-[#3f3fbf] shadow-[0px_0px_0px_4px_#ececf8]">
        <div className="flex h-12 items-center gap-2 pl-4 pr-0 py-0 relative self-stretch w-full border-b [border-bottom-style:dashed] border-light-gray3">
          <div className="relative w-fit [font-family:'Raleway-SemiBold',Helvetica] font-semibold text-[#333333] text-md tracking-[0.28px] leading-[21px] whitespace-nowrap">
            Create New Table
          </div>
        </div>

        <div className="w-full flex flex-col items-start gap-6 p-6 border-b border-dashed border-light-gray3">
          <Input
            label="Table Name"
            type="text"
            value={tableName}
            onChange={(e) => {
              setTableName(e.target.value);
              setErrors((prev) => ({ ...prev, tableName: "" }));
            }}
            error={errors.tableName}
          />

          <FileUpload
            label="Selected File"
            fileName={file?.name}
            onChange={handleChange}
            handleClose={() => setFile(null)}
            error={errors.file}
          />
        </div>

        <div className="w-full p-6">
          <button
            onClick={handleSubmit}
            disabled={!file || !tableName}
            className={`bg-dark-blue ${
              file ? "" : "opacity-20 cursor-default read-only"
            } text-white flex items-center justify-center gap-2 rounded-full w-full`}
          >
            <PiPlusCircle className="text-xl" />
            <span>Create Table</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTable;
