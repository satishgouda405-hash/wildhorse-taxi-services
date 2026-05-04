import { useState, useEffect } from 'react';
import { Menu, X, Phone } from 'lucide-react';

interface NavigationProps {
  onBookClick: () => void;
}

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Fleet', href: '#fleet' },
  { label: 'Activities', href: '#services' },
  { label: 'Explore', href: '#destinations' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation({ onBookClick }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-panel-strong py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-[1400px] mx-auto px-6 flex items-center justify-between">
          <a href="#home" onClick={(e) => { e.preventDefault(); scrollTo('#home'); }} className="flex items-center gap-3 group">
            <span className="text-2xl">🐴</span>
            <div>
              <p className="text-light font-display text-xl leading-none">Wild Horse</p>
              <p className="text-forest-light text-xs uppercase tracking-widest">Dandeli</p>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="text-light/80 hover:text-forest-light text-sm font-medium uppercase tracking-wider transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a href="tel:+919483068577" className="flex items-center gap-2 text-forest-light hover:text-white text-sm font-medium transition-colors">
              <Phone className="w-4 h-4" />
              +91 94830 68577
            </a>
            <button onClick={onBookClick} className="btn-forest text-sm">Book Now</button>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden text-forest-light p-2">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
        <div className="absolute inset-0 bg-obsidian/90 backdrop-blur-lg" onClick={() => setMobileOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-80 bg-navy border-l border-forest/20 p-8 pt-24 transition-transform duration-500 ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={(e) => { e.preventDefault(); scrollTo(link.href); }} className="text-light hover:text-forest-light text-lg font-medium transition-colors">
                {link.label}
              </a>
            ))}
            <hr className="border-forest/20" />
            <a href="tel:+919483068577" className="flex items-center gap-2 text-forest-light text-lg font-medium">
              <Phone className="w-5 h-5" />
              +91 94830 68577
            </a>
            <button onClick={onBookClick} className="btn-forest w-full mt-4">Book Now</button>
          </div>
        </div>
      </div>
    </>
  );
}
