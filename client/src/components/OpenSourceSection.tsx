import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, GitFork, Star } from "lucide-react";
import { useEffect, useState } from "react";

type Repository = {
  name: string;
  description: string;
  stars: number;
  forks: number;
  url: string;
  language: string;
};

export default function OpenSourceSection() {
  const [repos, setRepos] = useState<Repository[]>([]);

  useEffect(() => {
    fetch('/api/github-repos')
      .then(response => response.json())
      .then(data => {
        // Shuffle array and get first 4 items
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        setRepos(shuffled.slice(0, 4));
      })
      .catch(error => console.error('Error fetching repos:', error));
  }, []);

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
          <SectionHeading className="text-center mx-auto mb-4">Open Source Projects</SectionHeading>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Check out my open source projects and contributions on GitHub.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map((repo, index) => (
            <motion.div 
              key={repo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="h-full flex flex-col">
                <CardContent className="pt-6 pb-4 flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl">{repo.name}</h3>
                    {repo.language && (
                      <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-0">
                        {repo.language}
                      </Badge>
                    )}
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {repo.description || 'No description available'}
                  </p>

                  <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-auto">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{repo.stars}</span>
                        </div>
                        <div className="flex items-center">
                          <GitFork className="h-4 w-4 text-blue-500 mr-1" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{repo.forks}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <a
                          href={repo.url}
                          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`View ${repo.name} source code on GitHub`}
                        >
                          <Github className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}