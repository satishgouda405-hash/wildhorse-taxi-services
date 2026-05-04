import { useState, useEffect } from 'react';
import { X, Phone, MapPin, Calendar, Users, Car, Navigation, Tent } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedVehicle?: string;
}

const travelTypes = [
  'River Rafting',
  'Kayaking',
  'Jungle Safari',
  'Night Camping',
  'Nature Trek',
  'Activity + Stay Package',
  'Local Sightseeing',
  'Outstation Transfer (Hubli/Belgaum)',
  'Airport / Station Pickup',
  'Homestay Booking Only',
];

const vehicleTypes = [
  { id: 'ertiga', name: 'Maruti Suzuki Ertiga (Family SUV)', seats: '6+1' },
  { id: 'innova', name: 'Toyota Innova Crysta (Premium SUV)', seats: '7+1' },
  { id: 'scorpio', name: 'Mahindra Scorpio / Bolero (Jungle SUV)', seats: '7+1' },
  { id: 'dzire', name: 'Maruti Suzuki Dzire (Compact)', seats: '4+1' },
  { id: 'tempo', name: 'Tempo Traveller (Group Tours)', seats: '12+1' },
];

export default function BookingModal({ isOpen, onClose, preselectedVehicle }: BookingModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    travelType: '',
    vehicle: preselectedVehicle || '',
    pickupLocation: '',
    dropLocation: '',
    date: '',
    passengers: '1',
    message: '',
  });

  useEffect(() => {
    if (preselectedVehicle) {
      setFormData((prev) => ({ ...prev, vehicle: preselectedVehicle }));
    }
  }, [preselectedVehicle]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedVehicle = vehicleTypes.find((v) => v.id === formData.vehicle);

    const whatsappMessage = `
*New Booking Request — Wild Horse Dandeli*

*Name:* ${formData.name}
*Phone:* ${formData.phone}
*Activity / Travel Type:* ${formData.travelType}
*Vehicle:* ${selectedVehicle?.name || formData.vehicle || 'Not specified'}
*Pickup Location:* ${formData.pickupLocation}
*Drop Location:* ${formData.dropLocation || 'N/A'}
*Date & Time:* ${formData.date}
*Passengers:* ${formData.passengers}
*Message:* ${formData.message || 'N/A'}

Please confirm my booking. Thank you!
    `.trim();

    window.open(`https://wa.me/919483068577?text=${encodeURIComponent(whatsappMessage)}`, '_blank');
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-obsidian/80 backdrop-blur-lg" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-panel rounded-2xl border border-forest/20 shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between p-6 pb-4 bg-navy/95 backdrop-blur-sm border-b border-forest/10">
          <div>
            <h2 className="font-display text-2xl text-light">Book Your Adventure</h2>
            <p className="text-text-muted text-sm">Wild Horse Dandeli — +91 94830 68577</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center hover:bg-forest/20 transition-colors text-light">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-light/80 text-sm font-medium mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-forest-light" /> Your Name *
              </label>
              <input
                name="name" value={formData.name} onChange={handleChange} required
                placeholder="Full Name"
                className="w-full bg-navy/50 border border-forest/20 rounded-lg px-4 py-3 text-light placeholder-text-muted text-sm focus:outline-none focus:border-forest-light transition-colors"
              />
            </div>
            <div>
              <label className="block text-light/80 text-sm font-medium mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4 text-forest-light" /> Phone Number *
              </label>
              <input
                name="phone" value={formData.phone} onChange={handleChange} required
                placeholder="+91 XXXXX XXXXX"
                className="w-full bg-navy/50 border border-forest/20 rounded-lg px-4 py-3 text-light placeholder-text-muted text-sm focus:outline-none focus:border-forest-light transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-light/80 text-sm font-medium mb-2 flex items-center gap-2">
              <Tent className="w-4 h-4 text-forest-light" /> Activity / Travel Type *
            </label>
            <select
              name="travelType" value={formData.travelType} onChange={handleChange} required
              className="w-full bg-navy/50 border border-forest/20 rounded-lg px-4 py-3 text-light text-sm focus:outline-none focus:border-forest-light transition-colors"
            >
              <option value="">Select Activity or Service</option>
              {travelTypes.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-light/80 text-sm font-medium mb-2 flex items-center gap-2">
              <Car className="w-4 h-4 text-forest-light" /> Vehicle Preference
            </label>
            <select
              name="vehicle" value={formData.vehicle} onChange={handleChange}
              className="w-full bg-navy/50 border border-forest/20 rounded-lg px-4 py-3 text-light text-sm focus:outline-none focus:border-forest-light transition-colors"
            >
              <option value="">Select Vehicle (optional)</option>
              {vehicleTypes.map((v) => <option key={v.id} value={v.id}>{v.name} ({v.seats} seats)</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-light/80 text-sm font-medium mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-forest-light" /> Pickup Location *
              </label>
              <input
                name="pickupLocation" value={formData.pickupLocation} onChange={handleChange} required
                placeholder="e.g. Dandeli Bus Stand"
                className="w-full bg-navy/50 border border-forest/20 rounded-lg px-4 py-3 text-light placeholder-text-muted text-sm focus:outline-none focus:border-forest-light transition-colors"
              />
            </div>
            <div>
              <label className="block text-light/80 text-sm font-medium mb-2 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-forest-light" /> Drop Location
              </label>
              <input
                name="dropLocation" value={formData.dropLocation} onChange={handleChange}
                placeholder="e.g. Hubli Railway Station"
                className="w-full bg-navy/50 border border-forest/20 rounded-lg px-4 py-3 text-light placeholder-text-muted text-sm focus:outline-none focus:border-forest-light transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-light/80 text-sm font-medium mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-forest-light" /> Date & Time *
              </label>
              <input
                type="datetime-local" name="date" value={formData.date} onChange={handleChange} required
                className="w-full bg-navy/50 border border-forest/20 rounded-lg px-4 py-3 text-light text-sm focus:outline-none focus:border-forest-light transition-colors"
              />
            </div>
            <div>
              <label className="block text-light/80 text-sm font-medium mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-forest-light" /> Number of Passengers
              </label>
              <input
                type="number" name="passengers" value={formData.passengers} onChange={handleChange} min="1" max="20"
                className="w-full bg-navy/50 border border-forest/20 rounded-lg px-4 py-3 text-light text-sm focus:outline-none focus:border-forest-light transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-light/80 text-sm font-medium mb-2">Additional Notes</label>
            <textarea
              name="message" value={formData.message} onChange={handleChange} rows={3}
              placeholder="Any special requirements, activity preferences, or questions..."
              className="w-full bg-navy/50 border border-forest/20 rounded-lg px-4 py-3 text-light placeholder-text-muted text-sm focus:outline-none focus:border-forest-light transition-colors resize-none"
            />
          </div>

          <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
            <p className="text-amber-400 text-xs font-medium">⚠️ Note: Wild Horse is closed on Wednesdays. Please plan your booking accordingly.</p>
          </div>

          <button type="submit" className="w-full btn-forest py-4 flex items-center justify-center gap-2 text-base">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Send Booking on WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
