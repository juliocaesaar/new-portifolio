import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2 } from "lucide-react";

type SkillCategory = {
  name: string;
  value: string;
  skills: string[];
};

const skillCategories: SkillCategory[] = [
  {
    name: "Frontend",
    value: "frontend",
    skills: [
      "React.js / Next.js",
      "TypeScript / JavaScript",
      "HTML5 / CSS3 / SASS",
      "Tailwind CSS / Styled Components",
      "Redux / Context API",
      "Responsive Design",
      "Progressive Web Apps (PWA)",
      "Webpack / Vite"
    ]
  },
  {
    name: "Backend",
    value: "backend",
    skills: [
      "Node.js / Express",
      "Python / Django / Flask",
      "RESTful APIs",
      "GraphQL",
      "Authentication & Authorization",
      "Microservices Architecture",
      "WebSockets",
      "Server-Side Rendering"
    ]
  },
  {
    name: "Database",
    value: "database",
    skills: [
      "PostgreSQL / MySQL",
      "MongoDB / NoSQL",
      "Redis / Caching",
      "Database Design",
      "ORM (Sequelize, Prisma)",
      "Data Modeling",
      "Query Optimization",
      "Database Migrations"
    ]
  },
  {
    name: "DevOps",
    value: "devops",
    skills: [
      "Docker / Containerization",
      "CI/CD Pipelines",
      "AWS / Cloud Services",
      "Kubernetes",
      "Infrastructure as Code",
      "Linux Server Management",
      "Monitoring & Logging",
      "Performance Optimization"
    ]
  },
  {
    name: "Tools",
    value: "tools",
    skills: [
      "Git / Version Control",
      "GitHub / GitLab",
      "JIRA / Project Management",
      "Testing (Jest, Cypress)",
      "Figma / Adobe XD",
      "VS Code / Development Tools",
      "Postman / API Testing",
      "Agile Methodologies"
    ]
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 alt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeading className="text-center mx-auto mb-4">Skills & Technologies</SectionHeading>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            My multidisciplinary skill set enables me to deliver comprehensive solutions
            across the entire development stack.
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Tabs defaultValue="frontend" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8 bg-muted/60">
              {skillCategories.map((category) => (
                <TabsTrigger 
                  key={category.value} 
                  value={category.value}
                  className="text-sm py-2"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {skillCategories.map((category) => (
              <TabsContent key={category.value} value={category.value}>
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {category.skills.map((skill, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="flex items-center space-x-2"
                        >
                          <CheckCircle2 className="h-5 w-5 text-primary dark:text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 dark:text-gray-300">{skill}</span>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
        
        <motion.div 
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-2">Problem Solving</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Analytical approach to breaking down complex problems into manageable solutions.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-2">Adaptability</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Quick to learn new technologies and adapt to changing project requirements.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-2">Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Effective communication and teamwork across cross-functional teams.
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-2">Project Management</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Skilled in planning, executing, and delivering projects on time and within scope.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}