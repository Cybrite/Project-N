'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { CircleArrowLeft, LogOut, LucideHome, MenuIcon, Settings, XIcon } from "lucide-react";
import Link from 'next/link';
type Msg = { id: number; text: string };

const chat: Msg[] = [
  { id: 1, text: "Hey there! 👋" },
  { id: 2, text: "Hi! How can I assist you today?" },
  { id: 1, text: "What's the weather like? 🌤️" },
  { id: 2, text: "It's sunny and warm outside! ☀️" },
  { id: 1, text: "Can you recommend a good book? 📚" },
  { id: 2, text: "Sure! Try 'Atomic Habits' by James Clear." },
  { id: 1, text: "Thanks for the suggestion! 🙌" },
  { id: 2, text: "You're welcome! Let me know if you need more ideas." },
];

export default function MindEasePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [input, setInput] = useState('');

 

  const [selectedChat, setSelectedChat] = useState<number | null>(null);

  return (
    <div className="flex  h-screen overflow-hidden">

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white transition-all duration-300 ${sidebarOpen ? 'w-60' : 'w-0'
          } overflow-hidden`}
      >
        {/* Only show content when sidebar is open */}
        {sidebarOpen && (
          <div className="flex flex-col h-full">
            <div className="flex justify-between items-center p-4">
              <Link href={"#"} className="text-xl font-bold">
                <CircleArrowLeft className='size-6' />
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                <XIcon className="h-5 w-5" />
              </Button>
            </div>
            <div>
              <h1 className='text-center text-lg'>Start a new chat</h1>
            </div>
            <ul className="flex flex-col h-full justify-end overflow-y-auto space-y-2 px-1 pb-8">
              <li className='flex gap-3 w-full p-4 cursor-pointer hover:bg-gray-700 rounded-md items-start text-base'>
                <Settings /> Settings
              </li>
              <li className='flex gap-3 w-full p-4 cursor-pointer hover:bg-gray-700 rounded-md items-start'>
                <LogOut /> Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex-col bg-gray-100 overflow-y-auto relative ">
        {/* Sidebar open button (show when sidebar is closed) */}
        <div className='bg-gray-800 p-4 text-blue-700 fixed w-full'>
          {!sidebarOpen && (
            <Button

              size="icon"
              onClick={() => setSidebarOpen(true)}
              className="absolute top-4 left-4 z-10 bg-transparent hover:bg-gray-600 cursor-pointer"
            >
              <MenuIcon className="size-6" />
            </Button>
          )}
          <h1 className='text-center text-3xl font-bold'>Mindease</h1>
        </div>

        {/* Main chat messages */}
        <section className="flex-1 overflow-y-auto mt-4 p-4 w-full lg:px-24 scroll-smooth">
          <div className="flex flex-col gap-3">
            {chat.map((m, idx) =>
              m.id === 1 ? (
                <UserBubble key={idx}>{m.text}</UserBubble>
              ) : (
                <BotBubble key={idx}>{m.text}</BotBubble>
              )
            )}
          </div>
        </section>
          
         <div className="flex items-center p-4 bg-white shadow-md fixed bottom-0 w-full lg:px-24 gap-2">
         {/* Input box */}
        {/* Button to send chat */}
        </div>

      </div>
    </div>
  );
}



function UserBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="ml-auto flex max-w-[75%] items-end gap-2">
      <div className="rounded-2xl rounded-br-sm bg-blue-600 px-4 py-2 text-sm text-white shadow">
        {children}
      </div>

    </div>
  );
}

function BotBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="mr-auto flex max-w-[75%] items-end gap-2">

      <div className="rounded-2xl rounded-bl-sm bg-white px-4 py-2 text-sm shadow dark:bg-neutral-800 dark:text-neutral-100">
        {children}
      </div>
    </div>
  );
}
