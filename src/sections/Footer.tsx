import { Phone, MapPin, ExternalLink, Globe } from 'lucide-react';

const quickLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Our Fleet', href: '#fleet' },
  { label: 'Activities', href: '#services' },
  { label: 'Explore Dandeli', href: '#destinations' },
  { label: 'Why Choose Us', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const services = [
  'River Rafting',
  'Kayaking',
  'Jungle Safari',
  'Night Camping',
  'Nature Treks',
  'Homestay Bookings',
  'Taxi Service',
  'Adventure Packages',
];

export default function Footer() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-navy border-t border-forest/10">
      <div className="max-w-[1400px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <h2 className="font-display text-2xl text-white mb-1">🐴 Wild Horse</h2>
              <p className="text-forest-light text-sm font-medium uppercase tracking-widest">Dandeli Adventures</p>
            </div>
            <p className="text-text-muted text-sm leading-relaxed mb-6">
              Your complete Dandeli adventure partner — taxi service, homestay bookings, river rafting, jungle safaris, and all activities in the wild heart of Karnataka.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://wa.me/919483068577"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center hover:bg-forest/20 transition-colors"
              >
                <svg className="w-5 h-5 text-forest-light" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </a>
              <a href="tel:+919483068577" className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center hover:bg-forest/20 transition-colors">
                <Phone className="w-5 h-5 text-forest-light" />
              </a>
              <a href="https://wildhorsedandeli.com/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center hover:bg-forest/20 transition-colors">
                <Globe className="w-5 h-5 text-forest-light" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-light font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="text-text-muted hover:text-forest-light text-sm transition-colors flex items-center gap-2"
                  >
                    <ExternalLink className="w-3 h-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-light font-semibold text-lg mb-6">Activities & Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <span className="text-text-muted text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest-light" />
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-light font-semibold text-lg mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li>
                <a href="tel:+919483068577" className="text-text-muted hover:text-forest-light text-sm transition-colors flex items-start gap-3">
                  <Phone className="w-4 h-4 text-forest-light mt-0.5 flex-shrink-0" />
                  +91 94830 68577
                </a>
              </li>
              <li>
                <a href="https://wildhorsedandeli.com/" target="_blank" rel="noopener noreferrer" className="text-text-muted hover:text-forest-light text-sm transition-colors flex items-start gap-3">
                  <Globe className="w-4 h-4 text-forest-light mt-0.5 flex-shrink-0" />
                  wildhorsedandeli.com
                </a>
              </li>
              <li>
                <span className="text-text-muted text-sm flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-forest-light mt-0.5 flex-shrink-0" />
                  Bailpar, Dandeli, Karnataka 581325
                </span>
              </li>
              <li className="mt-4 p-3 bg-amber-500/10 rounded-lg border border-amber-500/20">
                <p className="text-amber-400 text-xs font-medium">⚠️ Closed on Wednesdays</p>
                <p className="text-text-muted text-xs mt-1">Open all other days, 24 hours</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-forest/10">
        <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-muted text-sm">
            &copy; {new Date().getFullYear()} Wild Horse Taxi Service & Homestay, Dandeli. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-text-muted text-sm hover:text-forest-light cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-text-muted text-sm hover:text-forest-light cursor-pointer transition-colors">Terms of Service</span>
            <span className="text-text-muted text-sm hover:text-forest-light cursor-pointer transition-colors">Cancellation Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
