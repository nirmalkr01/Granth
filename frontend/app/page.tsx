// D:\Granth\frontend\app\page.tsx
"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ChatArea from "@/components/ChatArea";
import InputBox from "@/components/InputBox";

export default function Home() {
  // On mobile, the sidebar is closed by default. On desktop, it's open.
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // This effect ensures the correct sidebar state on initial load and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSidebarOpen(window.innerWidth >= 768); // 768px is the 'md' breakpoint
    };
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
      {/* Sidebar - now fully responsive */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      {/* Backdrop Overlay for mobile */}
      {isSidebarOpen && (
          <div 
              onClick={() => setIsSidebarOpen(false)} 
              className="fixed inset-0 z-30 bg-black/50 md:hidden"
          ></div>
      )}

      {/* Main Content Panel */}
      <div className="flex flex-col flex-1">
        <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="flex flex-col flex-1 overflow-hidden bg-white dark:bg-gray-900">
          <ChatArea />
          <InputBox />
        </div>
      </div>
    </div>
  );
}