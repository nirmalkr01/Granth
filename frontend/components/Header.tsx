// D:\Granth\frontend\components\Header.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { Share2, Menu, MoreHorizontal, Flag } from "lucide-react";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  // State to manage the visibility of the dropdown menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Effect to close the menu when clicking outside of it
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

  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {/* Sidebar Toggle Button */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
        >
          <Menu size={20} />
        </button>
        {/* NOTE: You can replace this h1 with your Image component again if you like */}
        <h1 className="text-lg font-semibold">Granth</h1>
      </div>

      {/* MODIFIED: Right-side buttons section */}
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
          <Share2 size={18} />
        </button>
        
        {/* Container for the new dropdown menu */}
        <div ref={menuRef} className="relative">
          {/* The "..." button that toggles the menu */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <MoreHorizontal size={18} />
          </button>
          
          {/* The dropdown menu, opens when isMenuOpen is true */}
          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              <button className="w-full flex items-center gap-2 p-2 text-sm text-left hover:bg-gray-100 dark:hover:bg-gray-700">
                <Flag size={16} />
                Report
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}