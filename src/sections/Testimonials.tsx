import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Rahul Sharma',
    location: 'Bangalore',
    rating: 5,
    text: 'The river rafting on Kali River was absolutely thrilling! Wild Horse arranged everything — safety gear, expert guides, and pickup from our homestay. Best adventure trip ever!',
    avatar: 'RS',
  },
  {
    name: 'Priya Patel',
    location: 'Mumbai',
    rating: 5,
    text: 'We booked the Activity + Stay + Taxi package and it was worth every rupee. The forest homestay was cozy, the jungle safari was amazing, and the Innova was spotlessly clean.',
    avatar: 'PP',
  },
  {
    name: 'Ankit Kumar',
    location: 'Pune',
    rating: 5,
    text: 'Night camping under the Dandeli stars arranged by Wild Horse was magical. The bonfire, the sounds of the jungle, the guide was knowledgeable. Absolutely unforgettable!',
    avatar: 'AK',
  },
  {
    name: 'Sneha Reddy',
    location: 'Hyderabad',
    rating: 5,
    text: 'Booked the Tempo Traveller for our college group of 12. Driver was amazing, helped us plan our activities, and the vehicle was perfectly maintained. 10/10 for Wild Horse!',
    avatar: 'SR',
  },
  {
    name: 'Vikram Joshi',
    location: 'Delhi',
    rating: 5,
    text: 'We spotted a black panther during the jungle safari! The guide from Wild Horse knew exactly where to go. Transferred us to Hubli afterwards — seamless and reliable service.',
    avatar: 'VJ',
  },
  {
    name: 'Meera Nair',
    location: 'Kochi',
    rating: 5,
    text: 'Kayaking on the Kali River with Wild Horse was the highlight of our Dandeli trip. Everything was safe, well-organized, and the team was incredibly friendly and professional.',
    avatar: 'MN',
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const cardWidth = slider.offsetWidth;
    slider.scrollTo({
      left: cardWidth * index,
      behavior: 'smooth',
    });
    setCurrentIndex(index);
  };

  const next = () => {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    scrollToIndex(nextIndex);
  };

  const prev = () => {
    const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    scrollToIndex(prevIndex);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(section.querySelector('.testimonials-header'), {
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      next();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <section ref={sectionRef} className="section-padding bg-navy relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-navy to-obsidian opacity-50" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="testimonials-header text-center mb-16">
          <p className="text-forest-light text-sm font-medium uppercase tracking-[0.3em] mb-4">
            Testimonials
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-light mb-4">
            What Our Customers Say
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Do not just take our word for it. Here is what travelers have to say
            about their experience with Wild Horse And Travels.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-forest/20 transition-colors -translate-x-1/2 hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6 text-forest-light" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:bg-forest/20 transition-colors translate-x-1/2 hidden md:flex"
          >
            <ChevronRight className="w-6 h-6 text-forest-light" />
          </button>

          {/* Cards Container */}
          <div
            ref={sliderRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-4 scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonials.map((testimonial, i) => (
              <div
                key={i}
                className="flex-shrink-0 w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] snap-start"
              >
                <div className="glass-panel rounded-xl p-6 h-full hover:border-forest/30 transition-all duration-500">
                  {/* Quote icon */}
                  <Quote className="w-8 h-8 text-forest-light/30 mb-4" />

                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star
                        key={j}
                        className="w-4 h-4 text-forest-light fill-gold"
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="text-light/80 text-sm leading-relaxed mb-6">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-forest/20 flex items-center justify-center text-forest-light font-semibold text-sm">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <p className="text-light font-medium text-sm">
                        {testimonial.name}
                      </p>
                      <p className="text-text-muted text-xs">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToIndex(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'w-8 bg-forest'
                    : 'bg-light/30 hover:bg-light/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}