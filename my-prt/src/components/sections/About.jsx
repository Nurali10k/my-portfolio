import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Code2, Award, Star, Layers } from 'lucide-react';

function Counter({ end, suffix = '', duration = 2 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function About({ t }) {
  const stats = [
    { icon: Code2, value: 10, suffix: '+', label: t.about.stat1, color: 'from-purple-500 to-pink-500' },
    { icon: Award, value: 2, suffix: '+', label: t.about.stat2, color: 'from-cyan-500 to-blue-500' },
    { icon: Star, value: 4.9, suffix: '', label: t.about.stat3, color: 'from-amber-500 to-orange-500', decimal: true },
    { icon: Layers, value: 15, suffix: '+', label: t.about.stat4, color: 'from-emerald-500 to-teal-500' }
  ];

  return (
    <section id="about" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-purple-400 font-medium mb-2 tracking-wider uppercase text-sm">01 — {t.nav.about}</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t.about.title}</h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
              <div className="relative bg-slate-800/60 backdrop-blur border border-slate-700/50 rounded-3xl p-8">
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-6 overflow-hidden">
                  <div className="text-9xl">👨‍💻</div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm text-slate-300 font-medium">Online · Coding</span>
                </div>
                <h3 className="text-2xl font-bold mb-1">Nurali Mashrapov</h3>
                <p className="text-slate-400 text-sm">📍 Bishkek, Kyrgyzstan</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <p className="text-lg text-slate-300 leading-relaxed mb-8">{t.about.bio}</p>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-slate-800/40 backdrop-blur border border-slate-700/50 rounded-2xl p-5 hover:border-slate-600 transition-all"
                >
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                    <stat.icon className="text-white" size={20} />
                  </div>
                  <div className="text-3xl font-bold mb-1">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
