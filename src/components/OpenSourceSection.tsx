import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, GitFork, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import axios from 'axios'; // Importar axios


type Repository = {
  id: number; // Adicionar id
  name: string;
  description: string | null; // Permitir null
  stargazers_count: number; // Mudar para stargazers_count
  forks_count: number; // Mudar para forks_count
  html_url: string; // Mudar para html_url
  language: string | null; // Permitir null
  updated_at: string; // Adicionar updated_at
};


export default function OpenSourceSection() {
  const { t } = useTranslation();
  const [allRepos, setAllRepos] = useState<Repository[]>([]); // Armazena todos os repositórios
  const [displayedRepos, setDisplayedRepos] = useState<Repository[]>([]); // Armazena os 6 repositórios exibidos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get<Repository[]>('https://api.github.com/users/juliovt-07/repos', {
          params: {
            sort: 'updated',
            direction: 'desc',
            per_page: 100 // Buscar um número suficiente para randomizar
          }
        });
        setAllRepos(response.data);
        selectRandomRepos(response.data); // Selecionar 6 repositórios iniciais
      } catch (err) {
        setError('Erro ao buscar repositórios do GitHub.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  const selectRandomRepos = (repos: Repository[]) => {
    const shuffled = repos.sort(() => 0.5 - Math.random());
    setDisplayedRepos(shuffled.slice(0, 6)); // Selecionar os primeiros 6 após embaralhar
  };

  const handleRefreshClick = () => {
    selectRandomRepos(allRepos); // Selecionar 6 novos repositórios aleatórios dos repositórios já buscados
  };


  if (loading) {
    return (
      <section id="open-source" className="py-20 alt">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading className="text-center mx-auto mb-4">{t('open_source.heading')}</SectionHeading>
          <p className="text-center text-gray-600 dark:text-gray-400">Carregando repositórios...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="open-source" className="py-20 alt">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading className="text-center mx-auto mb-4">{t('open_source.heading')}</SectionHeading>
          <p className="text-center text-red-500">{error}</p>
        </div>
      </section>
    );
  }


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
          <SectionHeading className="text-center mx-auto mb-4">{t('open_source.heading')}</SectionHeading>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t('open_source.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Layout responsivo */}
          {displayedRepos.map((repo, index) => (
            <motion.div
              key={repo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Card className="h-full flex flex-col">
                <CardContent className="pt-6 pb-4 flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl truncate"> {/* Adicionar classe truncate */}
                      <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                        {repo.name}
                      </a>
                    </h3>
                    {repo.language && (
                      <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 border-0">
                        {repo.language}
                      </Badge>
                    )}
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {repo.description || t('open_source.no_description')}
                  </p>

                  <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mt-auto">
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center">
                          <GitFork className="h-4 w-4 text-blue-500 mr-1" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{repo.forks_count}</span>
                        </div>
                         <div className="flex items-center">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Última atualização: {new Date(repo.updated_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <a
                          href={repo.html_url}
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
         <div className="text-center mt-8"> {/* Botão de atualizar */}
          <button
            onClick={handleRefreshClick}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Atualizar Repositórios
          </button>
        </div>
      </div>
    </section>
  );
}
