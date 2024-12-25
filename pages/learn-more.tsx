import React from "react";
import Image from "next/image";
import SupernovaImage from "@/public/supernova.svg";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const LearnMore = () => {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-gray-900 text-gray-200`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {/* Header Section */}
        <Image
          src={SupernovaImage}
          alt="DevHorizon Nova logo"
          width={260}
          height={120}
          priority
          className="transition-transform duration-500 hover:scale-110 hover:rotate-6 hover:opacity-90"
        />
        <h1 className="text-3xl font-bold text-center sm:text-left">Learn More</h1>
        <p className="text-center sm:text-left text-lg text-gray-400">
          Explore the technology and ideas behind DevHorizon Nova, a RAG-powered chatbot 
          designed to help aspiring tech professionals.
        </p>

        {/* Section: What is RAG */}
        <section className="max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">What is RAG?</h2>
          <p className="text-gray-400 leading-relaxed">
            Retrieval-Augmented Generation (RAG) is an innovative AI framework that combines large language 
            models (LLMs) with external data retrieval systems. By retrieving context from knowledge bases in 
            real time, RAG improves the relevance, accuracy, and depth of AI responses.
          </p>
        </section>

        {/* Section: About the Project */}
        <section className="max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">About This Project</h2>
          <p className="text-gray-400 leading-relaxed">
            DevHorizon Nova is built for computer science students and tech enthusiasts. It provides insights 
            into tech stacks, companies, and required technical skills, empowering users to achieve their 
            career goals. With Nova, you’ll find answers that are fast, accurate, and actionable.
          </p>
        </section>

        {/* Section: Technologies */}
        <section className="max-w-3xl">
          <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
          <ul className="text-gray-400 leading-relaxed list-disc list-inside space-y-2">
            <li>
              <strong>LangChain:</strong> Enables seamless integration of LLMs and data sources for complex applications.
            </li>
            <li>
              <strong>Gemini:</strong> A cutting-edge generative AI model offering advanced embeddings and conversational capabilities.
            </li>
            <li>
              <strong>Tailwind CSS:</strong> Provides rapid, utility-first styling for a clean and responsive UI.
            </li>
            <li>
              <strong>Next.js:</strong> Powers the frontend with efficient server-side rendering and routing.
            </li>
          </ul>
        </section>

        {/* Navigation Links */}
        <div className="flex gap-4 items-center flex-col sm:flex-row mt-8">
          <Link
            href="/chat"
            className="rounded-full border border-transparent bg-foreground text-background hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 flex items-center justify-center transition-colors"
          >
            Chat with Nova
          </Link>
          <Link
            href="/"
            className="rounded-full border border-gray-500 hover:border-transparent hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 flex items-center justify-center transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center text-gray-500 text-sm mt-8">
        Built with passion by DevHorizon.
      </footer>
    </div>
  );
};

export default LearnMore;
