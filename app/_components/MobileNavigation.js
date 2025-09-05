"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function MobileNavigation({ isOpen, onClose, session }) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    // Wait for animation to complete before calling onClose
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Match the transition duration
  };

  // Reset closing state when menu opens
  useEffect(() => {
    if (isOpen) {
      setIsClosing(false);
    }
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" />

      {/* Mobile Menu */}
      <div
        className={`slide fixed top-0 right-0 h-full w-64 bg-primary-900 z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isClosing ? "translate-x-full" : "translate-x-0"
        }`}
      >
        {/* Close Button */}
        <div className="flex justify-end p-4">
          <button
            onClick={handleClose}
            className="p-2 rounded-md hover:bg-primary-800 transition-colors"
            aria-label="Close mobile menu"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <nav className="px-6">
          <ul className="space-y-6">
            <li>
              <Link
                href="/cabins"
                className="block text-lg hover:text-accent-400 transition-colors py-2"
                onClick={handleClose}
              >
                Cabins
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="block text-lg hover:text-accent-400 transition-colors py-2"
                onClick={handleClose}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/account"
                className="block text-lg hover:text-accent-400 transition-colors py-2"
                onClick={handleClose}
              >
                {session?.user?.image ? (
                  <div className="flex items-center gap-3">
                    <img
                      className="h-8 rounded-full"
                      src={session?.user?.image}
                      alt="avatar"
                      referrerPolicy="no-referrer"
                    />
                    <span>Guest area</span>
                  </div>
                ) : (
                  "Guest area"
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
