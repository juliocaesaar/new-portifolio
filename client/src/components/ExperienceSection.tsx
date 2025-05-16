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
  { name: "UI/UX Design", percentage: 85 },
  { name: "DevOps", percentage: 80 },
  { name: "Project Management", percentage: 85 }
];

const experiences: Experience[] = [
  {
    role: "Lead Software Engineer",
    company: "TechInnovate Solutions",
    period: "2020 - Present",
    description: "Leading the development of a SaaS platform for enterprise document management. Responsible for architecture design, team management, and ensuring code quality across the full stack.",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS", "Team Management"],
    color: "blue"
  },
  {
    role: "Full Stack Developer",
    company: "E-Market Solutions",
    period: "2018 - 2020",
    description: "Developed and maintained multiple e-commerce platforms, implementing payment gateways, inventory management systems, and responsive UIs. Improved site performance by 40%.",
    technologies: ["JavaScript", "PHP", "MySQL", "Docker", "REST APIs"],
    color: "green"
  },
  {
    role: "UI/UX Designer & Frontend Developer",
    company: "Creative Digital Agency",
    period: "2016 - 2018",
    description: "Designed and implemented user interfaces for various client websites and applications. Created wireframes, prototypes, and translated designs into responsive frontends.",
    technologies: ["Figma", "HTML/CSS", "JavaScript", "User Testing", "Accessibility"],
    color: "purple"
  },
  {
    role: "Junior Web Developer",
    company: "TechStart Inc.",
    period: "2014 - 2016",
    description: "Started my professional journey building and maintaining websites for small businesses. Focused on front-end development while learning backend technologies.",
    technologies: ["HTML/CSS", "jQuery", "WordPress", "Responsive Design"],
    color: "gray"
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
            Throughout my career, I've worn many hats and gained valuable experience across various domains of software development.
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
                      href="#" 
                      className="inline-flex items-center text-primary dark:text-green-400 font-medium"
                    >
                      Download CV
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
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"></path>
                        <polyline points="7 10 12 15 17 10"></polyline>
                        <line x1="12" y1="15" x2="12" y2="3"></line>
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