import React, { useState, useEffect } from "react";
import axios from "axios";
import { Badge, Tooltip } from "@mui/material";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoClose } from "react-icons/io5";

interface TagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");
  const [existingTags, setExistingTags] = useState<string[]>([]);

  useEffect(() => {
    // Fetch existing tags from the database on component mount
    const fetchTags = async () => {
      try {
        const response = await axios.get("/api/tags"); // Adjust the endpoint as necessary
        setExistingTags(response.data);
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && inputValue) {
      const trimmedInput = inputValue.trim();
      // Check for duplicates
      if (
        !tags.includes(trimmedInput) &&
        !existingTags.includes(trimmedInput)
      ) {
        setTags([...tags, trimmedInput]);
        setInputValue("");
      }
    } else if (event.key === "Backspace" && !inputValue && tags.length) {
      setTags(tags.slice(0, -1));
    }
  };

  const handleDeleteTag = (tagToDelete: string) => {
    setTags(tags.filter((tag) => tag !== tagToDelete));
  };

  return (
    <div className="flex flex-col">
      <div className="bg-white border border-light-gray3 rounded-lg p-3 flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="flex items-center bg-light-gray1 rounded-full px-2 gap-2"
          >
            <span>{tag}</span>
            <div className="flex items-center gap-1">
              <Tooltip title="Delete Tag">
                <Badge>
                  <IoClose
                    onClick={() => handleDeleteTag(tag)}
                    className="cursor-pointer"
                  />
                </Badge>
              </Tooltip>
            </div>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Input tag name"
          className="bg-white border-none outline-none"
        />
      </div>
    </div>
  );
};
