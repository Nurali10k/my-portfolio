import { motion, useMotionValue, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { projects } from '../../data/projects';

// SVG иконки технологий
const TechIcons = {
  React: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#61DAFB">
      <circle cx="12" cy="12" r="2.5" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1" transform="rotate(120 12 12)" />
    </svg>
  ),
  Redux: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#764ABC">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    </svg>
  ),
  Firebase: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#FFCA28">
      <path d="M3.89 15.672L6.255.461A.542.542 0 017.27.289l2.543 4.771zm16.545 3.602l-2.479-15.27a.542.542 0 00-1.015-.183L12 13.124zm-4.273 2.421l-3.844-7.178L8.473 21.7a.542.542 0 00.508.795z" />
    </svg>
  ),
  Tailwind: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#38BDF8">
      <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
    </svg>
  ),
  Vercel: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#ffffff">
      <path d="M12 2L2 20h20L12 2z" />
    </svg>
  ),
  JS: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#F7DF1E">
      <rect width="24" height="24" rx="2" fill="#F7DF1E" />
      <path d="M6 18h2v-6H6v6zm4 0h2v-4h2v4h2v-6h-4v2h2v2h-2v2h-2v-4H10v4z" fill="#000" />
    </svg>
  ),
  Gemini: () => (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="#8B5CF6">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  )
};

function TiltCard({ children }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
    >
      {children}
    </motion.div>
  );
}

export default function FeaturedProjects({ t, theme, onSelectProject }) {
  return (
    <section id="projects" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-medium mb-2 tracking-wider uppercase text-sm" style={{ color: '#a855f7' }}>
            01 — {t.nav.projects}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t.projects.title}</h2>
          <p className="mt-3" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>{t.projects.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.filter(p => p.featured).map((project, i) => (
            <TiltCard key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer glass-card rounded-3xl overflow-hidden transition-all relative"
                data-hover
              >
                {/* Image with overlay */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Overlay with buttons */}
                  <motion.div
  initial={{ opacity: 0 }}
  whileHover={{ opacity: 1 }}
  className="absolute inset-0 bg-gradient-to-t from-purple-900/90 via-slate-900/70 to-transparent backdrop-blur-md flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500"
>
  <motion.a
    href={project.liveUrl}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.1 }}
    whileHover={{ scale: 1.1, boxShadow: '0 10px 30px rgba(139,92,246,0.5)' }}
    onClick={(e) => e.stopPropagation()}
    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg"
    data-hover
  >
    <ExternalLink size={16} /> {t.projects.live}
  </motion.a>
  <motion.a
    href={project.githubUrl}
    target="_blank"
    rel="noopener noreferrer"
    initial={{ y: 20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2 }}
    whileHover={{ scale: 1.1 }}
    onClick={(e) => e.stopPropagation()}
    className="px-6 py-3 bg-white/10 backdrop-blur border border-white/20 text-white rounded-xl font-bold flex items-center gap-2"
    data-hover
  >
    <Github size={16} /> {t.projects.code}
  </motion.a>
</motion.div>
                  
                  {/* Status badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full bg-gradient-to-r ${project.statusColor} text-white text-xs font-bold shadow-lg`}>
                      {project.status}
                    </span>
                  </div>
                </div>

                <div className="p-6 relative">
                  <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                  <p className="text-sm mb-4" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                    {project.subtitle}
                  </p>
                  
                  {/* Tech stack icons in bottom right */}
                  <div className="absolute bottom-4 right-4 flex gap-2">
                    {project.techStack.slice(0, 5).map((tech, idx) => {
                      const Icon = TechIcons[tech];
                      return Icon ? (
                        <motion.div
                          key={tech}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + idx * 0.1 }}
                          whileHover={{ scale: 1.3, y: -3 }}
                          className="w-8 h-8 rounded-lg bg-slate-800/60 backdrop-blur border border-slate-700/50 flex items-center justify-center"
                          title={tech}
                          data-hover
                        >
                          <Icon />
                        </motion.div>
                      ) : null;
                    })}
                  </div>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
