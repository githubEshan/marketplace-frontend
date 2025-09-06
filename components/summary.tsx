import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Button from "./ui/button";
import Currency from "./ui/currency";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import getChats from "@/actions/get-chats";
import { Chat } from "@/types";
import { createChat } from "@/actions/create-chat";
import { createMessage } from "@/actions/create-message";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [chats, setChats] = useState<Record<string, Chat[]>>({});
  const [isLoading, setIsLoading] = useState(false);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  useEffect(() => {
    const fetchChats = async () => {
      const chatData: Record<string, Chat[]> = {};
      for (const item of items) {
        const chatsForItem = await getChats({ productId: item.id }); // Assuming item.id is the product ID
        chatData[item.id] = chatsForItem;
      }
      setChats(chatData);
    };
    if (items.length > 0) {
      fetchChats();
    }
  }, [items]);

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

  const onCheckout = async (data: {
    userId: string;
    id: string;
    name: string;
    price: string;
    location: string;
  }) => {
    const chat = chats[data.id]?.find(
      (chat) => chat.fromUserId === user && chat.toUserId === data.userId
    );

    if (chat) {
      const message = {
        text: `I would like to purchase ${data.name} for ${data.price} dollars. Let me know what time to meet at ${data.location}`,
        userId: user,
        chatId: chat.id,
        storeId: "b34f7384-3ab1-47c7-bff0-274026b30446"
      };
      await createMessage(message);
      toast.success("Message sent to Seller");
    } else {
      const payload = {
        fromUserId: user,
        toUserId: data.userId,
        productId: data.id,
        chatName: data.name,
        messages: [],
      };

      try {
        const newChat = await createChat(payload);
        if (newChat?.id) {
          const message = {
            text: `I would like to purchase ${data.name} for ${data.price} dollars. Let me know what time to meet at ${data.location}`,
            userId: user,
            chatId: newChat.id,
            storeId: "b34f7384-3ab1-47c7-bff0-274026b30446"
          };
          await createMessage(message);
          toast.success("Chat created and Seller Notified");
        } else {
          console.error("Failed to create chat or missing chat ID:", newChat);
          throw new Error("Failed to create chat");
        }
      } catch (error) {
        console.error("Error creating chat:", error);
        throw error; // Re-throw to handle in the main function
      }
    }
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error("Please sign in to place an order");
      return;
    }

    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    setIsLoading(true);

    try {
      // Process all items
      const promises = items.map((item) =>
        onCheckout({
          userId: item.userId,
          id: item.id,
          name: item.name,
          price: item.price,
          location: item.location,
        })
      );

      // Wait for all checkouts to complete
      await Promise.all(promises);

      // Clear the cart after successful checkout
      removeAll();
      toast.success("Order placed successfully! Cart cleared.");
      
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Failed to place some orders. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
      <Button
        onClick={handlePlaceOrder}
        className="w-full mt-6"
        disabled={items.length === 0 || isLoading || !user}
      >
        {isLoading ? "Placing Order..." : "Place Order"}
      </Button>
    </div>
  );
};

export default Summary;