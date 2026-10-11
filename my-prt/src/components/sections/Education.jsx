import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

export default function Education({ t, theme }) {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const timeline = [
    {
      year: '2026 — 2026',
      title: 'OKURMEN IT Academy',
      subtitle: 'Frontend Development Instructor',
      description: 'Преподавание React, Redux, Firebase. Менторство студентов. Разработка учебных проектов.',
      icon: GraduationCap,
      color: 'from-purple-500 to-pink-500',
      current: true
    },
    {
      year: '2026',
      title: 'NEXUS Shop 1.3',
      subtitle: 'Final Project — E-commerce Platform',
      description: 'Разработка полноценного интернет-магазина с Firestore, real-time синхронизацией, AI-чатботом и админ-панелью.',
      icon: Award,
      color: 'from-cyan-500 to-blue-500',
      current: false
    },
    {
      year: '2026',
      title: 'UchiDobro',
      subtitle: 'Social EdTech Platform',
      description: 'Социальная образовательная платформа для связи учеников с учителями-волонтёрами.',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-500',
      current: false
    },
    {
      year: '2026',
      title: 'Portfolio Launch',
      subtitle: 'Personal Brand Website',
      description: 'Создание профессионального портфолио с ultra-modern дизайном и деплой на Vercel.',
      icon: Award,
      color: 'from-amber-500 to-orange-500',
      current: false
    }
  ];

  return (
    <section id="education" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-medium mb-2 tracking-wider uppercase text-sm" style={{ color: '#a855f7' }}>
            03 — {t.nav.education || 'Education'}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t.experience.title}</h2>
          <p className="mt-3" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>{t.experience.subtitle}</p>
        </motion.div>

        <div ref={containerRef} className="relative">
          {/* Animated vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px overflow-hidden" style={{ transform: 'translateX(-50%)' }}>
            <motion.div
              className="w-full h-full bg-gradient-to-b from-purple-500 via-cyan-500 to-transparent"
              style={{ height: lineHeight }}
            />
          </div>

          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, type: 'spring' }}
              className={`relative mb-12 md:w-1/2 ${i % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}
            >
              {/* Glowing node */}
              <div className="absolute left-8 md:left-auto md:right-0 top-6 z-10" style={{ transform: 'translateX(-50%)' }}>
                {item.current && (
                  <motion.div
                    animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-purple-500"
                    style={{ width: '16px', height: '16px' }}
                  />
                )}
                <div className={`w-4 h-4 rounded-full bg-gradient-to-r ${item.color} border-4 shadow-lg relative z-10`}
                  style={{ borderColor: theme === 'dark' ? '#0f172a' : '#f8fafc' }}
                />
              </div>

              <div className="ml-20 md:ml-0 glass-card rounded-2xl p-6 transition-all"
                data-hover
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                    <item.icon className="text-white" size={20} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: '#a855f7' }}>{item.year}</span>
                  {item.current && (
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold">
                      CURRENT
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-sm mb-3" style={{ color: '#06b6d4' }}>{item.subtitle}</p>
                <p className="text-sm leading-relaxed" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
