import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', icon: Icon, onClick, href, className = '' }) {
  const base = 'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all relative overflow-hidden';
  const variants = {
    primary: 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-purple-500/30',
    secondary: 'bg-slate-800/60 backdrop-blur border border-slate-700/50 text-slate-200 hover:border-slate-600 hover:bg-slate-800',
    ghost: 'text-slate-400 hover:text-white hover:bg-slate-800/50'
  };

  const content = (
    <>
      {children}
      {Icon && <Icon size={18} />}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.97 }}
        className={`${base} ${variants[variant]} ${className}`}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {content}
    </motion.button>
  );
}
