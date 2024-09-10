"use client";

import { useState, useEffect, useRef } from "react";
import { useCurrentUser, pb } from "@/lib/pocketbase";
import { RecordModel } from "pocketbase";
import { MoveUp } from "lucide-react";
import MaxWidthWrapper from "@/components/common/MaxWidthWrapper";
import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  useEffect(() => {
    if (!pb.authStore.isValid) {
      redirect("/signUp");
    }
  }, [router]);

  const user = pb.authStore.isValid ? pb.authStore.model : null;

  return user? <Dashboard user={user} /> : null;
}

function Dashboard({ user }: { user: any }) {
  const router = useRouter();
  const currentUser = useCurrentUser();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<RecordModel[]>([]);
  const messageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const records = await pb.collection("messages").getFullList({
          sort: "-created",
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
    if (event.key === "Enter") {
      event.preventDefault(); // Prevent form submission if inside a form
      handleSendMessage();
    }
  };
  useEffect(() => {
    messageInputRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleLogout = async () => {
    pb.authStore.clear();
    router.push("/");
  };

  return (
    <>
      <div>
        <button
          className="p-2 text-white bg-black dark:text-black dark:bg-white rounded-md"
          onClick={handleLogout}
        >
          LogOut
        </button>
      </div>

      <MaxWidthWrapper>
        <div className="flex flex-col h-screen">
          <div className="flex-grow p-4 overflow-y-auto">
            {messages
              .slice()
              .reverse()
              .map((msg, index) => (
                <div
                  key={index}
                  className="mb-2 p-2 bg-black dark:bg-white rounded-lg"
                >
                  <p className="font-semibold z-10 text-white dark:text-black">
                    {msg.sender}
                  </p>
                  <p className="z-10 text-white dark:text-black">{msg.text}</p>
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
              <MoveUp />
            </button>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
// export default withAuth(Dashboard, true);
