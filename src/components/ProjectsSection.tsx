import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

type Project = {
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  caseStudyUrl: string;
  githubUrl?: string;
  externalUrl?: string;
  badgeColor: string;
};

const badgeColorMap: Record<string, string> = {
  red: "bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300",
  blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300",
  green: "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300",
  yellow: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300",
  purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300",
  pink: "bg-pink-100 dark:bg-pink-900/30 text-pink-800 dark:text-pink-300",
  indigo: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-800 dark:text-indigo-300",
  gray: "bg-gray-100 dark:bg-gray-900/30 text-gray-800 dark:text-gray-300",
};

export default function ProjectsSection() {
  const { t, currentTranslations } = useTranslation();
  const [showAllProjects, setShowAllProjects] = useState(false);

  const projects: Project[] = currentTranslations?.projects?.items || [];

  const shuffledProjects = useMemo(() => {
    if (projects.length === 0) return [];
    return [...projects].sort(() => 0.5 - Math.random());
  }, [projects]);

  const displayedProjects = showAllProjects
    ? shuffledProjects
    : shuffledProjects.slice(0, 6);

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="relative py-20 alt z-10 bg-black/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeading className="text-center mx-auto mb-4">{t('projects.heading')}</SectionHeading>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="group overflow-hidden h-full transition-all duration-300 hover:translate-y-[-5px]">
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.image.replace('.png', '.webp')}
                    alt={project.title}
                    className="w-full h-full object-cover object-top"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-xl max-w-[70%] whitespace-nowrap overflow-hidden text-ellipsis">{project.title}</h3>
                    <Badge variant="outline" className={`${badgeColorMap[project.badgeColor] || badgeColorMap.gray} border-0 text-[9px] whitespace-nowrap overflow-hidden text-ellipsis`}>
                      {project.category}
                    </Badge>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4 items-center">
                    <div className="flex gap-2 overflow-hidden">
                      {project.technologies.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary" className="text-[10px] whitespace-nowrap overflow-hidden text-ellipsis">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex space-x-2 ml-auto">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                          aria-label={`View ${project.title} source code on GitHub`}
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      )}
                      {project.externalUrl && (
                        <a
                          href={project.externalUrl}
                          className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                          aria-label={`Visit ${project.title} website`}
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {projects.length > 6 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => setShowAllProjects(!showAllProjects)}
            >
              {showAllProjects ? t('projects.view_less_button') : t('projects.view_more_button')}
              {showAllProjects ? null : <ArrowRight className="h-4 w-4" />}
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
