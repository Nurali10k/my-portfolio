import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Github } from 'lucide-react';

export default function Navbar({ lang, setLang, theme, setTheme, t }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'projects', label: t.nav.projects },
    { id: 'about', label: t.nav.about },
    { id: 'skills', label: t.nav.skills },
    { id: 'contact', label: t.nav.contact }
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-slate-900/80 backdrop-blur-xl border-b border-slate-800/50' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.a
            href="#home"
            onClick={(e) => { e.preventDefault(); scrollTo('home'); }}
            className="inline-flex items-center"
            whileHover={{ scale: 1.05 }}
          >
            <img src="/nurali-logo.svg" alt="Nurali Mashrapov" className="h-10 w-10" />
          </motion.a>

          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="px-4 py-2 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50 transition-all"
              >
                {link.label}
              </button>
            ))}
            <a
              href="https://github.com/Nurali10k"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/50 transition-all"
            >
              GITHUB
            </a>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center bg-slate-800/60 backdrop-blur rounded-lg border border-slate-700/50 overflow-hidden">
              {['kg', 'ru', 'en'].map(l => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase transition-all ${
                    lang === l ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {l}
                </button>
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 bg-slate-800/60 backdrop-blur border border-slate-700/50 rounded-lg text-slate-300 hover:text-white"
              data-hover
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 bg-slate-800/60 backdrop-blur border border-slate-700/50 rounded-lg text-slate-300"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="fixed right-0 top-0 bottom-0 w-72 bg-slate-900/95 backdrop-blur-xl border-l border-slate-800 z-50 p-6 md:hidden"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Menu</span>
                <button onClick={() => setMobileOpen(false)} className="text-slate-400"><X size={24} /></button>
              </div>
              <div className="space-y-2">
                {links.map(link => (
                  <button
                    key={link.id}
                    onClick={() => scrollTo(link.id)}
                    className="block w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"
                  >
                    {link.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}