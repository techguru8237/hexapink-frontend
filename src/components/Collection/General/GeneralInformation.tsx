import React from "react";
import FileUpload from "../../Common/FileUpload";
import Input from "../../Common/Input";
import TextArea from "../../Common/TextArea";
import Selection from "../../Common/Selection";
import { CollectionCreateErrors } from "../../../types";

interface GeneralInformationProps {
  title: string;
  fileName: string | undefined;
  type: string;
  description: string;
  setTitle: (title: string) => void;
  setFile: (file: File | null) => void;
  setType: (type: string) => void;
  setDescription: (description: string) => void;
  disabled?: boolean;
  errors: CollectionCreateErrors;
  setErrors: (errors: CollectionCreateErrors) => void;
}

export default function GeneralInformation({
  title,
  fileName,
  type,
  description,
  setTitle,
  setFile,
  setType,
  setDescription,
  disabled,
  errors,
  setErrors,
}: GeneralInformationProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    } else {
      setErrors({...errors, file: ""});
      const file = event.target.files[0];
      setFile(file);
    }
  };

  const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (input !== "") {
      setErrors({...errors, title: ""});
    }
    setTitle(input);
  };

  return (
    <div className="max-w-3xl bg-white border border-light-gray-1 rounded-lg flex flex-col text-dark">
      <div className="p-4 border-b border-dashed border-light-gray-1 text-left font-bold">
        General Information
      </div>
      <div className="flex flex-col lg:flex-row gap-4 p-6">
        <div className="flex flex-1 flex-col gap-2">
          <Input
            label="Title"
            type="text"
            value={title}
            disabled={disabled ?? false}
            error={errors.title}
            onChange={handleChangeTitle}
          />

          <FileUpload
            label="Image"
            fileName={fileName}
            accept="image/*"
            onChange={handleFileChange}
            disabled={disabled ?? false}
            handleClose={() => setFile(null)}
            error={errors.file}
          />

          <Selection
            label="Type"
            selectedItem={type}
            onChange={(item) => setType(item)}
            disabled={disabled ?? false}
            items={["Customer", "Business"]}
          />
        </div>
        <div className="flex-1">
          <TextArea
            label="Description"
            placeholder="Description"
            value={description}
            disabled={disabled ?? false}
            error=""
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
