import Image from "next/image";
import SupernovaImage from "@/public/supernova.svg";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Link href="/">
          <Image
            src={SupernovaImage}
            alt="DevHorizon Nova logo"
            width={240}
            className="mb-4 transition-transform duration-500 hover:scale-110 hover:rotate-6 hover:opacity-90"
          />
        </Link>
        <h1 className="text-2xl font-bold">Welcome to DevHorizon Nova</h1>
        <p className="text-center sm:text-left text-lg">
          DevHorizon Nova is a state-of-the-art RAG (Retrieval-Augmented
          Generation) chatbot designed to help computer science students and
          aspiring tech professionals explore company tech stacks, learn
          industry-relevant skills, and prepare for their desired roles. Let
          Nova guide you on your journey to tech excellence.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/chat"
          >
            Chat with Nova
          </Link>

          <Link
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
            href="/learn-more"
          >
            Learn More
          </Link>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
