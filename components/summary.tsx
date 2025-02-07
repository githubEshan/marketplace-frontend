import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import Button from "./ui/button";
import Currency from "./ui/currency";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { Chat } from "@/types";
import { createChat } from "@/actions/create-chat";
import { createMessage } from "@/actions/create-message";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment confirmed");
    }
    if (searchParams.get("Cancelled")) {
      toast.error("something went wrong");
    }
  }, [searchParams, removeAll]);

  const currentUser = useUser();
  const user = currentUser.user?.id;

  const onCheckout = () => {
    items.forEach((item) => {
      if (!item.chats || !Array.isArray(item.chats)) {
        const payload = {
          fromUserId: user,
          toUserId: item.userId,
          productId: item.id,
          chatName: item.name,
          messages: [],
        };

        createChat(payload).then((newChat) => {
          const initialMessage = {
            text: `I would like to purchase ${item.name} for ${item.price} dollars. Let me know what time to meet at ${item.location}`,
            chatId: newChat.id,
            userId: user,
          };
          return createMessage(initialMessage);
        });
      } else {
        const existingChat = item.chats.find(
          (chat) => chat.fromUserId === user && chat.toUserId === item.userId
        );

        if (existingChat) {
          const data = {
            text: `I would like to purchase ${item.name} for ${item.price} dollars. Let me know what time to meet at ${item.location}`,
            chatId: existingChat.id,
            userId: user,
          };
          createMessage(data);
          console.log("message sent");
        }
      }
    });
  };

  return (
    <div
      className="
        mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6
        lg:col-span-5 lg:mt-0 lg:p-8 "
    >
      <h2 className="text-lg font-medium text-gray-900"> Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order Total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button onClick={onCheckout} className="w-full mt-6">
        Checkout
      </Button>
    </div>
  );
};

export default Summary;
