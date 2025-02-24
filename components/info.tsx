"use client";

import { Chat, Product } from "@/types";
import Currency from "./ui/currency";
import Button from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";
import { createChat } from "@/actions/create-chat";
import { useUser } from "@clerk/nextjs";

interface InfoProps {
  data: Product;
  productChat: Chat[];
}

const Info: React.FC<InfoProps> = ({ data, productChat }) => {
  const cart = useCart();
  const router = useRouter();

  const currentUser = useUser();
  const user = currentUser.user?.id;

  const chats = productChat;

  const dataWithChat = {
    ...data,
    chats: chats,
  };

  const addToCart = () => {
    cart.addItem(dataWithChat);
    console.log("this was sent to the cart", dataWithChat)
  };

  const onHandleClick = () => {
    const chat = chats.find(
      (chat) => chat.fromUserId === user && chat.toUserId === data.userId
    );

    if (chat) {
      router.push(`/chat/${chat.id}`);
      console.log("chat found");
    } else {
      const payload = {
        fromUserId: user,
        toUserId: data.userId,
        productId: data.id,
        chatName: data.name,
        messages: [],
      };

      createChat(payload).then((newChat) => {
        router.push(`/chat/${newChat.id}`);
      });
      console.log("chat created");
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <Currency value={data?.price} />
      </div>
      <hr className="my-4" />

      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold text-black">Condition:</h3>
        <div>{data.condition}</div>
      </div>

      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold text-black">Pickup Location</h3>
        <div>{data.location}</div>
      </div>
      <div className="flex items-center gap-x-4">
        <h3 className="font-semibold text-black">Description</h3>
        <div>{data.description}</div>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onHandleClick} className="flex items-center gap-x-2">
          Message Seller
        </Button>
        <Button onClick={addToCart} className="flex items-center gap-x-2">
          Add to Cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
