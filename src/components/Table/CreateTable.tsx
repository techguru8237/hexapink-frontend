import { JSX, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Input from "../Common/Input";
import FileUpload from "../Common/FileUpload";
import LoadingElement from "../Common/LoadingElement";
import ProgressBar from "../Common/ProgressBar"; // Import the ProgressBar
import { TagInput } from "../Common/TagInput"; // Import the TagInput component

import { PiPlusCircle } from "react-icons/pi";
import { IoCloseCircleOutline } from "react-icons/io5";

import { useUploadForm } from "../../hooks/useUploadForm";
import api from "../../actions/api";
import { TagOption } from "../../types";

interface CreateTableProps {
  onClose: () => void;
}

const CreateTable = ({onClose}: CreateTableProps): JSX.Element => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { uploadForm, progress } = useUploadForm(
    `${import.meta.env.VITE_BACKEND_URL}/api/table/create`
  );

  const [existingTags, setExistingTags] = useState<TagOption[]>([])

  const [tableName, setTableName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [delimiter, setDelimiter] = useState("comma"); // Default delimiter
  const [tags, setTags] = useState<TagOption[]>([]); // State for tags
  const [errors, setErrors] = useState({
    tableName: "",
    file: "",
  });

    useEffect(() => {
      const fetchTags = async () => {
        try {
          const response = await api.get("/api/tag"); // Adjust the endpoint as necessary
          console.log('response.data', response.data)
          setExistingTags(response.data);
        } catch (error) {
          console.error("Error fetching tags:", error);
        }
      };
  
      fetchTags();
    }, []);

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
    const tagNames = tags.map((tag) => tag.name);
    // Create FormData
    const fileData = new FormData();
    fileData.append("tableName", tableName);
    fileData.append("file", file);
    fileData.append("delimiter", delimiter); // Include delimiter
    fileData.append("tags", JSON.stringify(tagNames)); // Include tags

    setLoading(true);

    try {
      await uploadForm(fileData);
      toast.success("Successfully created table.");
      navigate("/admin/tables?page=0");
    } catch (error) {
      toast.error("An error occurred while creating the table.");
    } finally {
      setLoading(false);
      setFile(null);
      setTableName("");
      setTags([]); // Reset tags
    }
  };

  return (
    <div className="flex flex-col w-[350px] items-start">
      <div className="flex flex-col items-center w-full bg-white rounded-lg overflow-hidden border border-solid border-[#3f3fbf] shadow-[0px_0px_0px_4px_#ececf8]">
        <div className="flex items-center justify-between gap-2 w-full p-6 border-b border-dashed border-light-gray-3">
          <div className="w-fit font-raleway font-semibold text-dark whitespace-nowrap">
            Create New Table
          </div>
          <IoCloseCircleOutline
            onClick={onClose}
            className="text-2xl cursor-pointer"
          />
        </div>

        <div className="w-full flex flex-col items-start gap-6 p-6 border-b border-dashed border-light-gray-3">
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
            accept=".csv"
            onChange={handleChange}
            handleClose={() => setFile(null)}
            error={errors.file}
          />

          {/* Delimiter Selection */}
          <div className="w-full flex flex-col">
            <label className="text-left text-md">Select Delimiter</label>
            <select
              value={delimiter}
              onChange={(e) => setDelimiter(e.target.value)}
              className="bg-white border border-gray-300 rounded p-2"
            >
              <option value="comma">Comma (,)</option>
              <option value="semicolon">Semicolon (;)</option>
              <option value="tab">Tab</option>
            </select>
          </div>

          {/* Tags Input */}
          <div className="w-full flex flex-col">
            <label className="text-left text-md">Add Tags</label>
            <TagInput existingTags={existingTags} tags={tags} setTags={setTags} />
          </div>
        </div>

        {/* Progress Bar */}
        {progress > 0 && progress < 100 && (
          <div className="w-full p-6">
            <ProgressBar progress={progress} />
          </div>
        )}

        <div className="w-full p-6">
          <button
            onClick={handleSubmit}
            disabled={!file || !tableName || loading}
            className={`bg-dark-blue ${
              !file || !tableName || loading ? "opacity-20 cursor-default" : ""
            } text-white flex items-center justify-center gap-2 rounded-full w-full`}
          >
            {loading ? (
              <LoadingElement width="24" color="white" />
            ) : (
              <div className="flex items-center gap-2">
                <PiPlusCircle className="text-xl" />
                <span>Create Table</span>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTable;
