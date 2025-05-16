import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Star, StarHalf } from "lucide-react";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  company: string;
  image: string;
  rating: number;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CTO",
    company: "TechInnovate",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
    rating: 5,
    text: "Julio transformed our document management system from an outdated platform to a cutting-edge solution. His technical expertise and project management skills ensured the project was delivered on time and exceeded our expectations."
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder",
    company: "E-Market Solutions",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
    rating: 5,
    text: "Our e-commerce platform needed serious optimization and Julio delivered beyond our expectations. Site performance improved dramatically and our conversion rates increased by 35%. His full-stack expertise was invaluable."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Creative Director",
    company: "Design Studio",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
    rating: 4.5,
    text: "Julio's ability to translate our design concepts into functional, responsive websites is remarkable. His attention to detail and understanding of UX principles made him an invaluable partner for our agency projects."
  },
  {
    id: 4,
    name: "David Wilson",
    role: "Owner",
    company: "Urban Eats Chain",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80",
    rating: 5,
    text: "The food delivery system Julio built for our restaurant chain revolutionized our operations. The real-time tracking and seamless integration with our POS system has increased our delivery capacity by 200%."
  }
];

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-green-500/5 dark:from-primary/10 dark:to-green-500/10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
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
        
        <div className="testimonial-slider relative">
          <div className="flex flex-nowrap overflow-x-auto gap-6 pb-8 scroller">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={testimonial.id}
                className="flex-shrink-0 w-full md:w-[400px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card className="h-full">
                  <CardContent className="p-8">
                    <div className="flex items-center mb-6">
                      <div className="mr-4">
                        <div className="w-12 h-12 bg-gray-200 dark:bg-dark-card rounded-full overflow-hidden">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h3 className="font-bold">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{testimonial.role}, {testimonial.company}</p>
                      </div>
                    </div>
                    <div className="mb-6">
                      <div className="flex text-yellow-400 mb-2">
                        {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                        {testimonial.rating % 1 !== 0 && (
                          <StarHalf className="h-4 w-4 fill-current" />
                        )}
                      </div>
                      <p className="italic text-gray-600 dark:text-gray-300">
                        "{testimonial.text}"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeIndex === index 
                    ? "bg-primary opacity-100" 
                    : "bg-gray-300 dark:bg-gray-600 opacity-60"
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
