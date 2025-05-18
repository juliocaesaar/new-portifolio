
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

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

const skills: Skill[] = [
  { name: "Frontend Development", percentage: 95 },
  { name: "Backend Development", percentage: 90 },
  { name: "Mobile Development", percentage: 85 },
  { name: "Project Leadership", percentage: 80 },
  { name: "Solution Architecture", percentage: 85 }
];

const experiences: Experience[] = [
  {
    role: "Full Stack Developer",
    company: "Freelancer",
    period: "2023 - Present",
    description: "Development of web and mobile solutions focusing on modern technologies and best practices. Leading projects from conception to deployment.",
    technologies: ["React", "Node.js", "React Native", "TypeScript", "REST APIs"],
    color: "blue"
  },
  {
    role: "Mobile Developer",
    company: "Independent Projects",
    period: "2022 - 2023",
    description: "Created innovative mobile applications with focus on user experience and performance optimization.",
    technologies: ["React Native", "JavaScript", "Mobile Design", "API Integration"],
    color: "green"
  },
  {
    role: "Software Developer",
    company: "Personal Projects",
    period: "2021 - 2022",
    description: "Built full-stack applications and contributed to open source projects. Focus on web technologies and modern development practices.",
    technologies: ["JavaScript", "React", "Node.js", "Git", "Agile"],
    color: "purple"
  }
];

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeading className="text-center mx-auto mb-4">Professional Experience</SectionHeading>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Throughout my career, I've focused on delivering high-quality software solutions and staying updated with modern technologies.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          <motion.div 
            className="md:w-1/3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="sticky top-24">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-xl mb-6">Key Expertise</h3>

                  <div className="space-y-6">
                    {skills.map((skill, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">{skill.percentage}%</span>
                        </div>
                        <Progress value={skill.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <a 
                      href="#contact" 
                      className="inline-flex items-center text-primary dark:text-green-400 font-medium"
                    >
                      Contact Me
                      <svg 
                        className="ml-2 h-4 w-4" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          <div className="md:w-2/3">
            <div className="relative border-l-2 border-gray-200 dark:border-dark-border pl-8 ml-4">
              {experiences.map((exp, index) => (
                <motion.div 
                  key={index} 
                  className="mb-12 last:mb-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "-100px" }}
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
                        {exp.description}
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
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
