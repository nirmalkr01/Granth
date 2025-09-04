// D:\Granth\frontend\components\ChatArea.tsx
import { User } from "lucide-react";
import Image from "next/image"; // Import the Next.js Image component

export default function ChatArea() {
  const messages = [
    { role: "user", text: "Hello Granth, can you explain what a Large Language Model is?" },
    {
      role: "ai",
      text: "Of course! A Large Language Model, or LLM, is a type of artificial intelligence trained on vast amounts of text data. It learns patterns, grammar, and information from this data, allowing it to generate human-like text, answer questions, translate languages, and perform a wide range of other language-based tasks.",
    },
    { role: "user", text: "How does that differ from regular AI?" },
    {
      role: "ai",
      text: "LLMs are a specific application of AI focused on understanding and generating language. While 'regular AI' is a broad term that includes everything from game-playing bots to self-driving cars, LLMs are specialized in processing and producing text, making them experts in conversational and written communication.",
    },
  ];

  // The renderAvatar function is now updated to use your favicon for the AI
  const renderAvatar = (role: string) => (
    <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-200 dark:bg-gray-700">
      {role === "user" ? (
        <User size={20} />
      ) : (
        // Use the Image component to show your app's favicon for the AI
        <Image
          src="/favicon.ico"
          alt="Granth AI Avatar"
          width={24}
          height={24}
        />
      )}
    </div>
  );

  return (
    // Added padding-bottom to ensure the last message isn't hidden by the floating input box
    <main className="flex-1 overflow-y-auto pb-40">
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6"> {/* Reduced space-y for tighter chat */}
        {messages.map((msg, i) => (
          <div
            key={i}
            // Added the fade-in animation class here
            className={`flex items-start gap-4 animate-fade-in ${msg.role === "user" ? "justify-end" : ""}`}
          >
            {msg.role === "ai" && renderAvatar(msg.role)}
            
            {/* MODIFIED: The styling for the AI message bubble is updated below */}
            <div
              className={`max-w-lg px-5 py-3 rounded-2xl ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-br-none shadow-md" // User bubble style (remains good)
                  : "bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-none border border-gray-200 dark:border-gray-700 shadow-md" // New AI bubble style
              }`}
            >
              <p className="text-sm md:text-base leading-relaxed">{msg.text}</p>
            </div>
            {msg.role === "user" && renderAvatar(msg.role)}
          </div>
        ))}
      </div>
    </main>
  );
}