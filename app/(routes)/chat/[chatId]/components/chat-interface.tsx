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
import { SendIcon } from "lucide-react";
import { createMessage } from "@/actions/create-message";

interface ChatInterfaceProps {
  data: Chat;
}

const formSchema = z.object({
  text: z.string().min(1),
  userId: z.string().min(1),
  chatId: z.string().min(1),
});

type ChatFormValues = z.infer<typeof formSchema>;
// add soemthing that will reload the website after 30 seconds
const ChatInterface: React.FC<ChatInterfaceProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const currentUser = useUser();
  const user = currentUser.user?.id;

  const onSubmit = async (data: ChatFormValues) => {
    try {
      setLoading(true);
      console.log("clicked");
      createMessage(data);
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
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="h-16 flex items-center justify-between bg-white shadow px-4 py-3">
        <div className="flex items-center space-x-3">
          <div>
            <h3 className="text-lg font-semibold">{data.chatName}</h3>
          </div>
        </div>
      </header>

      <div>
        <main className="flex-1 overflow-hiddenp-4 space-y-4 ml-8">
          {data.messages.map((message, index) => {
            const isCurrentUser = message.userId === user;
            return (
              <div
                key={index}
                className={`flex ${
                  isCurrentUser
                    ? "justify-end mr-3 mt-3"
                    : "justify-start mt-3 ml-3"
                }`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    isCurrentUser
                      ? "bg-blue-500 text-white"
                      : "bg-white  text-gray-800"
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
          className="p-4 mt-auto mb-16"
        >
          <div className="flex items-center space-x-4 ">
            {/* Input Field and Button */}
            <div className="flex-grow">
              <FormField
                control={form.control}
                name="text"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center border border-gray-300 rounded-md mb-0">
                        <Input
                          disabled={loading}
                          placeholder="Type your message"
                          className="w-full border-none p-2"
                          {...field}
                        />
                        <Button
                          disabled={loading}
                          className="bg-blue-500 p-2 rounded-md"
                          type="submit"
                        >
                          <SendIcon />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ChatInterface;
