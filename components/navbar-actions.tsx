"use client";

import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import Button from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";
import useCart from "@/hooks/use-cart";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const router = useRouter();
  const cart = useCart();

  if (!isMounted) {
    return null;
  }

  const chat = {
    href: `/chat`,
    label: "Chats",
    active: pathname === `/chat`,
  };
  const sell = {
    href: `/sell`,
    label: "Sell",
    active: pathname === `/sell`,
  };

  return (
    <div className="ml-auto flex items-center space-x-4">
      
      <div className="ml-auto flex items-center space-x-2">
        <Button
          className={cn(
            "bg-white text-md font-medium transition-colors hover:text-black",
            chat ? "text-black" : "text-neutral-500"
          )}
        >
          <Link
            key={chat.href}
            href={chat.href}
            className={cn(
              "text-md font-medium transition-colors hover:text-black",
              chat ? "text-black" : "text-neutral-500"
            )}
          >
            Chats
          </Link>
        </Button>
        <Button
          className={cn(
            "bg-white text-md font-medium transition-colors hover:text-black",
            sell ? "text-black" : "text-neutral-500"
          )}
        >
          <Link
            key={sell.href}
            href={sell.href}
            className={cn(
              "text-md font-medium transition-colors hover:text-black",
              sell ? "text-black" : "text-neutral-500"
            )}
          >
            Sell
          </Link>
        </Button>
      </div>
      <Button className="flex items-center rounded-full bg-black">
        <ShoppingBag
          onClick={() => router.push("/cart")}
          size={20}
          color="white"
        />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
      </Button>
      <UserButton afterSwitchSessionUrl="/" />
      <div className="ml-auto flex items-center space-x-4"></div>
    </div>
  );
};

export default NavbarActions;
