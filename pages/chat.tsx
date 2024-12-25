import Image from "next/image";
import SupernovaImage from "@/public/supernova.svg";
import React from "react";

const chat = () => {
  const noMessages = true;

  return (
    <main>
      <Image
        src={SupernovaImage}
        alt="DevHorizon Nova logo"
        width={240}
        className="transition-transform duration-500 hover:scale-110 hover:rotate-6 hover:opacity-90 -ml-6"
      />
      <section>
        {noMessages ? <p>No messages yet</p> : <p> we have messages </p>}
      </section>
    </main>
  );
};

export default chat;
