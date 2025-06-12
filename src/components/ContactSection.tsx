import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/useTranslation";
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
interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactSection() {
  const { toast } = useToast();
  const { t } = useTranslation();
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
    <section id="contact" className="relative py-20 alt text-center">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
        <div className="flex flex-col lg:flex-row gap-16 w-full max-w-3xl">
          <motion.div
            className="w-full"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <SectionHeading className="justify-center">
              {t('contact.heading')}
            </SectionHeading>

            <p className="text-lg mb-8 text-gray-700 dark:text-gray-300 max-w-prose mx-auto">
              {t('contact.description')}
            </p>

            <div className="space-y-6 mb-8 w-full lg:w-auto mx-auto">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-primary dark:text-green-400 h-5 w-5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                </div>
                <div>
                  <h3 className="font-semibold">WhatsApp</h3>
                  <a href="https://wa.me/5599984738118" className="text-primary dark:text-green-400" target="_blank" rel="noopener noreferrer">
                    +55 99 98473-8118
                  </a>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg mb-2">
                  <MapPin className="text-primary dark:text-green-400 h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('contact.location_heading')}</h3>
<p className="text-gray-600 dark:text-gray-400">{t('contact.location_text')}</p>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <div className="bg-primary/10 dark:bg-primary/20 p-3 rounded-lg mb-2">
                  <Clock className="text-primary dark:text-green-400 h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{t('contact.availability_heading')}</h3>
<p className="text-gray-600 dark:text-gray-400">{t('contact.availability_text')}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 w-full lg:w-auto mx-auto">
              <h3 className="font-semibold text-lg">{t('contact.connect_heading')}</h3>
              <div className="flex space-x-4 justify-center">
                <a
                  href="https://github.com/juliovt-07" // Link do GitHub
                  className="bg-white dark:bg-[hsl(var(--dark-bg))] p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-dark-border"
                  aria-label="GitHub Profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </a>
                <a
                  href="https://www.linkedin.com/in/juliocesaar" // Link do LinkedIn atualizado
                  className="bg-white dark:bg-[hsl(var(--dark-bg))] p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-dark-border"
                  aria-label="LinkedIn Profile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </a>
                {/* <a
                  href="#" // Link placeholder
                  className="bg-white dark:bg-[hsl(var(--dark-bg))] p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 dark:border-dark-border"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </a> */}
                {/* Removido Dribbble pois não foi mencionado */}
              </div>
            </div>
          </motion.div>

          {/* Formulário de contato removido */}

        </div>
      </div>
    </section>
  );
}
