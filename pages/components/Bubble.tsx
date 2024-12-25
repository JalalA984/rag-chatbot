import React from 'react';

const Bubble = ({ message }) => {
  const { content, role } = message;

  return (
    <div
      className={`w-full p-4 rounded-lg ${
        role === "user"
          ? "bg-blue-600 text-white self-end"
          : "bg-gray-700 text-gray-300 self-start"
      }`}
    >
      {content}
    </div>
  );
};

export default Bubble;
