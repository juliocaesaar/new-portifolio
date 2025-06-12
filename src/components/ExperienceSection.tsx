import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useTranslation } from "@/hooks/useTranslation";
import { useState } from "react"; // Importar useState

type Skill = {
  name: string;
  percentage: number;
};

type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
  technologies: string[];
  color: string;
};

export default function ExperienceSection() {
  const { t, currentTranslations } = useTranslation();

  // Safely access the nested arrays
  const skills: Skill[] = currentTranslations?.experience?.skills?.items || [];
  const experiences: Experience[] = currentTranslations?.experience?.experiences?.items || [];

  // Estado para controlar a expansão das descrições individuais
  const [expandedExperiences, setExpandedExperiences] = useState<number[]>([]);
  // Estado para controlar a expansão da linha do tempo completa
  const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);

  const toggleExpandDescription = (index: number) => {
    setExpandedExperiences(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  const toggleTimelineExpand = () => {
    setIsTimelineExpanded(prev => !prev);
  };

  // Número de experiências a serem exibidas por padrão
  const initialExperiencesToShow = 3; // Ajustar conforme necessário

  // Experiências a serem exibidas com base no estado de expansão da linha do tempo
  const displayedExperiences = isTimelineExpanded
    ? experiences
    : experiences.slice(0, initialExperiencesToShow);

  const showToggleTimelineButton = experiences.length > initialExperiencesToShow;

  return (
    <section id="experience" className="relative py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeading className="text-center mx-auto mb-4">{t('experience.heading')}</SectionHeading>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('experience.subtitle')}
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-full">
            <div className="relative border-l-2 border-gray-200 dark:border-dark-border pl-8 ml-4">
              {displayedExperiences.map((exp, index) => (
                <div
                  key={index}
                  className="mb-12 last:mb-0"
                >
                  <div className={`absolute w-4 h-4 bg-${exp.color}-500 rounded-full -left-[9px] border-4 border-white dark:border-dark-bg`}></div>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="flex flex-wrap justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{exp.role}</h3>
                          <p className="text-primary dark:text-green-400">{exp.company}</p>
                        </div>
                        <Badge variant="outline" className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-0">
                          {exp.period}
                        </Badge>
                      </div>

                      <p className="text-gray-700 dark:text-gray-300 mb-4">
                        {/* Limitar a descrição e adicionar botão "ver mais/menos" */}
                        {expandedExperiences.includes(index)
                          ? exp.description
                          : `${exp.description.substring(0, 50)}...`} {/* Limite de caracteres, ajustar conforme necessário */}
                        {exp.description.length > 50 && ( // Mostrar botão apenas se a descrição for longa
                          <button
                            onClick={() => toggleExpandDescription(index)}
                            className="text-primary dark:text-green-400 font-medium ml-1"
                          >
                            {expandedExperiences.includes(index) ? t('experience.see_less') : t('experience.see_more')}
                          </button>
                        )}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {exp.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
              {/* Ponto final na linha do tempo */}
              {displayedExperiences.length > 0 && (
                <div className={`absolute w-4 h-4 bg-${displayedExperiences[displayedExperiences.length - 1].color}-500 rounded-full -left-[9px] border-4 border-white dark:border-dark-bg bottom-0`}></div>
              )}
              {showToggleTimelineButton && (
                <div className="text-center mt-8">
                  <button
                    onClick={toggleTimelineExpand}
                    className="text-primary dark:text-green-400 font-medium"
                  >
                    {isTimelineExpanded ? t('experience.see_less') : t('experience.see_more')}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
