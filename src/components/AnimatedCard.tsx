'use client';
import { motion } from 'framer-motion';

export default function AnimatedCard() {
  return (
    <motion.div
      className="w-80 h-48 glass rounded-2xl p-6 relative overflow-hidden"
      initial={{ rotateY: -30, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      whileHover={{ scale: 1.05, rotateY: 5 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-neon/20 to-transparent"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <div className="relative z-10">
        <div className="text-neon text-xl font-bold mb-4">KODBANK</div>
        <div className="text-sm opacity-70 mb-2">Premium Banking</div>
        <motion.div
          className="w-12 h-8 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded mt-8"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
    </motion.div>
  );
}
