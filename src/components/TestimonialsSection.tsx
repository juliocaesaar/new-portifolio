import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const testimonials = [
  {
    quote: "Julio transformed our document management system from an outdated platform to a cutting-edge solution. His technical expertise and project management skills ensured the project was delivered on time and exceeded our expectations.",
    name: "Sarah Johnson",
    designation: "CTO at TechInnovate",
    src: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
  },
  {
    quote: "Our e-commerce platform needed serious optimization and Julio delivered beyond our expectations. Site performance improved dramatically and our conversion rates increased by 35%. His full-stack expertise was invaluable.",
    name: "Michael Chen",
    designation: "Founder at E-Market Solutions",
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
  },
  {
    quote: "Julio's ability to translate our design concepts into functional, responsive websites is remarkable. His attention to detail and understanding of UX principles made him an invaluable partner for our agency projects.",
    name: "Emily Rodriguez",
    designation: "Creative Director at Design Studio",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
  },
  {
    quote: "The food delivery system Julio built for our restaurant chain revolutionized our operations. The real-time tracking and seamless integration with our POS system has increased our delivery capacity by 200%.",
    name: "David Wilson",
    designation: "Owner at Urban Eats Chain",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500&q=80",
  }
];

export default function TestimonialsSection() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Simulate loading
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <section id="testimonials" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 dark:from-primary/10"></div>
        <div className="container mx-auto relative z-10">
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <SectionHeading className="text-center mx-auto mb-4">Client Testimonials</SectionHeading>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Hear what clients and colleagues have to say about working with me.
            </p>
          </motion.div>
          <div className="flex flex-col items-center justify-center relative">
            <div className="relative flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
              <Skeleton className="h-24 w-full rounded-lg mb-4" />
              <div className="flex items-center justify-center">
                <Skeleton className="h-12 w-12 rounded-full mr-4" />
                <div className="text-left">
                  <Skeleton className="h-5 w-32 rounded mb-1" />
                  <Skeleton className="h-4 w-24 rounded" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 dark:from-primary/10"></div>

      <div className="container mx-auto relative z-10">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <SectionHeading className="text-center mx-auto mb-4">Client Testimonials</SectionHeading>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Hear what clients and colleagues have to say about working with me.
          </p>
        </motion.div>

        <AnimatedTestimonials testimonials={testimonials} autoplay={true} />
      </div>
    </section>
  );
}
