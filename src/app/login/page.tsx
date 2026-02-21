'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import BankLogo from '@/components/BankLogo';
import AnimatedBackground from '@/components/AnimatedBackground';
import { BackgroundSparkles } from '@/components/Sparkles';

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedBackground />
      <BackgroundSparkles />

      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            'radial-gradient(circle at 30% 40%, rgba(0,255,65,0.2) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 70% 60%, rgba(0,255,65,0.2) 0%, transparent 50%), radial-gradient(circle at 30% 40%, rgba(255,255,255,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 80%, rgba(0,255,65,0.2) 0%, transparent 50%), radial-gradient(circle at 50% 20%, rgba(255,255,255,0.15) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 40%, rgba(0,255,65,0.2) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.15) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '2px',
            height: '2px',
            background: i % 2 === 0 ? '#00ff41' : '#ffffff',
          }}
          animate={{
            scale: [0, 2, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2.5 + Math.random() * 1.5,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}

      <div className="flex gap-16 items-center relative z-10">
        <BankLogo />

        <motion.div
          className="glass rounded-3xl p-8 w-96"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl font-bold text-neon mb-6">Welcome Back</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-black/50 border border-neon/30 rounded-lg px-4 py-3 focus:outline-none focus:border-neon transition"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full bg-black/50 border border-neon/30 rounded-lg px-4 py-3 focus:outline-none focus:border-neon transition"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <motion.button
              type="submit"
              className="w-full bg-neon text-black font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-neon/50 transition"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>

          <p className="text-center mt-4 text-sm text-gray-400">
            Don't have an account?{' '}
            <a href="/register" className="text-neon hover:underline">
              Register
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
