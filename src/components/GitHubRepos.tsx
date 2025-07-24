import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from '../hooks/useTranslation';
import { Skeleton } from './ui/skeleton';

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  updated_at: string;
}

const GitHubRepos: React.FC = () => {
  const { t } = useTranslation();
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get<Repo[]>('https://api.github.com/users/juliocaesaar/repos', {
          params: {
            sort: 'updated',
            direction: 'desc',
            per_page: 100 // Fetch up to 100 repos
          }
        });
        setRepos(response.data);
      } catch (err) {
        setError('Erro ao buscar repositórios do GitHub.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-sm">
            <Skeleton className="h-6 w-3/4 rounded mb-3" />
            <Skeleton className="h-4 w-full rounded mb-2" />
            <Skeleton className="h-4 w-5/6 rounded mb-4" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-1/2 rounded" />
              <Skeleton className="h-4 w-1/3 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {repos.map((repo) => (
        <div key={repo.id} className="border p-4 rounded-lg shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-semibold mb-2">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                {repo.name}
              </a>
            </h3>
            <p className="text-gray-700 mb-2">{repo.description || 'Sem descrição'}</p>
          </div>
          <div className="text-sm text-gray-600 mt-2">
            <p><strong>{t('open_source.language')}:</strong> {repo.language || 'Não especificada'}</p>
            <p><strong>{t('open_source.stars')}:</strong> {repo.stargazers_count}</p>
            <p><strong>{t('open_source.last_update')}:</strong> {new Date(repo.updated_at).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GitHubRepos;
