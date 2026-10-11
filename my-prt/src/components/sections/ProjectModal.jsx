import { motion } from 'framer-motion';
import { X, ExternalLink, Github, CheckCircle, Zap } from 'lucide-react';

export default function ProjectModal({ project, onClose, t, theme }) {
  const features = [
    'Real-time синхронизация данных',
    'Адаптивный дизайн (Mobile-first)',
    'CRUD операции',
    'Авторизация и роли пользователей',
    'Облачная база данных',
    'Анимации и UX-улучшения'
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="border rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
          borderColor: theme === 'dark' ? 'rgba(51,65,85,0.5)' : 'rgba(203,213,225,0.5)'
        }}
      >
        <div className="relative h-64 overflow-hidden rounded-t-3xl">
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 backdrop-blur rounded-full text-white hover:bg-white/20 transition-colors"
            style={{ backgroundColor: 'rgba(15,23,42,0.8)' }}
            data-hover
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-4 left-6 right-6">
            <span className={`px-4 py-1 rounded-full bg-gradient-to-r ${project.statusColor} text-white text-sm font-bold`}>
              {project.status}
            </span>
          </div>
        </div>

        <div className="p-8">
          <p className="font-medium mb-2" style={{ color: '#a855f7' }}>{project.subtitle}</p>
          <h2 className="text-4xl font-bold mb-4">{project.title}</h2>
          <p className="text-lg leading-relaxed mb-6" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>
            {project.description}
          </p>

          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: '#94a3b8' }}>
              <Zap size={16} /> {t.projects.stack}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map(tech => (
                <span key={tech} className="px-4 py-2 rounded-lg border text-sm"
                  style={{
                    backgroundColor: 'rgba(30,41,59,0.4)',
                    borderColor: 'rgba(51,65,85,0.5)',
                    color: theme === 'dark' ? '#cbd5e1' : '#475569'
                  }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-bold uppercase tracking-wider mb-3 flex items-center gap-2" style={{ color: '#94a3b8' }}>
              <CheckCircle size={16} /> Ключевые фичи
            </h3>
            <div className="grid md:grid-cols-2 gap-2">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-2 text-sm" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500" />
                  {f}
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg"
              data-hover
            >
              <ExternalLink size={18} />
              {t.projects.live}
            </motion.a>
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-3 border rounded-xl font-bold flex items-center justify-center gap-2"
              style={{
                backgroundColor: 'rgba(30,41,59,0.4)',
                borderColor: 'rgba(51,65,85,0.5)',
                color: theme === 'dark' ? '#cbd5e1' : '#475569'
              }}
              data-hover
            >
              <Github size={18} />
              {t.projects.code}
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}