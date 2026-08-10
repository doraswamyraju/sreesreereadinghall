import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

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
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            Visit <span className="gradient-text">Sree Sree Reading Hall</span> in Tirupati
          </h2>
          <p className="text-slate-300 text-sm sm:text-base">
            Walk in for a free campus tour and trial session, or send us a message on WhatsApp for instant seat availability.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left - Location & Info (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/30 space-y-6">
              <h3 className="text-xl font-bold text-white font-['Outfit'] border-b border-emerald-900/40 pb-3">
                Branch Location & Contacts
              </h3>

              {/* Address */}
              <div className="flex items-start space-x-3 text-sm text-slate-300">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-white mb-0.5">Tirupati Main Branch</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    1st Floor of Axis Bank, AVM Plaza, Air Bypass Rd, near Lakshmipuram Circle, near Passport Office, Kennedy Nagar, Ashok Nagar, Tirupati, Andhra Pradesh 517501
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3 text-sm text-slate-300">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Direct Phone Call</h4>
                  <a href="tel:+919666152456" className="text-xs text-emerald-400 hover:underline font-bold">
                    +91 9666152456
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-center space-x-3 text-sm text-slate-300">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Operational Hours</h4>
                  <p className="text-xs text-slate-300">Open 24 Hours / 7 Days a Week</p>
                </div>
              </div>

              {/* WhatsApp Quick Trigger */}
              <div className="pt-2">
                <a
                  href="https://wa.me/919666152456?text=Hi%20Sree%20Sree%20Reading%20Hall,%20I%20want%20to%20inquire%20about%20seat%20booking"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-600/30 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat Immediately on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Embedded Interactive Map Preview */}
            <div className="glass-card rounded-3xl overflow-hidden border border-emerald-500/20 h-64 relative">
              <iframe
                title="Sree Sree Reading Hall Location Map"
                src="https://maps.google.com/maps?q=17.4065,78.4772&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full border-0 filter opacity-85 invert grayscale hover:grayscale-0 hover:invert-0 transition-all"
                loading="lazy"
              />
              <div className="absolute bottom-2 left-2 bg-slate-950/90 text-emerald-400 px-3 py-1 rounded-full text-[10px] font-bold border border-emerald-500/30">
                Near Passport Office, Tirupati
              </div>
            </div>

          </div>

          {/* Right - Quick Inquiry Form (Col 7) */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-emerald-500/30">
            {submitted ? (
              <div className="text-center py-16 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold text-white font-['Outfit']">Inquiry Received!</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Thank you, <strong className="text-emerald-400">{formData.name}</strong>. Our branch manager will call you at <strong className="text-emerald-400">{formData.phone}</strong> shortly to confirm desk availability.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-emerald-950 border border-emerald-500/30 text-emerald-300 text-xs font-bold rounded-xl hover:bg-emerald-900"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-xl font-bold text-white font-['Outfit'] border-b border-emerald-900/40 pb-3">
                  Quick Seat Inquiry / Callback Request
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. K. Teja"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Mobile Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 9666152456"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Target Examination</label>
                    <select
                      value={formData.exam}
                      onChange={(e) => setFormData({ ...formData, exam: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-white text-xs focus:outline-none focus:border-emerald-400"
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
                    <label className="text-xs font-semibold text-slate-300 block mb-1">Preferred Shift</label>
                    <select
                      value={formData.shift}
                      onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-white text-xs focus:outline-none focus:border-emerald-400"
                    >
                      <option value="Full Day">Full Day (24 Hours)</option>
                      <option value="Morning">Morning Shift (6 AM - 2 PM)</option>
                      <option value="Evening">Evening Shift (2 PM - 10 PM)</option>
                      <option value="Night">Night Owl (10 PM - 6 AM)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">Message / Specific Requirements</label>
                  <textarea
                    rows={3}
                    placeholder="Mention any specific desk preference or questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-emerald-500/30 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg shadow-emerald-500/30 transition-all flex items-center justify-center space-x-2"
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
