import React, { useState } from 'react';
import { MapPin, Phone, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    exam: 'APPSC',
    shift: 'Full Day',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-20 relative bg-white border-t border-[#fbcfe8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#db2777] bg-[#fdf2f8] px-3.5 py-1 rounded-full border border-[#fbcfe8]">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 font-['Outfit']">
            VISIT <span className="text-[#db2777]">SREE SREE READING HALL</span> IN TIRUPATI
          </h2>
          <p className="text-slate-700 text-sm sm:text-base font-medium">
            Walk in for a free campus tour and trial session, or send us a message on WhatsApp for instant seat availability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left - Solid Brand Pink Info Box (Matching Flyer) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-[#db2777] text-white shadow-xl space-y-6">
              <h3 className="text-xl font-black text-white font-['Outfit'] uppercase border-b border-pink-400 pb-3">
                Branch Location & Contacts
              </h3>

              {/* Address */}
              <div className="flex items-start space-x-3 text-sm text-pink-50">
                <MapPin className="w-5 h-5 text-white shrink-0 mt-1" />
                <div>
                  <h4 className="font-extrabold text-white mb-0.5 uppercase tracking-wider">Tirupati Main Branch</h4>
                  <p className="text-xs text-white leading-relaxed font-medium">
                    1st Floor above Axis Bank, Near Lakshmipuram Circle, Air Bypass Rd, Kennedy Nagar, Ashok Nagar, Tirupati, Andhra Pradesh 517501.
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3 text-sm text-pink-50">
                <Phone className="w-5 h-5 text-white shrink-0" />
                <div>
                  <h4 className="font-extrabold text-white uppercase tracking-wider">Direct Phone Call</h4>
                  <a href="tel:+919666152456" className="text-sm text-white font-black hover:underline">
                    +91 9666152456
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-center space-x-3 text-sm text-pink-50">
                <Clock className="w-5 h-5 text-white shrink-0" />
                <div>
                  <h4 className="font-extrabold text-white uppercase tracking-wider">Operational Hours</h4>
                  <p className="text-xs text-white font-semibold">7:00 AM – 10:00 PM (Daily / All Days)</p>
                </div>
              </div>

              {/* WhatsApp Trigger Button - White on Pink */}
              <div className="pt-2">
                <a
                  href="https://wa.me/919666152456?text=Hi%20Sree%20Sree%20Reading%20Hall,%20I%20want%20to%20inquire%20about%20seat%20booking"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-2xl bg-white hover:bg-pink-50 text-[#db2777] font-black text-xs uppercase tracking-wider shadow-md transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-[#db2777]" />
                  <span>Chat Immediately on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Exact Google Maps Locator Plus Embed */}
            <div className="rounded-3xl overflow-hidden border-2 border-[#db2777] h-72 sm:h-80 relative shadow-md bg-white">
              <iframe
                title="Sree Sree Reading Hall Exact Google Map Location"
                src="https://storage.googleapis.com/maps-solutions-78rkkkitr5/locator-plus/i1td/locator-plus.html"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
              />
              <div className="absolute top-2 left-2 bg-[#db2777] text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-xs">
                📍 Exact Sree Sree Tirupati Location
              </div>
            </div>

          </div>

          {/* Right - Quick Inquiry Form (Col 7) */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-[#fbcfe8] bg-white">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-[#db2777] mx-auto animate-bounce" />
                <h3 className="text-2xl font-black text-slate-900 font-['Outfit']">Inquiry Received!</h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto font-medium">
                  Thank you, <strong className="text-[#db2777]">{formData.name}</strong>. Our branch manager will call you at <strong className="text-[#db2777]">{formData.phone}</strong> shortly to confirm desk availability.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-[#fdf2f8] border border-[#fbcfe8] text-[#db2777] text-xs font-bold rounded-xl hover:bg-pink-100"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-black text-slate-900 font-['Outfit'] border-b border-[#fbcfe8] pb-3">
                  QUICK SEAT INQUIRY / CALLBACK REQUEST
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. K. Teja"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#fbcfe8] text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-[#db2777] shadow-xs"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 9666152456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#fbcfe8] text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-[#db2777] shadow-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">Target Examination</label>
                    <select
                      value={formData.exam}
                      onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#fbcfe8] text-slate-900 text-xs focus:outline-none focus:border-[#db2777] shadow-xs"
                    >
                      <option value="APPSC Group 1/2">APPSC Group 1 / 2</option>
                      <option value="UPSC Civil Services">UPSC Civil Services</option>
                      <option value="NEET / JEE">NEET / JEE Medical</option>
                      <option value="AP Police / DSC">AP Police / DSC Teacher</option>
                      <option value="Banking & SSC">Banking & SSC Exams</option>
                      <option value="Other Study">General Study</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-800 block mb-1">Preferred Shift</label>
                    <select
                      value={formData.shift}
                      onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#fbcfe8] text-slate-900 text-xs focus:outline-none focus:border-[#db2777] shadow-xs"
                    >
                      <option value="Full Day">Full Day (7 AM - 10 PM)</option>
                      <option value="Morning">Morning Shift (7 AM - 2:30 PM)</option>
                      <option value="Evening">Evening Shift (2:30 PM - 10 PM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 block mb-1">Message / Specific Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Mention any specific desk preference or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#fbcfe8] text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:border-[#db2777] shadow-xs"
                  />
                </div>

                {/* Solid Pink Button */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-[#db2777] hover:bg-[#be185d] text-white font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center space-x-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Inquiry Request</span>
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
