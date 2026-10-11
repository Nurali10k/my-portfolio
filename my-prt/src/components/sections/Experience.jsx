import { motion } from 'framer-motion';
import { timeline } from '../../data/experience';

export default function Experience({ t }) {
  return (
    <section id="experience" className="relative py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-purple-400 font-medium mb-2 tracking-wider uppercase text-sm">04 — {t.nav.experience}</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-3">{t.experience.title}</h2>
          <p className="text-slate-400">{t.experience.subtitle}</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/50 via-cyan-500/50 to-transparent" />

          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative mb-12 md:w-1/2 ${i % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}
            >
              <div className="absolute left-8 md:left-auto md:right-0 top-6 w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 border-4 border-slate-900 shadow-lg shadow-purple-500/50 z-10" />

              <div className="ml-20 md:ml-0 bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/50 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">{item.year}</span>
                </div>
                <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                <p className="text-sm text-cyan-400 mb-3">{item.subtitle}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
