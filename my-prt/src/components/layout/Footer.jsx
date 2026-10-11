import { motion } from 'framer-motion';
import { ArrowUp, Heart } from 'lucide-react';

export default function Footer({ t }) {
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative border-t border-slate-800/50 py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">NM.</div>
          <p className="text-sm text-slate-400">
            © 2026 Nurali Mashrapov. {t.footer.copyright}
          </p>
          <p className="text-xs text-slate-500 mt-1 flex items-center gap-1 justify-center md:justify-start">
            {t.footer.madeWith} <Heart size={12} className="text-red-500 fill-red-500" /> {t.footer.in} 🇰🇬
          </p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-500">React · Vite · Tailwind · Framer Motion</span>
          <motion.button
            onClick={toTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl text-white shadow-lg shadow-purple-500/20"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
