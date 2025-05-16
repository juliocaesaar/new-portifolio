import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, GitFork, Star } from "lucide-react";

type OpenSourceProject = {
  name: string;
  description: string;
  technologies: string[];
  role: string;
  contributions: string[];
  stars: number;
  forks: number;
  repoUrl: string;
  demoUrl?: string;
};

const openSourceProjects: OpenSourceProject[] = [
  {
    name: "React Component Library",
    description: "A collection of reusable React components built with TypeScript and styled with Tailwind CSS.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Storybook"],
    role: "Maintainer",
    contributions: [
      "Implemented 20+ components with comprehensive documentation",
      "Set up automated testing with Jest and React Testing Library",
      "Created CI/CD pipeline with GitHub Actions"
    ],
    stars: 345,
    forks: 85,
    repoUrl: "#",
    demoUrl: "#"
  },
  {
    name: "NodeJS API Framework",
    description: "A lightweight framework for building RESTful APIs with Node.js, Express, and TypeScript.",
    technologies: ["Node.js", "Express", "TypeScript", "MongoDB"],
    role: "Contributor",
    contributions: [
      "Implemented authentication middleware with JWT",
      "Added request validation with Zod",
      "Improved error handling and logging"
    ],
    stars: 423,
    forks: 97,
    repoUrl: "#",
    demoUrl: "#"
  },
  {
    name: "DevOps Toolkit",
    description: "A collection of scripts and tools for automating development and deployment workflows.",
    technologies: ["Bash", "Docker", "GitHub Actions", "AWS"],
    role: "Maintainer",
    contributions: [
      "Created Docker deployment scripts for various platforms",
      "Built GitHub Action for automated testing and deployment",
      "Added comprehensive documentation and examples"
    ],
    stars: 217,
    forks: 43,
    repoUrl: "#"
  }
];

export default function OpenSourceSection() {
  return (
    <section id="open-source" className="py-20 alt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeading className="text-center mx-auto mb-4">Open Source Contributions</SectionHeading>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            I'm passionate about contributing to open source projects. Here are some of my notable contributions and projects I maintain.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {openSourceProjects.map((project, index) => (
            <motion.div 
              key={project.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="h-full flex flex-col">
                <CardContent className="pt-6 pb-4 flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl">{project.name}</h3>
                    <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-0">
                      {project.role}
                    </Badge>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge key={techIndex} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-sm mb-2">Key Contributions:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {project.contributions.map((contribution, i) => (
                        <li key={i} className="text-sm text-gray-600 dark:text-gray-400">
                          {contribution}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                
                <div className="border-t border-gray-200 dark:border-gray-800 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{project.stars}</span>
                      </div>
                      <div className="flex items-center">
                        <GitFork className="h-4 w-4 text-blue-500 mr-1" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">{project.forks}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <a
                        href={project.repoUrl}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${project.name} source code on GitHub`}
                      >
                        <Github className="h-5 w-5" />
                      </a>
                      {project.demoUrl && (
                        <a
                          href={project.demoUrl}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${project.name} demo`}
                        >
                          <ExternalLink className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}