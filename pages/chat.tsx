import Image from "next/image";
import SupernovaImage from "@/public/supernova.svg";
import React from "react";
import { useChat } from "ai/react";
import { Message } from "ai";

const chat = () => {
  const {
    append,
    isLoading,
    messages,
    input,
    handleInputChange,
    handleSubmit,
  } = useChat();

  const noMessages = false;

  return (
    <main>
      <Image
        src={SupernovaImage}
        alt="DevHorizon Nova logo"
        width={240}
        className="transition-transform duration-500 hover:scale-110 hover:rotate-6 hover:opacity-90"
      />
      <section className={noMessages ? "" : ""}>
        {noMessages ? (
          <>
            <p>Ask DevHorizon Nova about anything tech! We hope you enjoy!</p>
            <br />
          </>
        ) : (
          <>
            <p>we have messages</p>
          </>
        )}
      </section>
      <form onSubmit={handleSubmit}>
          <input
            className=""
            onChange={handleInputChange}
            value={input}
            placeholder="Ask me anything..."
          />
          <input type="submit" className="" />
        </form>
    </main>
  );
};

export default chat;
