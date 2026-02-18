import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { useTranslation } from "@/hooks/useTranslation";

type Service = {
  name: string;
  summary: string;
  deliverables?: string[];
};

export default function ExperienceSection() {
  const { t, currentTranslations } = useTranslation();

  const services: Service[] = currentTranslations?.experience?.services?.items || [];

  return (
    <section id="experience" className="relative py-20 z-10 bg-black/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {services.length > 0 && (
          <motion.div
            id="services"
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="text-center mb-12">
              <SectionHeading className="text-center mx-auto mb-4">
                {t("experience.services.heading")}
              </SectionHeading>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                {t("experience.services.subtitle")}
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.name + index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true, margin: "-100px" }}
                >
                  <Card className="h-full">
                    <CardContent className="pt-6 pb-6">
                      <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                        {service.name}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {service.summary}
                      </p>
                      {Array.isArray(service.deliverables) && service.deliverables.length > 0 && (
                        <ul className="mt-5 space-y-3 text-sm text-gray-600 dark:text-gray-300">
                          {service.deliverables.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-3">
                              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary dark:bg-green-400" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
