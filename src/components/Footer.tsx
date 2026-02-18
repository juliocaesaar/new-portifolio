import { Link } from "wouter";
import { scrollToElement } from "@/lib/utils";
import { Github, Linkedin } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
export default function Footer() {
  const { t } = useTranslation();
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToElement(href.replace("#", ""));
  };

  return (
    <footer className="relative overflow-hidden bg-white dark:bg-[hsl(var(--dark-bg))] border-t border-gray-200 dark:border-[hsl(var(--dark-border))] py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 md:gap-0">
          <div className="mb-8 md:mb-0">
            <Link
              href="/"
              className="logo text-xl text-gray-900 dark:text-white flex items-center gap-2 mb-4"
            >
              <img src="/assets/logo-icon.png" alt="Julio Develop" className="h-24 w-24" />
            </Link>
            <p className="text-gray-600 dark:text-gray-400 max-w-md">
              {t('footer.description')}
            </p>
          </div>

          <div className="flex flex-wrap gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('footer.navigation')}</h3>
              <ul className="space-y-2">
                <li>
                  <a 
                    href="#about" 
                    onClick={(e) => handleNavClick(e, "#about")}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-green-400 transition-colors"
                  >
                    {t('footer.about')}
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    onClick={(e) => handleNavClick(e, "#projects")}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-green-400 transition-colors"
                  >
                    {t('footer.projects')}
                  </a>
                </li>
                <li>
                  <a
                    href="#experience"
                    onClick={(e) => handleNavClick(e, "#experience")}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-green-400 transition-colors"
                  >
                    {t('footer.services')}
                  </a>
                </li>
                <li>
                  <a 
                    href="#contact" 
                    onClick={(e) => handleNavClick(e, "#contact")}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-green-400 transition-colors"
                  >
                    {t('footer.contact')}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">{t('footer.connect')}</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/juliocaesaar"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-green-400 transition-colors flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-2 h-4 w-4" /> {t('footer.github')}
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/juliocesaar/"
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-green-400 transition-colors flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="mr-2 h-4 w-4" /> {t('footer.linkedin')}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-dark-border mt-12 pt-8 flex flex-col md:flex-row justify-center items-center text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Julio Develop. {t('footer.all_rights_reserved')}
          </p>

          <div className="flex space-x-4 mt-4 md:mt-0">
          </div>
        </div>
      </div>
    </footer>
  );
}
