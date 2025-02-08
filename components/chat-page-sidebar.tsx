"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Chat } from "@/types";
import { useUser } from "@clerk/nextjs";

interface ChatPageSideBarProps {
  data: Chat[];
}

const pathname = usePathname();
const currentUser = useUser();
const user = currentUser.user?.id;

const ChatPageSideBar: React.FC<ChatPageSideBarProps> = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-screen w-80 border-r border-gray-300 bg-gray-50 flex flex-col">
        <div className="h-16 text-black flex items-center px-4 shadow bg-white">
          <h1 className="text-lg font-semibold p-2">My Chats</h1>
        </div>
        <div className="flex-1 flex items-center justify-center text-gray-500">
          No Chats Available
        </div>
      </div>
    );
  }

  const routes = data.map((route) => ({
    href: `/chat/${route.id}`,
    label: route.chatName,
    active: pathname === `/chat/${route.id}`,
    fromUserId: route.fromUserId,
    toUserId: route.toUserId,
  }));

  return (
    <div className="h-screen w-80 border-r border-gray-300 bg-gray-50">
      {/* Header */}
      <div className="h-16 text-black flex items-center px-4 shadow bg-white">
        <h1 className="text-lg font-semibold p-2">My Chats</h1>
      </div>

      {/* Chat List */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {routes
          .filter(
            (route) => route.fromUserId === user || route.toUserId === user
          )
          .map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium transition-all rounded-xl hover:shadow-md",
                route.active
                  ? "bg-blue-200 text-blue-800"
                  : "bg-white text-gray-800 hover:bg-gray-200 hover:text-blue-700"
              )}
            >
              <div className="flex items-center space-x-3">
                <span>{route.label}</span>
              </div>
            </Link>
          ))}
      </nav>
    </div>
  );
};

export default ChatPageSideBar;
