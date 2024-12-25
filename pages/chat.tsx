import Image from "next/image";
import SupernovaImage from "@/public/supernova.svg";
import React, { useState } from "react";
import Bubble from "./components/Bubble";
import PromptSuggestionsRow from "./components/PromptSuggestionsRow";
import LoadingBubble from "./components/LoadingBubble";
import Link from "next/link";

const Chat = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim()) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: input },
    ]);
    setInput("");
    setIsLoading(true);
    setShowSuggestions(false);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [
            ...messages,
            { role: "user", content: input },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from the server");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let chunkText = "";

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          chunkText += decoder.decode(value, { stream: true });
        }
      }

      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "assistant", content: chunkText },
      ]);
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong, please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrompt = (promptText: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: promptText },
    ]);
    setShowSuggestions(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-900 text-gray-200 font-sans">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-8">
        <Link href="/">
          <Image
            src={SupernovaImage}
            alt="DevHorizon Nova logo"
            width={240}
            className="mb-4 transition-transform duration-500 hover:scale-110 hover:rotate-6 hover:opacity-90"
          />
        </Link>
        <h1 className="text-3xl font-bold">Chat with Nova</h1>
        <p className="text-gray-400 text-center mt-2">
          Your AI companion for exploring tech stacks, companies, and skills.
        </p>
      </div>

      {/* Chat Section */}
      <section className="relative w-full max-w-2xl flex flex-col flex-grow gap-4 p-6 rounded-lg shadow-md bg-gray-800 overflow-hidden">
        <div
          className={`flex flex-col gap-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 ${
            messages.length === 0 ? "justify-center" : ""
          }`}
          style={{ maxHeight: "60vh" }}
        >
          {messages.length === 0 ? (
            <p className="text-gray-500 text-center w-full">
              Ask DevHorizon Nova about anything tech! We hope you enjoy!
            </p>
          ) : (
            messages.map((message, index) => (
              <Bubble key={index} message={message} isUser={message.role === "user"} />
            ))
          )}
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="absolute bottom-4 left-4">
            <LoadingBubble />
          </div>
        )}
      </section>

      {/* Error Display */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Prompt Suggestions Section */}
      {showSuggestions && <PromptSuggestionsRow onPromptClick={handlePrompt} />}

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

export default Chat;
