import React from "react";

const PromptSuggestionsRow = ({ onPromptClick }) => {
  const prompts = [
    "What are the latest tech trends?",
    "How to build a secure app?",
    "Explain machine learning algorithms",
    "What are the skills needed for a data scientist?",
  ];

  return (
    <div className="flex gap-4">
      {prompts.map((prompt, index) => (
        <button
          key={index}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
          onClick={() => onPromptClick(prompt)} // Ensure onPromptClick is being passed and called correctly
        >
          {prompt}
        </button>
      ))}
    </div>
  );
};

export default PromptSuggestionsRow;
