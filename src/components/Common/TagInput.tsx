import React, { useState } from "react";

interface TagInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

export const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && inputValue) {
      setTags([...tags, inputValue]);
      setInputValue("");
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
          <span
            key={index}
            className="bg-gray-200 text-gray-800 rounded-full px-2 py-1 flex items-center"
          >
            {tag}
            <div
              onClick={() => handleDeleteTag(tag)}
              className="w-6 h-6 bg-dark-blue rounded-full ml-2 text-white cursor-pointer"
            >
              x
            </div>
          </span>
        ))}
        {/* Input for adding new tags */}
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
