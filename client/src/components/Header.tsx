import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileMenu from "@/components/MobileMenu";
import { scrollToElement } from "@/lib/utils";
import { useScrollSpy } from "@/hooks/use-scroll-spy";

const NavItems = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Open Source", href: "#open-source" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useScrollSpy(
    NavItems.map((item) => item.href.replace("#", "")),
    { threshold: 0.5 },
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    e.preventDefault();
    scrollToElement(href.replace("#", ""));
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 backdrop-blur-md ${
        isScrolled
          ? "bg-white/70 dark:bg-black/70 border-b border-gray-200 dark:border-gray-700"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="logo font-bold text-xl sm:text-2xl transition-transform duration-300 hover:rotate-[-5deg] flex-shrink-0"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-green-400">
              Julio
            </span>
          </Link>

          <nav className="hidden lg:flex space-x-6 xl:space-x-8">
            {NavItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-green-400 transition-colors whitespace-nowrap ${
                  activeSection === item.href.replace("#", "")
                    ? "text-primary dark:text-green-400 font-medium"
                    : ""
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        items={NavItems}
      />
    </header>
  );
}
