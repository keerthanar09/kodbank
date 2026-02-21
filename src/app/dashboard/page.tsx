'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Sparkles from '@/components/Sparkles';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  type: 'rect' | 'circle' | 'cat';
  color: string;
  vx: number;
  vy: number;
  rotationSpeed: number;
}

export default function Dashboard() {
  const router = useRouter();
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);
  const [username, setUsername] = useState('User');
  const [uid, setUid] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/balance');
      if (res.ok) {
        const data = await res.json();
        setUsername(data.username || 'User');
        setUid(data.uid || '');
      }
    };
    fetchUser();
  }, []);

  const checkBalance = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/balance');
      const data = await res.json();

      if (res.ok) {
        setBalance(data.balance);
        launchConfetti();
      }
    } catch {
      alert('Failed to fetch balance');
    } finally {
      setLoading(false);
    }
  };

  const launchConfetti = () => {
    const buttonRect = document.getElementById('balance-btn')?.getBoundingClientRect();
    if (!buttonRect) return;

    const centerX = buttonRect.left + buttonRect.width / 2;
    const centerY = buttonRect.top + buttonRect.height / 2;

    const colors = ['#00ff41', '#ffff00', '#ffffff', '#000000'];
    const pieces: ConfettiPiece[] = [];

    for (let i = 0; i < 80; i++) {
      const angle = (Math.PI * 2 * i) / 80 + (Math.random() - 0.5) * 0.5;
      const velocity = 8 + Math.random() * 8;
      
      pieces.push({
        id: Date.now() + i,
        x: centerX,
        y: centerY,
        rotation: Math.random() * 360,
        type: Math.random() > 0.85 ? 'cat' : Math.random() > 0.5 ? 'rect' : 'circle',
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity - 5,
        rotationSpeed: (Math.random() - 0.5) * 20,
      });
    }

    setConfetti(pieces);

    setTimeout(() => setConfetti([]), 4000);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(0,255,65,0.3) 0%, transparent 70%)',
            'radial-gradient(circle at 30% 70%, rgba(0,255,65,0.3) 0%, transparent 70%)',
            'radial-gradient(circle at 70% 30%, rgba(0,255,65,0.3) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(0,255,65,0.3) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      <aside className="w-64 glass border-r border-neon/20 p-6 flex flex-col relative z-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-neon">KODBANK</h2>
          <p className="text-xs text-gray-400">Premium Banking</p>
        </div>

        <nav className="flex-1 space-y-2">
          <motion.button
            className="w-full text-left px-4 py-3 rounded-lg bg-neon/10 border border-neon/30 text-neon flex items-center gap-3"
            whileHover={{ scale: 1.02, backgroundColor: 'rgba(0,255,65,0.2)' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </motion.button>
          
          <motion.button
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Accounts
          </motion.button>
          
          <motion.button
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Transactions
          </motion.button>
          
          <motion.button
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            Transfer
          </motion.button>
          
          <motion.button
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analytics
          </motion.button>

          <motion.div
            className="relative"
            whileHover={{ scale: 1.02 }}
          >
            <motion.button
              onClick={() => router.push('/chat')}
              className="w-full text-left px-4 py-3 rounded-lg bg-neon/5 border-2 border-neon/50 text-neon flex items-center gap-3 relative overflow-visible"
              style={{
                boxShadow: '0 0 20px rgba(0,255,65,0.3), inset 0 0 20px rgba(0,255,65,0.1)',
              }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Chat with Kody
            </motion.button>
            <Sparkles />
          </motion.div>
          
          <motion.button
            className="w-full text-left px-4 py-3 rounded-lg hover:bg-white/5 flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </motion.button>
        </nav>

        <motion.button
          onClick={handleLogout}
          className="w-full px-4 py-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30 flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          Logout
        </motion.button>
      </aside>

      <main className="flex-1 p-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold text-neon mb-2">Welcome Back</h1>
              <p className="text-gray-400">Manage your finances with ease</p>
            </div>

            <motion.div
              className="glass rounded-2xl p-6 w-80"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-neon to-green-700 flex items-center justify-center text-2xl font-bold">
                  {username.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{username}</h3>
                  <p className="text-sm text-gray-400">ID: {uid}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                    <span className="text-xs text-neon">Active</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-8">
            <motion.div
              className="glass rounded-2xl p-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-gray-400 text-sm mb-2">Total Balance</div>
              <div className="text-3xl font-bold text-neon">
                {balance !== null ? `₹${balance.toLocaleString()}` : '••••••'}
              </div>
            </motion.div>

            <motion.div
              className="glass rounded-2xl p-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-gray-400 text-sm mb-2">Monthly Income</div>
              <div className="text-3xl font-bold text-green-400">₹0</div>
            </motion.div>

            <motion.div
              className="glass rounded-2xl p-6"
              whileHover={{ scale: 1.02 }}
            >
              <div className="text-gray-400 text-sm mb-2">Monthly Expenses</div>
              <div className="text-3xl font-bold text-yellow-400">₹0</div>
            </motion.div>
          </div>

          <div className="glass rounded-3xl p-12 text-center relative">
            <motion.h2
              className="text-3xl font-bold text-neon mb-8"
              animate={{
                textShadow: [
                  '0 0 10px rgba(0,255,65,0.5)',
                  '0 0 20px rgba(0,255,65,0.8)',
                  '0 0 10px rgba(0,255,65,0.5)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Account Overview
            </motion.h2>

            <motion.button
              id="balance-btn"
              onClick={checkBalance}
              className="bg-neon text-black font-bold text-xl px-12 py-4 rounded-xl hover:shadow-2xl hover:shadow-neon/50 transition-all relative z-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Check Balance'}
            </motion.button>

            <AnimatePresence>
              {balance !== null && (
                <motion.div
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <motion.div
                    className="text-2xl text-gray-300 mb-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    Your balance is:
                  </motion.div>
                  <motion.div
                    className="text-5xl font-bold text-neon"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.3 }}
                  >
                    ₹{balance.toLocaleString()}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <AnimatePresence>
        {confetti.map((piece) => (
          <ConfettiPiece key={piece.id} piece={piece} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ConfettiPiece({ piece }: { piece: ConfettiPiece }) {
  return (
    <motion.div
      className="fixed pointer-events-none z-50"
      initial={{
        x: piece.x,
        y: piece.y,
        rotate: piece.rotation,
        opacity: 1,
      }}
      animate={{
        x: piece.x + piece.vx * 50,
        y: piece.y + piece.vy * 50 + 500,
        rotate: piece.rotation + piece.rotationSpeed * 50,
        opacity: 0,
      }}
      transition={{
        duration: 3,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {piece.type === 'cat' ? (
        <div className="text-2xl">🐱</div>
      ) : piece.type === 'circle' ? (
        <div
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: piece.color }}
        />
      ) : (
        <div
          className="w-2 h-4"
          style={{ backgroundColor: piece.color }}
        />
      )}
    </motion.div>
  );
}
