import { motion } from 'framer-motion';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { projects } from '../../data/projects';
import Button from '../ui/Button';

export default function Projects({ t }) {
  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-purple-400 font-medium mb-2 tracking-wider uppercase text-sm">03 — {t.nav.projects}</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{t.projects.title}</h2>
          <p className="text-slate-400">{t.projects.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-3xl overflow-hidden hover:border-purple-500/50 transition-all"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${project.statusColor} text-white text-xs font-bold`}>
                  {project.status}
                </div>
                {project.featured && (
                  <div className="absolute top-4 left-4 flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur text-amber-400 text-xs font-bold">
                    <Sparkles size={12} /> Featured
                  </div>
                )}
              </div>

              <div className="p-6">
                <p className="text-xs text-purple-400 font-medium uppercase tracking-wider mb-2">{project.subtitle}</p>
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-5 leading-relaxed">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {project.techStack.map(tech => (
                    <span key={tech} className="px-3 py-1 rounded-lg bg-slate-700/50 text-xs text-slate-300 border border-slate-600/50">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button variant="secondary" href={project.liveUrl} icon={ExternalLink} className="flex-1 justify-center text-sm">
                    {t.projects.live}
                  </Button>
                  <Button variant="ghost" href={project.githubUrl} icon={Github} className="flex-1 justify-center text-sm">
                    {t.projects.code}
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
