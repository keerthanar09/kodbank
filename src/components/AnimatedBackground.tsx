'use client';
import { motion } from 'framer-motion';

export default function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-20">
      <motion.div
        className="absolute top-20 left-20 w-64 h-48 glass rounded-lg p-4"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{ filter: 'blur(8px)' }}
      >
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <motion.polyline
            points="0,80 40,60 80,70 120,40 160,50 200,30"
            fill="none"
            stroke="#00ff41"
            strokeWidth="2"
            animate={{ pathLength: [0, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute top-40 right-32 w-56 h-40 glass rounded-lg p-4"
        animate={{
          y: [0, 15, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        style={{ filter: 'blur(8px)' }}
      >
        <svg viewBox="0 0 200 100" className="w-full h-full">
          {[20, 40, 60, 80].map((x, i) => (
            <motion.rect
              key={i}
              x={x}
              y={60 - i * 10}
              width="15"
              height={40 + i * 10}
              fill="#00ff41"
              animate={{ height: [40 + i * 10, 50 + i * 10, 40 + i * 10] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-40 w-72 h-52 glass rounded-lg p-4"
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity, delay: 2 }}
        style={{ filter: 'blur(8px)' }}
      >
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <motion.circle
            cx="100"
            cy="50"
            r="30"
            fill="none"
            stroke="#00ff41"
            strokeWidth="2"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.path
            d="M 70,50 Q 100,20 130,50 Q 100,80 70,50"
            fill="rgba(0,255,65,0.2)"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: '100px 50px' }}
          />
        </svg>
      </motion.div>

      <motion.div
        className="absolute bottom-20 right-20 w-48 h-36 glass rounded-lg p-4"
        animate={{
          y: [0, 20, 0],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{ duration: 4.5, repeat: Infinity, delay: 0.5 }}
        style={{ filter: 'blur(8px)' }}
      >
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <motion.path
            d="M 20,80 Q 60,20 100,50 T 180,60"
            fill="none"
            stroke="#00ff41"
            strokeWidth="2"
            animate={{ pathLength: [0, 1, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
