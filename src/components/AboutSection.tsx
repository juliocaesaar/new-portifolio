import { motion } from "framer-motion";
import { ArrowRight, Code, Database, Layout, Server, Users, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SectionHeading } from "@/components/ui/section-heading";
import { scrollToElement } from "@/lib/utils";
import { useTranslation } from "@/hooks/useTranslation";

export default function AboutSection() {
  const { t, currentTranslations } = useTranslation();

  // Safely access the nested array
  const technicalSkills = currentTranslations?.about?.technical_skills?.items || [];
  const industryExperience = currentTranslations?.about?.industry_experience?.items || [];


  return (
    <section id="about" className="relative py-20 alt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <motion.div
            className="lg:w-2/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1000&q=80"
                alt="Software Engineer working on code"
                className="rounded-2xl shadow-xl w-full max-w-md mx-auto"
              />
              <motion.div
                className="absolute -bottom-5 -left-5 bg-white dark:bg-[hsl(var(--dark-card))] p-4 rounded-xl shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-blue-100 dark:bg-blue-900/30 rounded-lg p-2 flex flex-col items-center">
                      <Code className="text-blue-600 dark:text-blue-400 h-5 w-5" />
                      <span className="text-xs font-medium mt-1 text-gray-700 dark:text-gray-300">Frontend</span>
                    </div>
                    <div className="bg-green-100 dark:bg-green-900/30 rounded-lg p-2 flex flex-col items-center">
                      <Database className="text-green-600 dark:text-green-400 h-5 w-5" />
                      <span className="text-xs font-medium mt-1 text-gray-700 dark:text-gray-300">Backend</span>
                    </div>
                    <div className="bg-purple-100 dark:bg-purple-900/30 rounded-lg p-2 flex flex-col items-center">
                      <Layout className="text-purple-600 dark:text-purple-400 h-5 w-5" />
                      <span className="text-xs font-medium mt-1 text-gray-700 dark:text-gray-300">UI/UX</span>
                    </div>
                    <div className="bg-orange-100 dark:bg-orange-900/30 rounded-lg p-2 flex flex-col items-center">
                      <Server className="text-orange-600 dark:text-orange-400 h-5 w-5" />
                      <span className="text-xs font-medium mt-1 text-gray-700 dark:text-gray-300">DevOps</span>
                    </div>
                    <div className="bg-red-100 dark:bg-red-900/30 rounded-lg p-2 flex flex-col items-center">
                      <Users className="text-red-600 dark:text-red-400 h-5 w-5" />
                      <span className="text-xs font-medium mt-1 text-gray-700 dark:text-gray-300">Team Lead</span>
                    </div>
                    <div className="bg-yellow-100 dark:bg-yellow-900/30 rounded-lg p-2 flex flex-col items-center">
                      <svg
                        className="text-yellow-600 dark:text-yellow-400 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 3L12 7 8 3"></path>
                      </svg>
                      <span className="text-xs font-medium mt-1 text-gray-700 dark:text-gray-300">PM</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-3/5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <SectionHeading>{t('about.heading')}</SectionHeading>

<p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
  {t('about.paragraph1')}
</p>

<p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
  {t('about.paragraph2')}
</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-4">{t('about.technical_skills.heading')}</h3>
                  <ScrollArea className="h-[200px] pr-4">
                    <ul className="space-y-2">
                      {/* Access items directly from translations object */}
                      {Array.isArray(technicalSkills) && technicalSkills.map((skill: string, index: number) => (
                        <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-4">{t('about.industry_experience.heading')}</h3>
                  <ScrollArea className="h-[200px] pr-4">
                    <ul className="space-y-2">
                      {/* Access items directly from translations object */}
                      {Array.isArray(industryExperience) && industryExperience.map((exp: string, index: number) => (
                        <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{exp}</span>
                        </li>
                      ))}
                    </ul>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Button
                className="gap-2"
                onClick={() => scrollToElement("contact")}
              >
                {t('about.contact_button')} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
