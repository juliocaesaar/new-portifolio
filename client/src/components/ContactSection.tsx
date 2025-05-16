import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  MapPin, 
  Clock, 
  Send,
  Github, 
  Linkedin, 
  Twitter, 
  Dribbble
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Submit the form data to the server
      await apiRequest("POST", "/api/contact", formData);
      
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact me directly via email.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 alt">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <SectionHeading>Let's Work Together</SectionHeading>
            
            <p className="text-lg mb-8 text-gray-700 dark:text-gray-300">
              I'm currently available for freelance projects, consulting work, or full-time positions. If you have a project that needs expertise in software development, let's discuss how I can help you.
            </p>
            
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg mr-4">
                  <Mail className="text-primary dark:text-green-400 h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <a href="mailto:contact@julio.dev" className="text-primary dark:text-green-400">
                    contact@julio.dev
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg mr-4">
                  <MapPin className="text-primary dark:text-green-400 h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Location</h3>
                  <p className="text-gray-600 dark:text-gray-400">San Francisco, CA (Remote Available)</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg mr-4">
                  <Clock className="text-primary dark:text-green-400 h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Availability</h3>
                  <p className="text-gray-600 dark:text-gray-400">Available for new projects</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Connect with me</h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="bg-white dark:bg-dark-bg p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-dark-border"
                  aria-label="GitHub Profile"
                >
                  <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </a>
                <a 
                  href="#" 
                  className="bg-white dark:bg-dark-bg p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-dark-border"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </a>
                <a 
                  href="#" 
                  className="bg-white dark:bg-dark-bg p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-dark-border"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </a>
                <a 
                  href="#" 
                  className="bg-white dark:bg-dark-bg p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-dark-border"
                  aria-label="Dribbble Profile"
                >
                  <Dribbble className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </a>
              </div>
            </div>
          </motion.div>
          
          <motion.div 
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <Card>
              <CardContent className="pt-8">
                <h3 className="font-bold text-xl mb-6">Send Me a Message</h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="mb-2">Name</Label>
                    <Input 
                      type="text" 
                      id="name" 
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="mb-2">Email</Label>
                    <Input 
                      type="email" 
                      id="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Your email address"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject" className="mb-2">Subject</Label>
                    <Input 
                      type="text" 
                      id="subject" 
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="What's this about?"
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="mb-2">Message</Label>
                    <Textarea 
                      id="message" 
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4} 
                      placeholder="Tell me about your project..."
                      required
                    />
                  </div>
                  
                  <div>
                    <Button 
                      type="submit" 
                      className="w-full gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
