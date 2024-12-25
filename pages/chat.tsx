import Image from "next/image";
import SupernovaImage from "@/public/supernova.svg";
import React from "react";
import { Message, useChat } from "ai/react";
import Bubble from "./components/Bubble";
import PromptSuggestionsRow from "./components/PromptSuggestionsRow";
import LoadingBubble from "./components/LoadingBubble";

const chat = () => {
  const {
    append,
    isLoading,
    messages,
    input,
    handleInputChange,
    handleSubmit,
  } = useChat();

  const noMessages = messages.length === 0;

  const handlePrompt = (promptText: string) => {
    const msg: Message = {
      id: crypto.randomUUID(),
      content: promptText,
      role: "user"
    }
    append(msg);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-900 text-gray-200 font-sans">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-8">
        <Image
          src={SupernovaImage}
          alt="DevHorizon Nova logo"
          width={240}
          className="mb-4 transition-transform duration-500 hover:scale-110 hover:rotate-6 hover:opacity-90"
        />
        <h1 className="text-3xl font-bold">Chat with Nova</h1>
        <p className="text-gray-400 text-center mt-2">
          Your AI companion for exploring tech stacks, companies, and skills.
        </p>
      </div>

      {/* Chat Section */}
      <section className="w-full max-w-2xl flex flex-col flex-grow gap-4 p-6 rounded-lg shadow-md bg-gray-800 overflow-hidden">
        <div
          className={`flex flex-col gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 ${
            noMessages ? "justify-center" : ""
          }`}
          style={{ maxHeight: "60vh" }}
        >
          {noMessages ? (
            <p className="text-gray-500 text-center w-full">
              Ask DevHorizon Nova about anything tech! We hope you enjoy!
            </p>
          ) : (
            messages.map((message, index) => (
              <Bubble key={index} message={message} />
            ))
          )}

          {/* Loading Indicator */}
          {isLoading && <LoadingBubble />}
        </div>
      </section>

      {/* Prompt Suggestions Section */}
      <PromptSuggestionsRow onPromptClick={handlePrompt} />

      {/* Input Section */}
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl flex items-center mt-6 gap-4"
      >
        <input
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
          onChange={handleInputChange}
          value={input}
          placeholder="Ask me anything..."
        />
        <button
          type="submit"
          className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ${
            isLoading && "opacity-50 pointer-events-none"
          }`}
        >
          {isLoading ? "Loading..." : "Send"}
        </button>
      </form>
    </main>
  );
};

export default chat;
