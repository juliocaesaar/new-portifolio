import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { scrollToElement } from "@/lib/utils";
import { 
  SiMicrosoft, 
  SiUber, 
  SiSpotify, 
  SiAirbnb, 
  SiSlack 
} from "react-icons/si";

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

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-pattern-light dark:bg-pattern-dark"></div>
      
      {/* Animated blobs */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 dark:bg-primary/5 rounded-full filter blur-3xl animate-blob"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-green-500/10 dark:bg-green-500/5 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/5 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="flex flex-col lg:flex-row items-center justify-between gap-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="lg:w-1/2" variants={childVariants}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-gray-900 dark:text-white">
              Hey, I'm <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 dark:from-primary dark:to-green-400">Julio</span>
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-gray-700 dark:text-gray-200">
              Software Engineer & Problem Solver
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-xl">
              I build robust software solutions from concept to deployment. My experience spans frontend, backend, UI/UX design, and DevOps — creating exceptional digital experiences that solve real problems.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="gap-2"
                onClick={() => scrollToElement("contact")}
              >
                Get in touch <ArrowRight className="h-4 w-4" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => scrollToElement("projects")}
              >
                View my work
              </Button>
            </div>
          </motion.div>
          
          <motion.div className="lg:w-1/2 relative" variants={childVariants}>
            <motion.img 
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
              alt="Software Engineer workspace with code on screen" 
              className="rounded-2xl shadow-xl w-full max-w-lg mx-auto"
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
              className="absolute -bottom-6 -right-6 bg-white dark:bg-dark-card p-3 rounded-xl shadow-lg"
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
                  >
                    <path d="M16 18L22 12L16 6"></path>
                    <path d="M8 6L2 12L8 18"></path>
                    <path d="M12 2L12 22"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Full-Stack Developer</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">7+ years experience</p>
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
          <p className="text-sm text-gray-500 dark:text-gray-400 w-full text-center mb-6">Trusted by companies worldwide</p>
          <SiMicrosoft className="h-8 w-8 text-gray-400 dark:text-gray-600" />
          <SiUber className="h-8 w-8 text-gray-400 dark:text-gray-600" />
          <SiSpotify className="h-8 w-8 text-gray-400 dark:text-gray-600" />
          <SiAirbnb className="h-8 w-8 text-gray-400 dark:text-gray-600" />
          <SiSlack className="h-8 w-8 text-gray-400 dark:text-gray-600" />
        </motion.div>
      </div>
    </section>
  );
}
