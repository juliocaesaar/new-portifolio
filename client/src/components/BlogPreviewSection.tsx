import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, Calendar } from "lucide-react";

type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  publishDate: string;
  readTime: string;
  category: string;
  image: string;
  slug: string;
};

const featuredPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Scalable React Applications",
    excerpt: "Learn how to structure your React applications for scalability with modern architecture patterns.",
    publishDate: "May 10, 2023",
    readTime: "8 min read",
    category: "React",
    image: "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    slug: "building-scalable-react-applications"
  },
  {
    id: "2",
    title: "Optimizing Database Performance",
    excerpt: "Techniques and best practices for optimizing your database queries and structure.",
    publishDate: "April 22, 2023",
    readTime: "12 min read",
    category: "Database",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    slug: "optimizing-database-performance"
  },
  {
    id: "3",
    title: "CI/CD Pipeline Automation",
    excerpt: "How to set up an efficient CI/CD pipeline for your projects using GitHub Actions.",
    publishDate: "March 15, 2023",
    readTime: "10 min read",
    category: "DevOps",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400&q=80",
    slug: "ci-cd-pipeline-automation"
  }
];

export default function BlogPreviewSection() {
  return (
    <section id="blog" className="py-20 alt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div>
            <SectionHeading>Latest Articles</SectionHeading>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
              I regularly write about software development, best practices, and industry trends.
            </p>
          </div>
          
          <Button variant="outline" className="mt-4 md:mt-0 gap-2">
            View all articles <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post, index) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="pt-6 pb-4 flex-grow flex flex-col">
                  <div className="mb-2">
                    <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-0">
                      {post.category}
                    </Badge>
                  </div>
                  
                  <h3 className="font-bold text-xl mb-3 hover:text-primary dark:hover:text-green-400 transition-colors">
                    <a href={`/blog/${post.slug}`}>{post.title}</a>
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.publishDate}
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
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