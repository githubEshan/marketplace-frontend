"use client";

import { Chat } from "@/types";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { createMessage } from "@/actions/post-message";

interface ChatInterfaceProps {
  data: Chat;
}

const formSchema = z.object({
  text: z.string().min(1),
  userId: z.string().min(1),
  chatId: z.string().min(1),
});

type ChatFormValues = z.infer<typeof formSchema>;

const ChatInterface: React.FC<ChatInterfaceProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<string>("");
  const currentUser = useUser();
  const user = currentUser.user?.id;
  const product = data.productId;

  const onSubmit = async (data: ChatFormValues) => {
    try {
      setLoading(true);
      await createMessage(data);
    } catch (error) {
      console.log("error");
    } finally {
      setLoading(false);
    }
  };

  const form = useForm<ChatFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      userId: user,
      chatId: data.id,
    },
  });

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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="p-4 flex items-center space-x-4">
            <div className="flex-grow">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Type your message"
                        className="w-full"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button disabled={loading} className="bg-blue-500" type="submit">
              Send
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChatInterface;
