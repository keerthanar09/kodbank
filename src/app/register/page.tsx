'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import BankLogo from '@/components/BankLogo';
import AnimatedBackground from '@/components/AnimatedBackground';
import { BackgroundSparkles } from '@/components/Sparkles';

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    uid: '',
    username: '',
    email: '',
    password: '',
    phone: '',
    role: 'customer',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/login');
      } else {
        setError(data.error || 'Registration failed');
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
            'radial-gradient(circle at 20% 30%, rgba(0,255,65,0.2) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 40%)',
            'radial-gradient(circle at 80% 40%, rgba(0,255,65,0.2) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 40%)',
            'radial-gradient(circle at 50% 20%, rgba(0,255,65,0.2) 0%, transparent 40%), radial-gradient(circle at 50% 90%, rgba(255,255,255,0.1) 0%, transparent 40%)',
            'radial-gradient(circle at 20% 30%, rgba(0,255,65,0.2) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 40%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1.5, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
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
          <h1 className="text-3xl font-bold text-neon mb-6">Create Account</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="User ID"
              className="w-full bg-black/50 border border-neon/30 rounded-lg px-4 py-3 focus:outline-none focus:border-neon transition"
              value={formData.uid}
              onChange={(e) => setFormData({ ...formData, uid: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Username"
              className="w-full bg-black/50 border border-neon/30 rounded-lg px-4 py-3 focus:outline-none focus:border-neon transition"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-black/50 border border-neon/30 rounded-lg px-4 py-3 focus:outline-none focus:border-neon transition"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            <input
              type="tel"
              placeholder="Phone"
              className="w-full bg-black/50 border border-neon/30 rounded-lg px-4 py-3 focus:outline-none focus:border-neon transition"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />

            <div>
              <label className="block text-sm text-gray-400 mb-2">Role</label>
              <select
                className="w-full bg-black/50 border border-neon/30 rounded-lg px-4 py-3 focus:outline-none focus:border-neon transition"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              >
                <option value="customer">Customer</option>
              </select>
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <motion.button
              type="submit"
              className="w-full bg-neon text-black font-bold py-3 rounded-lg hover:shadow-lg hover:shadow-neon/50 transition"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Register'}
            </motion.button>
          </form>

          <p className="text-center mt-4 text-sm text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-neon hover:underline">
              Login
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
