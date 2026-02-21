'use client';
import { motion } from 'framer-motion';

export default function BankLogo() {
  return (
    <motion.div
      className="relative w-64 h-64"
      whileHover={{ scale: 1.1 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <motion.div
        className="absolute inset-0 glass rounded-full flex items-center justify-center"
        animate={{
          boxShadow: [
            '0 0 20px rgba(0,255,65,0.3)',
            '0 0 40px rgba(0,255,65,0.6)',
            '0 0 20px rgba(0,255,65,0.3)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.path
            d="M60 10L100 35V85L60 110L20 85V35L60 10Z"
            stroke="#00ff41"
            strokeWidth="3"
            fill="rgba(0,255,65,0.1)"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <motion.text
            x="60"
            y="70"
            textAnchor="middle"
            fill="#00ff41"
            fontSize="32"
            fontWeight="bold"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            KB
          </motion.text>
        </svg>
      </motion.div>
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-neon/20"
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
    </motion.div>
  );
}
