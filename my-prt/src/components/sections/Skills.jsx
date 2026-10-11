import { motion, useMotionValue } from 'framer-motion';
import { useRef } from 'react';
import { Code2, Wrench, Layers } from 'lucide-react';

export default function Skills({ t, theme }) {
  const containerRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const skillGroups = [
    {
      icon: Code2,
      title: 'FRONTEND DEVELOPMENT',
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'React', level: 90 },
        { name: 'Redux Toolkit', level: 85 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'Material UI', level: 80 },
        { name: 'CSS3', level: 90 }
      ]
    },
    {
      icon: Wrench,
      title: 'TOOLS & ECOSYSTEM',
      color: 'from-cyan-500 to-blue-500',
      skills: [
        { name: 'Git', level: 85 },
        { name: 'Vite', level: 90 },
        { name: 'Vercel', level: 85 },
        { name: 'Firebase', level: 80 },
        { name: 'Cloudinary', level: 75 },
        { name: 'Telegram API', level: 70 }
      ]
    },
    {
      icon: Layers,
      title: 'ADDITIONAL SKILLS',
      color: 'from-emerald-500 to-teal-500',
      skills: [
        { name: 'Mobile-first design', level: 90 },
        { name: 'UI/UX Principles', level: 85 },
        { name: 'i18n Multilanguage', level: 80 },
        { name: 'REST API Integration', level: 85 }
      ]
    }
  ];

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-medium mb-2 tracking-wider uppercase text-sm" style={{ color: '#a855f7' }}>
            02 — {t.nav.skills}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t.skills.title}</h2>
          <p className="mt-3" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>{t.skills.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {skillGroups.map((group, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="glass-card rounded-2xl p-6 transition-all"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${group.color} flex items-center justify-center mb-4`}>
                <group.icon className="text-white" size={24} />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>
                {group.title}
              </h3>
              <div className="space-y-2">
                {group.skills.map((skill, j) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: j * 0.05 }}
                    className="flex items-center gap-3"
                    data-hover
                  >
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${group.color}`} />
                    <span className="flex-1 text-sm" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>
                      {skill.name}
                    </span>
                    <span className="text-xs font-bold" style={{ color: '#a855f7' }}>{skill.level}%</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Floating tags section */}
        <motion.div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          className="mt-16 flex flex-wrap justify-center gap-3"
        >
          {skillGroups.flatMap(g => g.skills).map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, type: 'spring' }}
              whileHover={{
                scale: 1.15,
                y: -5,
                boxShadow: '0 10px 30px rgba(139,92,246,0.3)'
              }}
              className="glass-card px-4 py-2 rounded-full text-sm font-medium cursor-default"
              style={{ color: theme === 'dark' ? '#e2e8f0' : '#1e293b' }}
              data-hover
            >
              {skill.name}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
