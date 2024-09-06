"use client";
import { useState, useEffect, useRef } from "react";
import { useCurrentUser, pb } from "@/lib/pocketbase";
import { RecordModel } from "pocketbase";
import { MoveUp } from "lucide-react";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";

export default function Dashboard() {
  const currentUser = useCurrentUser();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<RecordModel[]>([]);
  const messageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const records = await pb.collection("messages").getFullList({
          sort: "created",
          // Disable auto-cancellation
          noAutoCancel: true,
        });
        setMessages(records);
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;
    const newMessage = {
      text: message,
      sender: currentUser?.email || "Anonymous",
      user: currentUser?.id,
      created: new Date().toISOString(),
    };
    try {
      const createdMessage = await pb.collection("messages").create(newMessage);
      setMessages((prevMessages) => [createdMessage, ...prevMessages]);
      setMessage("");
    } catch (error) {
      console.error(
        "Failed to send message:",
        (error as any).response?.data || (error as any).message
      );
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent form submission if inside a form
      handleSendMessage();
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col h-screen">
        <div className="flex-grow p-4 overflow-y-auto">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <p className="font-semibold text-black dark:text-white">{msg.sender}</p>
              <p className="text-black dark:text-white">{msg.text}</p>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-black dark:border-white flex flex-col sticky bottom-0">
          <input
            type="text"
            value={message}
            ref={messageInputRef}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-4 border border-white dark:border-black rounded-3xl bg-black text-white dark:bg-white dark:text-black"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSendMessage}
            className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white text-black dark:bg-black dark:text-white p-2 rounded-full"
          >
            <MoveUp/>
          </button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
