import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, Shield, Clock, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function SplitText3D({ text, className = '' }: { text: string; className?: string }) {
  const chars = text.split('');
  return (
    <span className={`inline-block perspective-1000 ${className}`}>
      {chars.map((char, i) => (
        <span
          key={i}
          className="inline-block char-reveal"
          style={{ animationDelay: `${i * 0.04}s` }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  );
}

const parallaxLayers = [
  { image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200', depth: 0.2, rotateY: -15, z: -100 },
  { image: 'https://images.unsplash.com/photo-1510784722466-f2aa240c4c17?w=1200', depth: 0.5, rotateY: -8, z: -50 },
  { image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200', depth: 1.0, rotateY: 0, z: 0 },
  { image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200', depth: 1.5, rotateY: 8, z: 50 },
  { image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200', depth: 2.0, rotateY: 15, z: 100 },
];

interface HeroProps {
  onBookClick: () => void;
}

export default function Hero({ onBookClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const layersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=80%',
        scrub: 1,
        pin: true,
      },
    });

    tl.set(container, { perspective: 1000, transformStyle: 'preserve-3d' });

    parallaxLayers.forEach((layer, i) => {
      const el = layersRef.current[i];
      if (!el) return;
      tl.from(el, { opacity: 0, duration: 0.5, ease: 'power2.out' }, 0);
      tl.to(el, { y: () => -layer.depth * 150, ease: 'none' }, 0);
      tl.to(el, { rotateY: layer.rotateY, z: layer.z, ease: 'power2.inOut' }, 0.3);
      tl.to(el, { z: 500 + i * 100, opacity: 0, duration: 0.3, ease: 'power2.in' }, 0.8);
    });

    return () => { tl.kill(); };
  }, []);

  return (
    <section id="home" ref={containerRef} className="relative w-full h-screen overflow-hidden bg-obsidian">
      {parallaxLayers.map((layer, i) => (
        <div
          key={i}
          ref={(el) => { layersRef.current[i] = el; }}
          className="absolute"
          style={{
            top: '50%', left: '50%', width: '60%', height: '70%',
            marginTop: '-35%', marginLeft: '-30%',
            backgroundImage: `url(${layer.image})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            borderRadius: '12px', boxShadow: '0 25px 80px rgba(0,0,0,0.5)',
            transform: 'translateZ(0px)',
            filter: i === 0 ? 'brightness(0.7)' : 'brightness(0.85)',
          }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-obsidian/60 via-transparent to-obsidian z-[5]" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <div className="glass-panel rounded-2xl px-8 py-10 md:px-16 md:py-14 max-w-4xl">
          <p className="text-forest-light text-xs md:text-sm font-medium uppercase tracking-[0.3em] mb-4">
            Wild Horse — Dandeli, Karnataka
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-light mb-2">
            <SplitText3D text="EXPERIENCE" />
          </h1>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-6">
            <span className="text-gradient-forest">
              <SplitText3D text="THE WILD" />
            </span>
          </h1>
          <p className="text-text-muted text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed">
            Your Complete Dandeli Adventure Partner — Taxi, Homestay &amp; All Activities in the heart of Karnataka's finest wildlife sanctuary.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
            <div className="flex items-center gap-2 text-light/80 text-sm">
              <Shield className="w-4 h-4 text-forest-light" />
              <span>Safe Adventures</span>
            </div>
            <div className="flex items-center gap-2 text-light/80 text-sm">
              <Clock className="w-4 h-4 text-forest-light" />
              <span>Open 24 Hours</span>
            </div>
            <div className="flex items-center gap-2 text-light/80 text-sm">
              <MapPin className="w-4 h-4 text-forest-light" />
              <span>Dandeli, Karnataka</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#fleet" className="btn-forest inline-flex items-center justify-center gap-2">
              Explore Fleet
            </a>
            <button onClick={onBookClick} className="btn-outline-forest inline-flex items-center justify-center gap-2">
              Book Adventure
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <ChevronDown className="w-6 h-6 text-forest-light/60" />
      </div>
    </section>
  );
}
