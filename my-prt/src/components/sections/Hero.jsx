import { motion, useMotionValue } from 'framer-motion';
import { useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ t, theme }) {
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Орбиты
  const orbits = [
    {
      radius: 200,
      duration: 15, // секунд на оборот (БЫСТРО!)
      items: [
        { name: 'React', color: 'from-cyan-500 to-blue-600', icon: '⚛️' },
        { name: 'Framer', color: 'from-purple-500 to-indigo-600', icon: '✨' },
        { name: 'Redux', color: 'from-purple-600 to-pink-600', icon: '🔄' }
      ]
    },
    {
      radius: 280,
      duration: 20,
      items: [
        { name: 'Tailwind', color: 'from-teal-500 to-cyan-600', icon: '' },
        { name: 'Vercel', color: 'from-slate-500 to-slate-700', icon: '▲' },
        { name: 'JavaScript', color: 'from-yellow-500 to-amber-600', icon: 'JS' },
        { name: 'Git', color: 'from-orange-500 to-red-600', icon: '' }
      ]
    },
    {
      radius: 360,
      duration: 25,
      items: [
        { name: 'Next.js', color: 'from-slate-600 to-slate-800', icon: '▲' },
        { name: 'Firebase', color: 'from-amber-500 to-orange-600', icon: '' },
        { name: 'Node.js', color: 'from-green-500 to-emerald-600', icon: '' },
        { name: 'TypeScript', color: 'from-blue-500 to-blue-700', icon: 'TS' }
      ]
    }
  ];

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const name = "NURALI MASHRAPOV";
  const letters = name.split('');

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      {/* Grid background */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      {/* Неоновое свечение */}
      <motion.div
        animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] pointer-events-none"
      >
        <div className="w-full h-full bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 rounded-full blur-[100px] opacity-50" />
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur border mb-8"
          style={{ 
            backgroundColor: theme === 'dark' ? 'rgba(30,41,59,0.6)' : 'rgba(255,255,255,0.6)',
            borderColor: theme === 'dark' ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.2)'
          }}
        >
          <span className="text-lg">👋</span>
          <span className="text-sm" style={{ color: theme === 'dark' ? '#cbd5e1' : '#475569' }}>{t.hero.badge}</span>
        </motion.div>

        {/* Имя */}
        <div className="relative inline-block mb-4">
          <motion.div
            animate={{ opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute inset-0 blur-3xl bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 -z-10"
            style={{ transform: 'scale(1.3)' }}
          />
          
          <h1 
            className="font-bold tracking-tight whitespace-nowrap relative"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 7rem)', lineHeight: 1.1 }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {letters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.3 + i * 0.03, duration: 0.5, type: 'spring' }}
                className="inline-block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="font-bold mb-4"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: theme === 'dark' ? '#cbd5e1' : '#334155' }}
        >
          FRONTEND DEVELOPER
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="max-w-2xl mx-auto mb-8"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: theme === 'dark' ? '#94a3b8' : '#64748b' }}
        >
          {t.hero.description}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.a
            href="#projects"
            whileHover={{ y: -3, boxShadow: '0 20px 40px rgba(139,92,246,0.4)', scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg"
            data-hover
          >
            {t.hero.cta1} <ArrowRight size={18} />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3 backdrop-blur border rounded-xl font-bold"
            style={{
              backgroundColor: theme === 'dark' ? 'rgba(30,41,59,0.6)' : 'rgba(255,255,255,0.6)',
              borderColor: theme === 'dark' ? 'rgba(139,92,246,0.3)' : 'rgba(139,92,246,0.2)',
              color: theme === 'dark' ? '#e2e8f0' : '#1e293b'
            }}
            data-hover
          >
            {t.hero.cta2}
          </motion.a>
        </motion.div>

        {/* ОРБИТАЛЬНАЯ СИСТЕМА (CSS + FRAMER MOTION) */}
        <div className="relative h-[800px] max-w-5xl mx-auto">
          {/* Визуальные орбиты */}
          {orbits.map((orbit, i) => (
            <div
              key={`orbit-${i}`}
              className="absolute top-1/2 left-1/2 rounded-full border opacity-15"
              style={{
                width: `${orbit.radius * 2}px`,
                height: `${orbit.radius * 2}px`,
                transform: 'translate(-50%, -50%)',
                borderColor: theme === 'dark' ? '#8b5cf6' : '#a855f7'
              }}
            />
          ))}

          {/* Бейджи на орбитах */}
          {orbits.map((orbit, orbitIndex) => (
            orbit.items.map((item, itemIndex) => {
              const baseAngle = (360 / orbit.items.length) * itemIndex;
              const duration = isHovering ? orbit.duration * 0.5 : orbit.duration;
              const appearDelay = 1.8 + orbitIndex * 0.2 + itemIndex * 0.1;
              
              return (
                <div
                  key={`${orbitIndex}-${item.name}`}
                  className="absolute top-1/2 left-1/2"
                  style={{
                    animation: `orbit-${orbitIndex} ${duration}s linear infinite`,
                    animationDelay: `${-(baseAngle / 360) * duration}s`
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: appearDelay,
                      type: 'spring',
                      stiffness: 100
                    }}
                    whileHover={{ scale: 1.3, zIndex: 100 }}
                    className="cursor-default"
                    data-hover
                  >
                    <div
                      className={`px-4 py-2 rounded-xl bg-gradient-to-r ${item.color} text-white font-bold text-sm shadow-lg backdrop-blur-md border border-white/20 whitespace-nowrap`}
                      style={{
                        transform: `rotate(${baseAngle}deg) translateY(-${orbit.radius}px) rotate(-${baseAngle}deg)`
                      }}
                    >
                      <span className="mr-1.5">{item.icon}</span>
                      {item.name}
                    </div>
                  </motion.div>
                </div>
              );
            })
          ))}
        </div>

        {/* CSS Keyframes для орбит */}
        <style>{`
          @keyframes orbit-0 {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
          @keyframes orbit-1 {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
          @keyframes orbit-2 {
            from { transform: translate(-50%, -50%) rotate(0deg); }
            to { transform: translate(-50%, -50%) rotate(360deg); }
          }
        `}</style>
      </div>
    </section>
  );
}