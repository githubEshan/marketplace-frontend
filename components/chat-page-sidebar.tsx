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

const ChatPageSideBar: React.FC<ChatPageSideBarProps> = ({ data }) => {
  const pathname = usePathname();
  const { user } = useUser();
  const currentUserId = user?.id;

  // Filter chats where current user is participant
  const userChats = data?.filter(
    (chat) => chat.fromUserId === currentUserId || chat.toUserId === currentUserId
  ) || [];

  // Early return for loading state
  if (!user) {
    return (
      <div className="h-screen w-80 border-r border-gray-300 bg-gray-50 flex flex-col">
        <div className="h-16 text-black flex items-center px-4 shadow bg-white">
          <h1 className="text-lg font-semibold p-2">My Chats</h1>
        </div>
        <div className="flex-1 flex items-center justify-center text-gray-500">
          Loading...
        </div>
      </div>
    );
  }

  // No chats available
  if (userChats.length === 0) {
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

  // Create routes from filtered chats
  const routes = userChats.map((chat) => ({
    href: `/chat/${chat.id}`,
    label: chat.chatName,
    active: pathname === `/chat/${chat.id}`,
    fromUserId: chat.fromUserId,
    toUserId: chat.toUserId,
    // Helper to get the other participant's name
    otherUserId: chat.fromUserId === currentUserId ? chat.toUserId : chat.fromUserId,
  }));

  return (
    <div className="h-screen w-80 border-r border-gray-300 bg-gray-50">
      {/* Header */}
      <div className="h-16 text-black flex items-center px-4 shadow bg-white">
        <h1 className="text-lg font-semibold p-2">My Chats</h1>
      </div>

      {/* Chat List */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {routes.map((route) => (
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
              {/* Optional: Show if you're sender or recipient */}
              <span className="text-xs text-gray-500">
                {route.fromUserId === currentUserId ? "(sent)" : "(received)"}
              </span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default ChatPageSideBar;