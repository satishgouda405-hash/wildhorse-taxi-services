import { useEffect, useState } from 'react';

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => { setFadeOut(true); setTimeout(onComplete, 800); }, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-obsidian transition-opacity duration-800 ${fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative mb-8 animate-float text-center">
        <div className="text-6xl mb-4">🐴</div>
        <h1 className="font-display text-3xl text-white">Wild Horse</h1>
        <p className="text-forest-light text-sm uppercase tracking-widest">Dandeli Adventures</p>
        <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-transparent opacity-50" />
      </div>

      <div className="w-64 md:w-80 h-1 bg-navy rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-100 ease-out"
          style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #2d8a4e, #3aab62)' }}
        />
      </div>

      <p className="mt-4 text-forest-light font-body text-sm font-medium tracking-widest">{progress}%</p>
      <p className="mt-2 text-text-muted font-body text-xs tracking-wider uppercase">Loading Your Adventure</p>
    </div>
  );
}
