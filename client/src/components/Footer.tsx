import { Link } from "wouter";
import { scrollToElement } from "@/lib/utils";
import { Github, Linkedin, Twitter, Dribbble } from "lucide-react";

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToElement(href.replace("#", ""));
  };

  return (
    <footer className="relative overflow-hidden bg-white dark:bg-dark-bg border-t border-gray-200 dark:border-dark-border py-12">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-pattern-light dark:bg-pattern-dark opacity-30"></div>

      {/* Animated blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 dark:bg-primary/5 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-500/5 dark:bg-green-500/5 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 dark:bg-purple-500/5 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
          <div className="mb-8 md:mb-0">
            <Link 
              href="/" 
              className="logo font-bold text-xl text-gray-900 dark:text-white flex items-center mb-4"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-green-400">
                Julio
              </span>
              <span className="ml-2 text-gray-600 dark:text-gray-400 font-normal">Software Engineer</span>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              Building exceptional software solutions with a focus on user experience, performance, and maintainability.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Navigation</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#about" 
                    onClick={(e) => handleNavClick(e, "#about")}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-green-400 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a 
                    href="#experience" 
                    onClick={(e) => handleNavClick(e, "#experience")}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-green-400 transition-colors"
                  >
                    Experience
                  </a>
                </li>
                <li>
                  <a 
                    href="#projects" 
                    onClick={(e) => handleNavClick(e, "#projects")}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-green-400 transition-colors"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a 
                    href="#testimonials" 
                    onClick={(e) => handleNavClick(e, "#testimonials")}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-green-400 transition-colors"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    onClick={(e) => handleNavClick(e, "#contact")}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-green-400 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Connect</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#" 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-green-400 transition-colors flex items-center"
                  >
                    <Github className="mr-2 h-4 w-4" /> GitHub
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-green-400 transition-colors flex items-center"
                  >
                    <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-green-400 transition-colors flex items-center"
                  >
                    <Twitter className="mr-2 h-4 w-4" /> Twitter
                  </a>
                </li>
                <li>
                  <a 
                    href="#" 
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-green-400 transition-colors flex items-center"
                  >
                    <Dribbble className="mr-2 h-4 w-4" /> Dribbble
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-dark-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Julio. All rights reserved.
          </p>
          
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-green-400 transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-green-400 transition-colors text-sm">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
