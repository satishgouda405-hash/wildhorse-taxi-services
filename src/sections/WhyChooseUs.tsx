import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Clock,
  MapPin,
  Sparkles,
  IndianRupee,
  Route,
  ShieldCheck,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Clock,
    title: '24/7 Service',
    description:
      'Round-the-clock availability. Book anytime, day or night. We are always ready to serve you.',
  },
  {
    icon: MapPin,
    title: 'Expert Local Drivers',
    description:
      'Our drivers know every corner of Dandeli. They double as guides for a richer experience.',
  },
  {
    icon: Sparkles,
    title: 'Clean & Sanitized',
    description:
      'Every vehicle is cleaned before each trip. All adventure equipment is certified and safety-checked regularly.',
  },
  {
    icon: IndianRupee,
    title: 'Transparent Pricing',
    description:
      'No hidden charges, no surprises. Get upfront pricing with detailed fare breakdown.',
  },
  {
    icon: Route,
    title: 'Customizable Tours',
    description:
      'Plan your itinerary your way. Flexible routes and stops to match your travel preferences.',
  },
  {
    icon: ShieldCheck,
    title: 'Safety First',
    description:
      'GPS-tracked vehicles, insured rides, and verified drivers for complete peace of mind.',
  },
];

const stats = [
  { value: 5000, suffix: '+', label: 'Happy Customers' },
  { value: 50, suffix: '+', label: 'Destinations Covered' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 24, suffix: '/7', label: 'Support Available' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const start = performance.now();

          const animate = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Feature cards entrance
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          y: 50,
          opacity: 0,
          duration: 0.7,
          delay: i * 0.1,
          ease: 'power3.out',
        });
      });

      // Stats entrance
      if (statsRef.current) {
        gsap.from(statsRef.current, {
          scrollTrigger: {
            trigger: statsRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 40,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-obsidian relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-navy/30 rounded-full blur-3xl" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-forest-light text-sm font-medium uppercase tracking-[0.3em] mb-4">
            Why Choose Us
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-light mb-4">
            The Wild Horse Advantage
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Trusted by thousands of travelers across Karnataka. Here is why we
            are the preferred choice for taxi and tour services in Dandeli.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="group glass-panel rounded-xl p-6 hover:border-forest/40 transition-all duration-500"
              >
                <div className="w-12 h-12 rounded-lg bg-forest/10 flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110">
                  <Icon className="w-6 h-6 text-forest-light" />
                </div>
                <h3 className="font-heading text-lg text-light font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-text-muted text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div
          ref={statsRef}
          className="glass-panel rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-4xl md:text-5xl text-gradient-gold mb-2">
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-text-muted text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}