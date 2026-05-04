import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  { src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800', caption: 'Kali River Rafting' },
  { src: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800', caption: 'Dandeli Forest' },
  { src: 'https://images.unsplash.com/photo-1510784722466-f2aa240c4c17?w=800', caption: 'Jungle Safari' },
  { src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800', caption: 'Nature Treks' },
  { src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', caption: 'Forest Homestay' },
  { src: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800', caption: 'Night Camping' },
  { src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800', caption: 'Wildlife Spotting' },
];

const choreography = [
  { id: 1, x: -35, y: -15, z: 250, rotateX: -15, rotateY: 35 },
  { id: 2, x: 40, y: -10, z: -100, rotateX: 10, rotateY: -25 },
  { id: 3, x: -25, y: 25, z: 200, rotateX: 20, rotateY: -15 },
  { id: 4, x: 30, y: 20, z: -150, rotateX: -10, rotateY: 30 },
  { id: 5, x: -40, y: -20, z: 100, rotateX: 15, rotateY: 40 },
  { id: 6, x: 35, y: 15, z: -200, rotateX: -20, rotateY: -35 },
  { id: 7, x: 0, y: 0, z: 500, rotateX: 0, rotateY: 0 },
];

export default function Destinations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);
  const captionRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    gsap.set(container, { perspective: 1000, transformStyle: 'preserve-3d' });

    const tl = gsap.timeline({
      scrollTrigger: { trigger: container, start: 'top top', end: '+=150%', scrub: 2, pin: true },
    });

    tl.fromTo(headingRef.current,
      { rotationY: 50, z: -1000, xPercent: -100, opacity: 0 },
      { rotationY: 0, z: 500, xPercent: 0, opacity: 1, ease: 'power2.out', duration: 1 }, 0
    );

    choreography.forEach((step, i) => {
      const el = itemsRef.current[step.id - 1];
      if (!el) return;
      tl.to(el, { xPercent: step.x, yPercent: step.y, z: step.z, rotateX: step.rotateX, rotateY: step.rotateY, ease: 'power1.inOut', duration: 1.2 }, 0.3 + i * 0.1);
      tl.fromTo(captionRefs.current[step.id - 1], { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, 0.3 + i * 0.1);
    });

    tl.to(itemsRef.current, { xPercent: 0, yPercent: 0, z: 300, rotateX: 0, rotateY: 0, ease: 'power2.inOut', duration: 1.5 }, 2);

    return () => { tl.kill(); };
  }, []);

  return (
    <section id="destinations" ref={containerRef} className="relative w-full h-screen overflow-hidden bg-obsidian">
      <div className="absolute inset-0 bg-gradient-radial from-navy/30 via-obsidian to-obsidian" />

      <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
        <div ref={headingRef} className="text-center mb-8 opacity-0 absolute z-20">
          <p className="text-forest-light text-sm font-medium uppercase tracking-[0.3em] mb-4">Explore Dandeli</p>
          <h2 className="font-display text-4xl md:text-6xl text-light mb-4">Discover the Wild</h2>
          <p className="text-text-muted text-lg max-w-xl mx-auto">Where every journey becomes an unforgettable adventure</p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4 px-6">
          {destinations.map((dest, i) => (
            <div key={i} ref={(el) => { itemsRef.current[i] = el; }} className="relative opacity-0" style={{ transformStyle: 'preserve-3d' }}>
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl group" style={{ boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}>
                <img src={dest.src} alt={dest.caption} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div ref={(el) => { captionRefs.current[i] = el; }} className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-forest-light" />
                    <span className="text-light font-heading text-lg">{dest.caption}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
