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
  const routes = data.map((route) => ({
    href: `/chat/${route.id}`,
    label: route.chatName,
    active: pathname === `/chat/${route.id}`,
    fromUserId: route.fromUserId,
    toUserId: route.toUserId,
  }));

  const currentUser = useUser();
  const user = currentUser.user?.id;

  return (
    <div className="h-screen w-80 bg-gray-100 border-r border-gray-300">
      {/* Header */}
      <div className="h-16 bg-blue-600 text-white flex items-center px-4">
        <h1 className="text-lg font-bold">Chats</h1>
      </div>

      {/* Chat List */}
      <nav className="flex-1 overflow-y-auto">
        {routes
          .filter(
            (route) => route.fromUserId === user || route.toUserId === user
          )
          .map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium transition-colors",
                route.active
                  ? "bg-green-100 text-green-800"
                  : "text-gray-700 hover:bg-gray-200"
              )}
            >
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gray-300 rounded-full"></div>{" "}
                <span>{route.label}</span>
              </div>
            </Link>
          ))}
      </nav>
    </div>
  );
};

export default ChatPageSideBar;
