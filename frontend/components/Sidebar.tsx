// D:\Granth\frontend\components\Sidebar.tsx
"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { 
  MessageSquare, Plus, User, MoreHorizontal, 
  Settings, LifeBuoy, LogOut, Zap 
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [width, setWidth] = useState(280);
  const [isResizing, setIsResizing] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isResizing) {
      const newWidth = e.clientX;
      if (newWidth > 240 && newWidth < 500) {
        setWidth(newWidth);
      }
    }
  }, [isResizing]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);
  
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const chats = ["What is AI?", "Explain quantum physics", "Write a poem about rain"];

  return (
    <aside
      // Use style for desktop resizing, and classes for mobile width
      style={{ width: `clamp(0px, ${isOpen ? width : 0}px, 100vw)` }}
      className={`
        bg-gray-50 dark:bg-gray-950 flex flex-col border-r border-gray-200 dark:border-gray-800
        fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:flex
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className={`flex flex-col h-full overflow-hidden p-3`}>
        {/* Top section with separate buttons */}
        <div className="flex items-center justify-between w-full mb-4 gap-2">
          <button className="p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <Image
              src="/logo.png"
              alt="Granth Logo"
              width={30}
              height={30}
              className="rounded-md"
            />
          </button>
          <button className="p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
            <Plus size={20} />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 space-y-1 overflow-y-auto">
          {chats.map((chat, i) => (
            <div
              key={i}
              className="flex items-center gap-2 p-3 rounded-md text-sm cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800"
            >
              <MessageSquare size={16} className="text-gray-500 flex-shrink-0" />
              <span className="truncate">{chat}</span>
            </div>
          ))}
        </div>

        {/* Footer section */}
        <div ref={menuRef} className="relative mt-auto pt-2 border-t border-gray-200 dark:border-gray-800">
          {isMenuOpen && (
             <div className="absolute bottom-full left-0 right-0 mb-2 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-2 p-2 border-b border-gray-200 dark:border-gray-700 mb-2">
                 <User size={18} /> <span className="text-sm font-medium">user@example.com</span>
              </div>
              <button className="w-full flex items-center gap-2 p-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700"><Settings size={16} /> Settings</button>
              <button className="w-full flex items-center gap-2 p-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700"><LifeBuoy size={16} /> Help</button>
              <button className="w-full flex items-center gap-2 p-2 rounded-md text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-red-500"><LogOut size={16} /> Logout</button>
            </div>
          )}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="w-full flex items-center justify-between gap-2 p-3 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
          >
             <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-7 h-7 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center flex-shrink-0">
                    <User size={16} />
                </div>
                <span className="text-sm font-medium truncate">User Name</span>
             </div>
             <MoreHorizontal size={18} className="text-gray-500 flex-shrink-0" />
          </button>
        </div>
      </div>

      {/* Resize Handle for desktop only */}
      <div
        onMouseDown={(e) => { if (window.innerWidth >= 768) setIsResizing(true); }}
        className="absolute top-0 right-0 w-1.5 h-full cursor-col-resize bg-transparent hover:bg-blue-500/30 transition-colors hidden md:block"
      />
    </aside>
  );
}