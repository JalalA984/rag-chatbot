import React, { useState } from "react";

const PromptSuggestionsRow = ({ onPromptClick }) => {
  const [showSuggestions, setShowSuggestions] = useState(true); // State to control visibility

  const prompts = [
    "What are the latest tech trends?",
    "How to build a secure app?",
    "What skills are required for data science?",
  ];

  const handlePromptClick = (prompt) => {
    onPromptClick(prompt);
    setShowSuggestions(false); // Hide suggestions after a prompt is clicked
  };

  return (
    <div
      className={`flex flex-wrap gap-4 mt-4 ${showSuggestions ? "" : "hidden"}`}
    >
      {prompts.map((prompt, index) => (
        <button
          key={index}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition w-full sm:w-auto"
          onClick={() => handlePromptClick(prompt)}
        >
          {prompt}
        </button>
      ))}
    </div>
  );
};

export default PromptSuggestionsRow;
