import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    
    const handleOver = (e) => {
      if (e.target.closest('a, button, [data-hover]')) setHovering(true);
    };
    const handleOut = () => setHovering(false);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', handleOver);
    document.addEventListener('mouseout', handleOut);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', handleOver);
      document.removeEventListener('mouseout', handleOut);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-purple-500 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
        animate={{ x: pos.x - 4, y: pos.y - 4 }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full border-2 border-purple-500 pointer-events-none z-[9998] mix-blend-difference hidden md:block"
        animate={{
          x: pos.x - (hovering ? 24 : 16),
          y: pos.y - (hovering ? 24 : 16),
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          borderColor: hovering ? '#06b6d4' : '#a855f7'
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
      />
    </>
  );
}