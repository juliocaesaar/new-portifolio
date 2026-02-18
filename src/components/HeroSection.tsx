import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";
import AnimatedBackground from "@/components/AnimatedBackground";
// Importar logos das empresas
import aggioLogo from "/public/assets/companies/aggio.png";
import clusterLogo from "/public/assets/companies/cluster.png";
import decoleLogo from "/public/assets/companies/decole.png";
import inbolsoLogo from "/public/assets/companies/inbolso.png";
import isiLogo from "/public/assets/companies/isi.png";
import overdriveLogo from "/public/assets/companies/overdrive.png";
import purinutreLogo from "/public/assets/companies/purinutre.png";
import scmLogo from "/public/assets/companies/scm.png";
import startgovLogo from "/public/assets/companies/startgov.png";
import topazioLogo from "/public/assets/companies/topazio.png";
import cellestiLogo from "/public/assets/companies/cellesti.png";
import cagriLogo from "/public/assets/companies/cagri.png";
import voreliLogo from "/public/assets/companies/voreli.png";

const companyLogos = [
  { name: "Aggio", src: aggioLogo },
  { name: "Cluster", src: clusterLogo },
  { name: "Decole", src: decoleLogo },
  { name: "Inbolso", src: inbolsoLogo },
  { name: "ISI", src: isiLogo },
  { name: "Overdrive", src: overdriveLogo },
  { name: "Purinutre", src: purinutreLogo },
  { name: "SCM", src: scmLogo },
  { name: "StartGov", src: startgovLogo },
  { name: "Topazio", src: topazioLogo },
  { name: "Cellesti", src: cellestiLogo },
  { name: "Cagri", src: cagriLogo },
  { name: "Voreli", src: voreliLogo },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const marqueeGradientStyle = {
  maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
  WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
} as const;

export default function HeroSection() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      <AnimatedBackground />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 overflow-hidden relative z-10">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="lg:w-1/2" variants={childVariants}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-gray-900 dark:text-white">
              {t('hero.title')}
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-700 dark:text-gray-200">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-green-400">
                {t('hero.highlight')}
              </span>{" "}
              {t('hero.subtitle')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
              {t('hero.description')}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button
                size="lg"
                className="gap-2"
                onClick={() => scrollToElement("contact")}
              >
                {t('hero.contact_button')} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToElement("projects")}
              >
                {t('hero.view_work_button')}
              </Button>
            </div>
          </motion.div>

          <motion.div className="lg:w-1/2 relative" variants={childVariants}>
            <motion.img
              src="/assets/og-background.png"
              alt="JulioDevelop Logo"
              className="rounded-2xl shadow-xl w-full max-w-xs mx-auto aspect-square object-cover"
              animate={{
                y: [0, -10, 0],
                transition: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
            />
            <motion.div
              className="absolute -bottom-6 -right-2 bg-white dark:bg-[hsl(var(--dark-card))] p-3 rounded-xl shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-600 dark:text-green-400"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M16 18L22 12L16 6"></path>
                    <path d="M8 6L2 12L8 18"></path>
                    <path d="M12 2L12 22"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{t('hero.role')}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t('hero.experience_years')}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-24 flex flex-wrap justify-center gap-8 md:gap-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400 w-full text-center mb-2">{t('hero.trustedByCompaniesWorldwide')}</p>
          <div
            className="relative w-full overflow-hidden"
            style={marqueeGradientStyle}
          >
            <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
              {[...companyLogos, ...companyLogos].map((logo, index) => (
                <div
                  key={`${logo.name}-${index}`}
                  className="mx-10 flex h-16 w-32 shrink-0 items-center justify-center"
                >
                  <img
                    src={logo.src}
                    alt={`${logo.name} Logo`}
                    className="max-h-full max-w-full object-contain grayscale transition-all duration-300 hover:grayscale-0"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
