import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl backdrop-blur-xl border shadow-2xl ${
        type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300' : 'bg-red-500/10 border-red-500/30 text-red-300'
      }`}
    >
      {type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
      <span className="font-medium">{message}</span>
      <button onClick={onClose} className="ml-2 opacity-60 hover:opacity-100"><X size={16} /></button>
    </motion.div>
  );
}

export function ToastContainer({ toasts, onClose }) {
  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-2">
      <AnimatePresence>
        {toasts.map(t => (
          <Toast key={t.id} message={t.message} type={t.type} onClose={() => onClose(t.id)} />
        ))}
      </AnimatePresence>
    </div>
  );
}
