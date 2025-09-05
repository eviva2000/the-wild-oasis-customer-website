"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import ClientNavigation from "@/app/_components/ClientNavigation";
import Logo from "@/app/_components/Logo";
import MobileNavigation from "@/app/_components/MobileNavigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // This is the onClose function that gets passed to MobileNavigation
  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="border-b border-primary-900 px-8 py-5">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden md:block z-10">
          <ClientNavigation />
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 rounded-md hover:bg-primary-800 transition-colors z-10"
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <MobileNavigation
        isOpen={isMobileMenuOpen}
        onClose={handleCloseMobileMenu}
        session={session}
      />
    </header>
  );
}

export default Header;
