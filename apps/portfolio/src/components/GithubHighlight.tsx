import { motion } from 'motion/react';
import { Star, GitFork, BookOpen } from 'lucide-react';
import { GithubRepo } from '@workspace/shared';

interface Props {
  repos: GithubRepo[];
}

export default function GithubHighlight({ repos }: Props) {
  if (!repos || repos.length === 0) return null;

  return (
    <section id="github" className="py-32 px-6 max-w-7xl mx-auto bg-surface-container-low border-y border-outline-variant/30">
      <div className="flex justify-between items-end mb-16">
        <div>
          <span className="font-headline font-bold text-xs tracking-[0.3em] uppercase text-outline mb-4 block">Open Source</span>
          <h2 className="font-headline text-5xl font-bold uppercase"><span className="text-primary italic">Github</span> Highlights</h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo, idx) => (
          <motion.div 
            key={repo.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="bg-surface-container border border-outline-variant p-6 hover:border-primary transition-all group"
          >
            <div className="flex items-start gap-4 mb-4">
              <BookOpen className="w-6 h-6 text-primary mt-1" />
              <div>
                <a href={repo.html_url} target="_blank" rel="noreferrer" className="font-headline text-xl font-bold uppercase group-hover:text-primary transition-colors">
                  {repo.name}
                </a>
                <p className="text-sm text-outline mt-1 font-mono">{repo.language}</p>
              </div>
            </div>
            
            <p className="text-on-surface-variant mb-6 text-sm h-16 overflow-hidden">
              {repo.description || "No description provided."}
            </p>

            <div className="flex items-center gap-6 mt-auto pt-4 border-t border-outline-variant/30">
              <div className="flex items-center gap-2 text-sm text-outline">
                <Star className="w-4 h-4" /> <span>{repo.stargazers_count}</span>
              </div>
              <div className="text-xs text-outline font-bold tracking-widest uppercase ml-auto">
                Updated {new Date(repo.updated_at).toLocaleDateString()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
