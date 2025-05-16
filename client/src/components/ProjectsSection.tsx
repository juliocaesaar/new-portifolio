import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const projects: Project[] = [
  {
    title: "Document Management SaaS",
    category: "SaaS",
    description: "A comprehensive document management platform for enterprises with advanced search, permissions, and workflow automation.",
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    technologies: ["React", "Node.js", "PostgreSQL", "AWS"],
    caseStudyUrl: "#",
    githubUrl: "#",
    badgeColor: "blue"
  },
  {
    title: "Premium E-commerce Platform",
    category: "E-commerce",
    description: "A high-performance e-commerce solution with advanced analytics, inventory management, and personalized recommendations.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    technologies: ["Next.js", "PHP", "MySQL", "Stripe"],
    caseStudyUrl: "#",
    githubUrl: "#",
    badgeColor: "green"
  },
  {
    title: "FastFood Delivery System",
    category: "Mobile App",
    description: "A complete food ordering and delivery solution with real-time tracking, payment processing, and vendor management.",
    image: "https://images.unsplash.com/photo-1550565118-3a14e8d0386f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    technologies: ["React Native", "Firebase", "Maps API", "Push Notifications"],
    caseStudyUrl: "#",
    githubUrl: "#",
    badgeColor: "orange"
  },
  {
    title: "Corporate Website Redesign",
    category: "Web Design",
    description: "Complete redesign of a corporate website focusing on improved user experience, performance, and conversion optimization.",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    technologies: ["Figma", "WordPress", "SEO", "Analytics"],
    caseStudyUrl: "#",
    externalUrl: "#",
    badgeColor: "purple"
  },
  {
    title: "CI/CD Pipeline Automation",
    category: "DevOps",
    description: "Designed and implemented automated deployment pipelines for microservices architecture, reducing deployment time by 70%.",
    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    technologies: ["Docker", "Kubernetes", "Jenkins", "AWS"],
    caseStudyUrl: "#",
    githubUrl: "#",
    badgeColor: "red"
  },
  {
    title: "Business Analytics Dashboard",
    category: "Data Viz",
    description: "Interactive dashboard for business analytics with real-time data visualization, reporting, and predictive modeling.",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    technologies: ["Vue.js", "Python", "D3.js", "REST API"],
    caseStudyUrl: "#",
    githubUrl: "#",
    badgeColor: "yellow"
  }
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-dark-card/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeading className="text-center mx-auto mb-4">Featured Projects</SectionHeading>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            A selection of projects that showcase my skills across different domains and technologies.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="overflow-hidden h-full transition-all duration-300 hover:translate-y-[-5px]">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl">{project.title}</h3>
                    <Badge variant="outline" className={`bg-${project.badgeColor}-100 dark:bg-${project.badgeColor}-900/30 text-${project.badgeColor}-800 dark:text-${project.badgeColor}-300 border-0`}>
                      {project.category}
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
                  <div className="flex justify-between items-center">
                    <a 
                      href={project.caseStudyUrl} 
                      className="text-primary dark:text-green-400 font-medium flex items-center"
                    >
                      View Case Study
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                    <div className="flex space-x-2">
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
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Button variant="outline" className="gap-2">
            View All Projects <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
