import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MapPin, Clock, Navigation, MessageCircle, Globe } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactProps {
  onBookClick: () => void;
}

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 94830 68577',
    href: 'tel:+919483068577',
  },
  {
    icon: Globe,
    label: 'Website',
    value: 'wildhorsedandeli.com',
    href: 'https://wildhorsedandeli.com/',
  },
  {
    icon: MapPin,
    label: 'Address',
    value: 'Bailpar, Dandeli, Karnataka 581325',
    href: 'https://maps.google.com/?q=Dandeli+Karnataka+581325',
  },
  {
    icon: Clock,
    label: 'Working Hours',
    value: 'Open 24 Hours — Closed on Wednesdays',
    href: null,
  },
];

export default function Contact({ onBookClick }: ContactProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(section.querySelectorAll('.contact-card'), {
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none none' },
        y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-obsidian relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 mb-20">
        <div className="relative bg-gradient-to-r from-forest via-forest-mid to-forest rounded-2xl p-8 md:p-12 text-center overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`, backgroundSize: '30px 30px' }} />
          </div>
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-5xl text-white mb-4">Ready for the Wild?</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto mb-8">
              Book your Dandeli adventure now — taxi, homestay, river rafting, jungle safari and more. One call covers it all.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onBookClick}
                className="bg-white text-forest font-semibold px-8 py-4 rounded-lg hover:bg-white/90 transition-all duration-300 hover:shadow-lg inline-flex items-center justify-center gap-2"
              >
                <Navigation className="w-5 h-5" />
                Book Your Adventure
              </button>
              <a
                href="https://wa.me/919483068577"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/20 text-white font-semibold px-8 py-4 rounded-lg hover:bg-white/30 transition-all duration-300 inline-flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-12">
          <p className="text-forest-light text-sm font-medium uppercase tracking-[0.3em] mb-4">Get In Touch</p>
          <h2 className="font-display text-4xl md:text-5xl text-light mb-4">Contact Us</h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            Have questions about activities, packages, or availability? Reach out anytime — we're here to help you plan the perfect Dandeli adventure. <span className="text-forest-light font-medium">Note: Closed on Wednesdays.</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactInfo.map((item) => {
            const Icon = item.icon;
            const content = (
              <div className="contact-card glass-panel rounded-xl p-6 hover:border-forest/40 transition-all duration-500 group cursor-pointer h-full">
                <div className="w-12 h-12 rounded-lg bg-forest/10 flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110">
                  <Icon className="w-6 h-6 text-forest-light" />
                </div>
                <h3 className="font-heading text-lg text-light font-semibold mb-2">{item.label}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{item.value}</p>
              </div>
            );

            return item.href ? (
              <a key={item.label} href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined} className="block">
                {content}
              </a>
            ) : (
              <div key={item.label}>{content}</div>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl overflow-hidden glass-panel border-forest/20">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3870.0!2d74.62!3d15.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTXCsDE2JzEyLjAiTiA3NMKwMzcnMTIuMCJF!5e0!3m2!1sen!2sin!4v1"
            width="100%"
            height="400"
            style={{ border: 0, filter: 'grayscale(60%) invert(10%) contrast(90%)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Wild Horse Dandeli Location"
          />
        </div>
      </div>
    </section>
  );
}
