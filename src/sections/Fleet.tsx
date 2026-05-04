import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Briefcase, Fuel, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FleetProps {
  onBookClick: (vehicleType?: string) => void;
}

const fleetCategories = [
  {
    id: 'ertiga',
    title: 'Maruti Suzuki Ertiga',
    models: 'Ideal for families and group sightseeing',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800',
    passengers: '6 + 1',
    luggage: '3',
    features: ['AC', 'Family Friendly', 'Comfortable'],
    price: 'From ₹15/km',
  },
  {
    id: 'innova',
    title: 'Toyota Innova Crysta',
    models: 'Premium SUV for longer journeys',
    image: 'https://images.unsplash.com/photo-1532974297617-c0f05fe48bff?w=800',
    passengers: '7 + 1',
    luggage: '4',
    features: ['AC', 'Premium', 'Spacious'],
    price: 'From ₹20/km',
  },
  {
    id: 'scorpio',
    title: 'Mahindra Scorpio / Bolero',
    models: 'Rugged SUVs preferred for jungle areas',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800',
    passengers: '7 + 1',
    luggage: '3',
    features: ['AC', 'Rugged', 'Jungle Ready'],
    price: 'From ₹18/km',
  },
  {
    id: 'dzire',
    title: 'Maruti Suzuki Dzire',
    models: 'Compact option for couples or small groups',
    image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800',
    passengers: '4 + 1',
    luggage: '2',
    features: ['AC', 'Economical', 'Comfortable'],
    price: 'From ₹12/km',
  },
  {
    id: 'tempo',
    title: 'Tempo Traveller',
    models: 'For large group tours and school trips',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    passengers: '12 + 1',
    luggage: '6',
    features: ['AC', 'Group Travel', 'Pushback Seats'],
    price: 'From ₹24/km',
  },
];

export default function Fleet({ onBookClick }: FleetProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none none' },
          y: 60, opacity: 0, duration: 0.8, delay: i * 0.15, ease: 'power3.out',
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  const filters = ['all', 'ertiga', 'innova', 'scorpio', 'dzire', 'tempo'];
  const filterLabels: Record<string, string> = {
    all: 'All Vehicles', ertiga: 'Ertiga', innova: 'Innova', scorpio: 'Scorpio/Bolero', dzire: 'Dzire', tempo: 'Tempo',
  };

  return (
    <section id="fleet" ref={sectionRef} className="section-padding bg-obsidian relative">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #2d8a4e 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <p className="text-forest-light text-sm font-medium uppercase tracking-[0.3em] mb-4">Our Fleet</p>
          <h2 className="font-display text-4xl md:text-5xl text-light mb-4">Our Adventure Fleet</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            From jungle-ready SUVs to comfortable family vehicles — perfectly suited for Dandeli's terrain and your adventure needs.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter
                  ? 'bg-forest text-white'
                  : 'bg-navy text-light/70 hover:text-forest-light border border-forest/20'
              }`}
            >
              {filterLabels[filter]}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fleetCategories
            .filter((cat) => activeFilter === 'all' || cat.id === activeFilter)
            .map((category, i) => (
              <div
                key={category.id}
                ref={(el) => { cardsRef.current[i] = el; }}
                className="group glass-panel rounded-2xl overflow-hidden hover:border-forest/40 transition-all duration-500"
              >
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
                  <div className="absolute top-4 right-4 bg-forest text-white text-xs font-bold px-3 py-1 rounded-full">
                    {category.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl text-light mb-1">{category.title}</h3>
                  <p className="text-text-muted text-sm mb-4">{category.models}</p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-2 text-light/70 text-sm">
                      <Users className="w-4 h-4 text-forest-light" />
                      <span>{category.passengers}</span>
                    </div>
                    <div className="flex items-center gap-2 text-light/70 text-sm">
                      <Briefcase className="w-4 h-4 text-forest-light" />
                      <span>{category.luggage} Bags</span>
                    </div>
                    <div className="flex items-center gap-2 text-light/70 text-sm">
                      <Fuel className="w-4 h-4 text-forest-light" />
                      <span>Diesel/Petrol</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {category.features.map((feature) => (
                      <span key={feature} className="flex items-center gap-1 text-xs text-forest-light/80 bg-forest/10 px-3 py-1 rounded-full">
                        <Check className="w-3 h-3" />
                        {feature}
                      </span>
                    ))}
                  </div>
                  <button onClick={() => onBookClick(category.id)} className="w-full btn-forest py-3 text-center">
                    Book This Vehicle
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
