import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Car, Waves, Trees, Home, Compass, Tent, Mountain, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Waves,
    title: 'River Rafting',
    description: 'Thrilling white-water rafting on the Kali River. Experience Grade II-III rapids with certified guides and safety equipment.',
    color: '#2d8a4e',
  },
  {
    icon: Waves,
    title: 'Kayaking & River Crossing',
    description: 'Paddle through serene stretches of the Kali River or challenge yourself with guided river crossing adventures.',
    color: '#3aab62',
  },
  {
    icon: Trees,
    title: 'Jungle Safari',
    description: 'Explore Dandeli Wildlife Sanctuary — spot Black Panthers, elephants, and exotic birds in their natural habitat.',
    color: '#2d8a4e',
  },
  {
    icon: Tent,
    title: 'Night Camping',
    description: 'Camp under the stars deep in the Dandeli forest. Bonfire, stargazing, and the sounds of the wild await you.',
    color: '#3aab62',
  },
  {
    icon: Mountain,
    title: 'Nature Treks',
    description: 'Guided treks through dense forest trails, waterfalls, and scenic viewpoints in the Sahyadri mountain range.',
    color: '#2d8a4e',
  },
  {
    icon: Home,
    title: 'Homestay Bookings',
    description: 'Cozy nature-integrated stays offering a home away from home — wholesome meals, warm hospitality, forest views.',
    color: '#3aab62',
  },
  {
    icon: Car,
    title: 'Taxi & Transfers',
    description: 'Chauffeur-driven cars for local Dandeli sightseeing and transfers to Hubli, Belgaum, and beyond.',
    color: '#2d8a4e',
  },
  {
    icon: Compass,
    title: 'Activity + Stay Packages',
    description: 'The most popular choice — bundle your Activity + Homestay + Taxi in one seamless Dandeli adventure package.',
    color: '#3aab62',
  },
  {
    icon: Shield,
    title: 'Safe & Expert Guided',
    description: 'All activities are led by trained guides with certified safety gear. Your safety is our top priority in every adventure.',
    color: '#2d8a4e',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' },
          y: 50, opacity: 0, duration: 0.7, delay: i * 0.08, ease: 'power3.out',
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="section-padding bg-navy relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-forest/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-forest/10 rounded-full blur-3xl" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-forest-light text-sm font-medium uppercase tracking-[0.3em] mb-4">What We Offer</p>
          <h2 className="font-display text-4xl md:text-5xl text-light mb-4">Activities & Services</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            From adrenaline-pumping water adventures to peaceful jungle stays — Wild Horse covers every aspect of your Dandeli experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="group glass-panel rounded-xl p-6 hover:border-forest/40 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-14 h-14 rounded-lg flex items-center justify-center mb-5 transition-transform duration-500 group-hover:scale-110" style={{ backgroundColor: `${service.color}20` }}>
                  <Icon className="w-7 h-7" style={{ color: service.color }} />
                </div>
                <h3 className="font-heading text-lg text-light font-semibold mb-3">{service.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
