import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Code2, Award, Star, Layers } from 'lucide-react';

function Counter({ end, suffix = '', duration = 2, decimal = false }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(decimal ? start : Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, end, duration, decimal]);

  return <span ref={ref}>{decimal ? count.toFixed(1) : Math.floor(count)}{suffix}</span>;
}

export default function StatsCounter({ t, theme }) {
  const stats = [
    { icon: Code2, value: 10, suffix: '+', label: t.about.stat1, color: 'from-purple-500 to-pink-500' },
    { icon: Award, value: 2, suffix: '+', label: t.about.stat2, color: 'from-cyan-500 to-blue-500' },
    { icon: Star, value: 4.9, suffix: '', label: t.about.stat3, color: 'from-amber-500 to-orange-500', decimal: true },
    { icon: Layers, value: 15, suffix: '+', label: t.about.stat4, color: 'from-emerald-500 to-teal-500' }
  ];

  return (
    <section className="relative py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="glass-card rounded-2xl p-6 text-center transition-all"
              data-hover
            >
              <div className={`w-12 h-12 mx-auto rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-3`}>
                <stat.icon className="text-white" size={24} />
              </div>
              <div className="text-4xl font-bold mb-1">
                <Counter end={stat.value} suffix={stat.suffix} decimal={stat.decimal} />
              </div>
              <div className="text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
