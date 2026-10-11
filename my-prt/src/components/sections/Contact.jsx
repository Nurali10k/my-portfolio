import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, Send, MessageCircle, Github, Loader2 } from 'lucide-react';

export default function Contact({ t, theme, addToast }) {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = true;
    if (!form.message.trim() || form.message.length < 10) e.message = true;
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const e2 = validate();
    setErrors(e2);
    if (Object.keys(e2).length > 0) {
      addToast({ message: t.contact.error, type: 'error' });
      return;
    }
    setSending(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error(`Contact request failed with status ${response.status}`);
      }

      addToast({ message: t.contact.success, type: 'success' });
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact form submission failed:', error);
      addToast({ message: t.contact.sendError, type: 'error' });
    } finally {
      setSending(false);
    }
  };

  const contacts = [
    { icon: Mail, label: t.contact.email, value: 'nursytnurali@gmail.com', href: 'mailto:nursytnurali@gmail.com', color: 'from-purple-500 to-pink-500' },
    { icon: MessageCircle, label: t.contact.telegram, value: '@i_am_argus', href: 'https://t.me/i_am_argus', color: 'from-cyan-500 to-blue-500' },
    { icon: Github, label: t.contact.github, value: 'Nurali10k', href: 'https://github.com/Nurali10k', color: 'from-slate-500 to-slate-700' }
  ];

  return (
    <section id="contact" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-medium mb-2 tracking-wider uppercase text-sm" style={{ color: '#a855f7' }}>
            04 — {t.nav.contact}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">{t.contact.title}</h2>
          <p className="mt-3" style={{ color: theme === 'dark' ? '#94a3b8' : '#64748b' }}>{t.contact.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {contacts.map((c, i) => (
              <motion.a
                key={i}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 5, scale: 1.02 }}
                className="flex items-center gap-4 glass-card rounded-2xl p-5 transition-all"
                style={{
                  backgroundColor: 'rgba(30,41,59,0.4)',
                  borderColor: 'rgba(51,65,85,0.5)'
                }}
                data-hover
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center flex-shrink-0`}>
                  <c.icon className="text-white" size={20} />
                </div>
                <div>
                  <p className="text-xs mb-0.5" style={{ color: '#94a3b8' }}>{c.label}</p>
                  <p className="font-semibold" style={{ color: theme === 'dark' ? '#e2e8f0' : '#1e293b' }}>{c.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="glass-card rounded-2xl p-6 space-y-4"
            style={{
              backgroundColor: 'rgba(30,41,59,0.4)',
              borderColor: 'rgba(51,65,85,0.5)'
            }}
          >
            <div>
              <input
                type="text"
                placeholder={t.contact.form.name}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                  errors.name ? 'border-red-500' : ''
                }`}
                style={{
                  backgroundColor: 'rgba(15,23,42,0.5)',
                  borderColor: errors.name ? '#ef4444' : 'rgba(51,65,85,0.5)',
                  color: theme === 'dark' ? '#f8fafc' : '#1e293b'
                }}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder={t.contact.form.email}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                  errors.email ? 'border-red-500' : ''
                }`}
                style={{
                  backgroundColor: 'rgba(15,23,42,0.5)',
                  borderColor: errors.email ? '#ef4444' : 'rgba(51,65,85,0.5)',
                  color: theme === 'dark' ? '#f8fafc' : '#1e293b'
                }}
              />
            </div>
            <div>
              <textarea
                placeholder={t.contact.form.message}
                rows="5"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none ${
                  errors.message ? 'border-red-500' : ''
                }`}
                style={{
                  backgroundColor: 'rgba(15,23,42,0.5)',
                  borderColor: errors.message ? '#ef4444' : 'rgba(51,65,85,0.5)',
                  color: theme === 'dark' ? '#f8fafc' : '#1e293b'
                }}
              />
            </div>
            <motion.button
              type="submit"
              disabled={sending}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg disabled:opacity-60"
              data-hover
            >
              {sending ? (
                <><Loader2 className="animate-spin" size={18} /> {t.contact.form.sending}</>
              ) : (
                <><Send size={18} /> {t.contact.form.send}</>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}