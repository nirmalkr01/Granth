"use client";
import { useState } from "react";
import { Send, Mic } from "lucide-react";

export default function InputBox() {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    console.log("User query:", input);
    setInput("");
  };

  return (
    // MODIFIED: Removed the 'bg-gradient-to-t...' classes to make the container transparent.
    // Increased bottom padding slightly to give the floating element more space.
    <div className="w-full pt-4 pb-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* The container for the textarea now has the shadow to make it "float" */}
        <div className="relative flex items-center p-2 rounded-2xl bg-white dark:bg-gray-800 shadow-2xl border border-black/10 dark:border-white/10">
          <textarea
            rows={1}
            className="flex-1 pl-2 pr-20 py-2 resize-none bg-transparent focus:outline-none"
            placeholder="Send a message to Granth..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <div className="absolute right-3 flex items-center gap-2">
             <button className="p-2 rounded-full text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
              <Mic size={20} />
            </button>
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="p-2 rounded-full bg-black text-white hover:bg-gray-800 disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
        <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-3">
          Granth can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  );
}