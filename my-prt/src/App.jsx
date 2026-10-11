import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { translations } from './i18n/translations';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import StatsCounter from './components/sections/StatsCounter';
import FeaturedProjects from './components/sections/FeaturedProjects';
import Skills from './components/sections/Skills';
import Education from './components/sections/Education';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import ProjectModal from './components/sections/ProjectModal';
import CustomCursor from './components/ui/CustomCursor';
import { ToastContainer } from './components/ui/Toast';
import ScrollProgress from './components/ui/ScrollProgress';

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('portfolio_lang') || 'ru');
  const [theme, setTheme] = useState(() => localStorage.getItem('portfolio_theme') || 'dark');
  const [toasts, setToasts] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

  const t = translations[lang] || translations.ru;

  useEffect(() => {
    localStorage.setItem('portfolio_lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('portfolio_theme', theme);
    // Правильное переключение класса на <html>
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const addToast = (toast) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, ...toast }]);
  };

  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  return (
    <div className={`min-h-screen relative overflow-x-hidden transition-colors duration-500 ${
      theme === 'dark' ? 'bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Ambient glows */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      
      <CustomCursor />
      <ScrollProgress />
      <Navbar lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} t={t} />
      
      <main>
        <Hero t={t} theme={theme} />
        <StatsCounter t={t} theme={theme} />
        <FeaturedProjects t={t} theme={theme} onSelectProject={setSelectedProject} />
        <Skills t={t} theme={theme} />
        <Education t={t} theme={theme} />
        <Contact t={t} theme={theme} addToast={addToast} />
      </main>
      
      <Footer t={t} theme={theme} />
      
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
            t={t} 
            theme={theme}
          />
        )}
      </AnimatePresence>
      
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </div>
  );
}
