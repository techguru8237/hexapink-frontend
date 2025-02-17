import React from "react";
import FileUpload from "../../Common/FileUpload";
import Input from "../../Common/Input";
import TextArea from "../../Common/TextArea";
import Selection from "../../Common/Selection";

interface GeneralInformationProps {
  title: string;
  fileName: string | undefined;
  type: string;
  description: string;
  setTitle: (title: string) => void;
  setFile: (file: File | null) => void;
  setType: (type: string) => void;
  setDescription: (description: string) => void;
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
}: GeneralInformationProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) {
      return;
    }
    const file = event.target.files[0];
    setFile(file);
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
            error=""
            onChange={(e) => setTitle(e.target.value)}
          />

          <FileUpload
            label="Image"
            fileName={fileName}
            accept="image/*"
            onChange={handleFileChange}
            handleClose={() => setFile(null)}
            error=""
          />

          <Selection label="Type" selectedItem={type} onChange={(item) => setType(item)}  items={["Customer", "Business"]} />
        </div>
        <div className="flex-1">
          <TextArea
            label="Description"
            placeholder="Description"
            value={description}
            error=""
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
