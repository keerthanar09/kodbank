'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    fetch('/api/init-db').then(() => {
      router.push('/register');
    });
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-neon text-2xl animate-pulse">Initializing Kodbank...</div>
    </div>
  );
}
