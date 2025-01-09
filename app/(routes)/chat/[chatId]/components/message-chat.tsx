"use client";

import { Chat } from "@/types";
import { useUser } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { useState } from "react";

interface ChatInterfaceProps {
  data: Chat;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ data }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const currentUser = useUser();
  const user = currentUser.user?.id;

  const handleSendMessage = () => {};

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="flex items-center justify-between bg-white shadow px-4 py-3">
        <div className="flex items-center space-x-3">
          <div>
            <h3 className="text-lg font-semibold">{data.chatName}</h3>
          </div>
        </div>
      </header>

      {/* Messages Section */}
      {/* Loop through messages and based on messages userId, either keep it on the left or right using the  ? :*/}
      <div>
        <main className="flex-1 overflow-y-auto p-4 space-y-4">
          {data.messages.map((message, index) => {
            const isCurrentUser = message.userId === user;
            return (
              <div
                key={index}
                className={`flex ${
                  isCurrentUser ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    isCurrentUser
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            );
          })}
        </main>
      </div>
      <div className="p-4 bg-gray-200 flex items-center space-x-4">
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;
