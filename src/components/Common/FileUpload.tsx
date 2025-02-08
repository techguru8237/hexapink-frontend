import { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { PiPlusBold } from "react-icons/pi";
import { TbRefresh } from "react-icons/tb";

interface FileUploadProps {
  label: string;
  fileName: string | undefined;
  error: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClose: (event: React.MouseEvent) => void;
}

export default function Input({
  label,
  fileName,
  error,
  onChange,
  handleClose,
}: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCloseFile = (event: React.MouseEvent) => {
    handleClose(event);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-start gap-2">
        <label htmlFor="file-upload">{label}</label>

        <div className="w-full bg-white border border-light-gray3 rounded-lg p-2 flex items-center justify-between">
          <span className="text-left text-sm w-full">{fileName}</span>
          <input
            ref={fileInputRef}
            onChange={handleFileChange}
            type="file"
            className="hidden"
            id="file-input"
            accept=".csv"
          />
          <label htmlFor="file-input">
            {fileName ? (
              <TbRefresh className="p-1 box-content border border-dark-blue rounded-md text-dark-blue cursor-pointer" />
            ) : (
              <PiPlusBold className="p-1 box-content border border-dark-blue rounded-md text-dark-blue cursor-pointer" />
            )}
          </label>
          {fileName && (
            <IoCloseSharp
              onClick={handleCloseFile}
              className="p-1 ml-2 box-content border border-red-500 rounded-md text-red-500 cursor-pointer"
            />
          )}
        </div>

        {error && <span className="text-red-500 text-sm">{error}</span>}
      </div>
    </>
  );
}
