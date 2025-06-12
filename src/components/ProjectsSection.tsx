import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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

export default function ProjectsSection() {
  const { t, currentTranslations } = useTranslation();
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [randomProjects, setRandomProjects] = useState<Project[]>([]);
  const [shuffledProjects, setShuffledProjects] = useState<Project[]>([]);

  // Safely access the nested array
  const projects: Project[] = currentTranslations?.projects?.items || [];

  useEffect(() => {
    if (projects.length > 0) {
      const shuffled = [...projects].sort(() => 0.5 - Math.random());
      setShuffledProjects(shuffled);
      setRandomProjects(shuffled.slice(0, 3));
    }
  }, [projects]);

  const displayedProjects = showAllProjects ? shuffledProjects : randomProjects;

  return (
    <section id="projects" className="relative py-20 alt">
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
              key={index}
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
                    loading="lazy" // Adicionado lazy loading
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-xl max-w-[70%] whitespace-nowrap overflow-hidden text-ellipsis">{project.title}</h3>
                    <Badge variant="outline" className={`bg-${project.badgeColor}-100 dark:bg-${project.badgeColor}-900/30 text-${project.badgeColor}-800 dark:text-${project.badgeColor}-300 border-0 text-[9px] whitespace-nowrap overflow-hidden text-ellipsis`}>
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

        {projects.length > 4 && (
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
