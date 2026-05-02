/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Menu, 
  X, 
  ChevronRight, 
  Dumbbell, 
  Flame, 
  Trophy, 
  Users, 
  CheckCircle2, 
  Plus, 
  Minus,
  Instagram,
  Facebook,
  Twitter,
  ArrowUpRight,
  TrendingUp,
  Send,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';

// --- Constants ---
const PRIMARY_RED = "rgba(220, 38, 38, 1)"; // Tailwind red-600

// --- Types ---
type View = 'home' | 'about' | 'contact' | 'privacy';

// --- Components ---

const Marquee = ({ text }: { text: string }) => (
  <div className="bg-red-600 py-3 overflow-hidden whitespace-nowrap border-y border-white/10 relative z-20">
    <motion.div 
      animate={{ x: [0, -1000] }} 
      transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      className="inline-block"
    >
      {[...Array(10)].map((_, i) => (
        <span key={i} className="text-white font-black uppercase italic tracking-[0.2em] text-sm px-4">
          {text} • 
        </span>
      ))}
    </motion.div>
  </div>
);

const Navbar = ({ setView, currentView }: { setView: (v: View) => void, currentView: View }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { name: string, view: View, hash?: string }[] = [
    { name: 'Programs', view: 'home', hash: '#programs' },
    { name: 'About', view: 'about' },
    { name: 'Showcase', view: 'home', hash: '#showcase' },
    { name: 'Membership', view: 'home', hash: '#membership' },
    { name: 'Contact', view: 'contact' },
    { name: 'FAQ', view: 'home', hash: '#faq' },
  ];

  const handleNavClick = (link: { view: View, hash?: string }) => {
    setView(link.view);
    setIsOpen(false);
    if (link.hash && link.view === 'home') {
      setTimeout(() => {
        const el = document.querySelector(link.hash!);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled || currentView !== 'home' ? 'bg-black/95 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <button onClick={() => setView('home')} className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 bg-red-600 flex items-center justify-center italic text-sm font-black">
            FN
          </div>
          <span className="font-display font-black text-2xl tracking-tighter text-white uppercase flex items-center gap-1">
            FITNOVA <span className="text-red-600">GYM</span>
          </span>
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-[11px] uppercase tracking-widest font-semibold text-white/70">
          {navLinks.map((link) => (
            <button 
              key={link.name} 
              onClick={() => handleNavClick(link)}
              className={`hover:text-red-600 transition-colors cursor-pointer ${currentView === link.view && !link.hash ? 'text-red-600' : ''}`}
            >
              {link.name}
            </button>
          ))}
          <button 
            onClick={() => { setView('home'); setTimeout(() => document.getElementById('membership')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
            className="px-6 py-2 border border-red-600 text-red-600 text-[11px] font-bold uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all rounded-none cursor-pointer"
          >
            Membership
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-black border-b border-white/10 p-6 flex flex-col gap-6 md:hidden"
          >
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => handleNavClick(link)}
                className="text-white text-xl font-bold uppercase italic tracking-wider hover:text-red-600 transition-colors text-left"
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => { setView('home'); setIsOpen(false); }}
              className="bg-red-600 text-white py-4 font-bold uppercase tracking-widest"
            >
              Join Elite Membership
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FAQ = () => {
  const [active, setActive] = useState<number | null>(0);
  const faqs = [
    { q: "What makes Vanguard Elite unique?", a: "We provide personalized biomechanical analysis, Olympic-grade equipment, and a strictly limited membership to ensure zero wait times and peak performance environments." },
    { q: "Do you offer personal training?", a: "Yes, our trainers are IFBB Pros and certified strength coaches with a minimum of 10 years of competitive experience." },
    { q: "Can I cancel at any time?", a: "Our Standard and Premium plans offer month-to-month flexibility. We believe in our results, not restrictive contracts." },
    { q: "Is nutrition recovery included?", a: "Our Premium plan includes a bespoke meal prep service and 24/7 access to our cryotherapy and recovery lounge." }
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <div key={i} className="border border-white/10 rounded-lg overflow-hidden bg-white/5 backdrop-blur-sm">
          <button 
            className="w-full p-6 flex justify-between items-center text-left hover:bg-white/10 transition-colors cursor-pointer"
            onClick={() => setActive(active === i ? null : i)}
          >
            <span className="text-white font-bold text-lg">{faq.q}</span>
            {active === i ? <Minus className="text-red-500" /> : <Plus className="text-red-500" />}
          </button>
          <AnimatePresence>
            {active === i && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0 text-white/60 leading-relaxed border-t border-white/5">
                  {faq.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40">Full Name</label>
          <input required type="text" className="w-full bg-white/5 border border-white/10 px-4 py-4 focus:border-red-600 outline-none transition-colors rounded-none text-white font-medium" placeholder="E.G. JOHN DOE" />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40">Email Address</label>
          <input required type="email" className="w-full bg-white/5 border border-white/10 px-4 py-4 focus:border-red-600 outline-none transition-colors rounded-none text-white font-medium" placeholder="JOHN@VANGUARD.COM" />
        </div>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40">Inquiry Type</label>
        <select className="w-full bg-[#111] border border-white/10 px-4 py-4 focus:border-red-600 outline-none transition-colors rounded-none text-white font-medium">
          <option>MEMBERSHIP INQUIRY</option>
          <option>PERSONAL TRAINING</option>
          <option>PRIVATE FACILITY TOUR</option>
          <option>CORPORATE PARTNERSHIP</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40">Message</label>
        <textarea required rows={5} className="w-full bg-white/5 border border-white/10 px-4 py-4 focus:border-red-600 outline-none transition-colors rounded-none text-white font-medium resize-none" placeholder="TELL US ABOUT YOUR GOALS..."></textarea>
      </div>
      <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-6 font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 transition-colors shadow-[0_0_30px_rgba(220,38,38,0.3)] cursor-pointer">
        {submitted ? "Message Sent" : "Send Transmission"} <Send size={20} />
      </button>
    </form>
  );
};

// --- View Components ---

const AboutView = () => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    className="pt-32 pb-32 px-6 max-w-7xl mx-auto"
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
      <motion.div initial={{ x: -20 }} animate={{ x: 0 }}>
        <span className="text-red-500 font-bold uppercase tracking-[0.4em] text-xs">Since 2012</span>
        <h1 className="text-7xl font-display font-black uppercase italic tracking-tighter leading-none mt-6 mb-8">
          The FitNova <span className="text-red-600">Standard.</span>
        </h1>
        <p className="text-white/70 text-xl leading-relaxed mb-8">
          FitNova Gym wasn't built for the average. We created a sanctuary for those who view fitness as a lifelong pursuit of excellence. Our philosophy combines advanced biomechanical science with a culture of relentless effort.
        </p>
        <p className="text-white/50 text-lg leading-relaxed italic border-l-4 border-red-600 pl-6 py-2 bg-white/5">
          "Mediocrity is a choice. We offer the alternative: Peak performance through absolute discipline."
        </p>
        <div className="mt-10 flex gap-6">
          <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-white/5 border border-white/10 grow">
             <p className="text-4xl font-black italic text-red-600">12k+</p>
             <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 mt-2">Active Titans</p>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-6 bg-white/5 border border-white/10 grow">
             <p className="text-4xl font-black italic text-red-600">22</p>
             <p className="text-[10px] uppercase font-bold tracking-widest text-white/40 mt-2">Elite Facilities</p>
          </motion.div>
        </div>
      </motion.div>
      <div className="relative group overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          src="https://images.unsplash.com/photo-1571019623244-1bb2f9fceec3?q=80&w=2070&auto=format&fit=crop" 
          className="rounded-none shadow-2xl border border-white/10 relative z-10 brightness-75 group-hover:brightness-100 transition-all duration-700" 
          alt="Elite Training"
        />
        <div className="absolute inset-0 bg-red-600/10 group-hover:opacity-0 transition-opacity" />
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-red-600/30 blur-[100px] -z-10" />
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-32">
      {[
        { title: "Our Mission", text: "To eliminate biological limits through precision data and extreme intensity. We don't just count reps; we make reps count." },
        { title: "Our Method", text: "Progressive overload fused with elite recovery science. We focus on neuro-muscular efficiency to build functional power." },
        { title: "Our Promise", text: "A strictly professional environment where your growth is our only metric of success. Zero excuses, only results." }
      ].map((box, i) => (
        <motion.div 
          key={i} 
          className="p-10 bg-white/5 border border-white/10 hover:border-red-600 transition-colors group relative overflow-hidden"
          whileHover={{ y: -10 }}
        >
          <div className="absolute top-0 right-0 w-20 h-20 bg-red-600/5 -mr-10 -mt-10 rounded-full group-hover:scale-150 transition-transform duration-500" />
          <h3 className="text-2xl font-black uppercase italic mb-6 group-hover:text-red-500 transition-colors relative z-10">{box.title}</h3>
          <p className="text-white/60 leading-relaxed relative z-10">{box.text}</p>
        </motion.div>
      ))}
    </div>

    <div className="bg-white/5 border border-white/10 p-12 md:p-20 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 blur-[100px]" />
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-display font-black uppercase italic tracking-tighter mb-10">The Founder's <span className="text-red-600">Vision.</span></h2>
        <p className="text-white/70 text-lg leading-relaxed mb-12">
          "FitNova wasn't born in a boardroom. It was born in the early hours of a freezing garage gym, where we learned that true strength is forged in the absence of comfort. We didn't want to build a gym; we wanted to build a legacy. Every piece of equipment, every light fixture, and every coach here is a reflection of that uncompromising standard."
        </p>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-white/10 border border-white/20 mb-4 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop" className="w-full h-full object-cover" alt="Founder" />
          </div>
          <p className="font-black italic uppercase tracking-widest text-red-600">Marcus Thorn</p>
          <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/30">CEO & Founder, FitNova Gym</p>
        </div>
      </div>
    </div>
  </motion.div>
);

const ContactView = () => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    className="pt-32 pb-32 px-6 max-w-7xl mx-auto"
  >
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
      <div className="lg:col-span-12 xl:col-span-5 space-y-12">
        <div>
          <h1 className="text-7xl font-display font-black uppercase italic tracking-tighter leading-none mb-8">
            The <span className="text-red-600">Response.</span>
          </h1>
          <p className="text-white/60 text-lg leading-relaxed">
            Ready to ascend? Whether you require a tailored membership plan, a tour of our vault, or dietary logistics, our concierge team is on standby to facilitate your transformation.
          </p>
        </div>

        <div className="space-y-8">
          <motion.div className="flex gap-6 items-start group cursor-pointer" whileHover={{ x: 10 }}>
            <div className="w-12 h-12 bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all shadow-lg">
              <Mail size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 mb-1">Direct Communications</p>
              <p className="text-xl font-bold uppercase italic group-hover:text-red-500 transition-colors">HQ@FITNOVAGYM.COM</p>
            </div>
          </motion.div>
          <motion.div className="flex gap-6 items-start group cursor-pointer" whileHover={{ x: 10 }}>
            <div className="w-12 h-12 bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all shadow-lg">
              <Phone size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 mb-1">Titan Hotline</p>
              <p className="text-xl font-bold uppercase italic group-hover:text-red-500 transition-colors">+971 4 555 0192</p>
            </div>
          </motion.div>
          <motion.div className="flex gap-6 items-start group cursor-pointer" whileHover={{ x: 10 }}>
            <div className="w-12 h-12 bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-600 group-hover:bg-red-600 group-hover:text-white transition-all shadow-lg">
              <MapPin size={24} />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/40 mb-1">Global HQ</p>
              <p className="text-xl font-bold uppercase italic group-hover:text-red-500 transition-colors">77 TITAN WAY, MARINA DUBAI</p>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="lg:col-span-1 hidden xl:block border-r border-white/5 h-full"></div>

      <div className="lg:col-span-12 xl:col-span-6">
        <div className="bg-white/5 border border-white/10 p-10 relative shadow-2xl">
          <div className="absolute top-0 right-0 p-4 border-b border-l border-white/10 text-[10px] font-bold uppercase text-white/20">Secure Transmission</div>
          <ContactForm />
        </div>
      </div>
    </div>
  </motion.div>
);

const PrivacyView = () => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    className="pt-32 pb-32 px-6 max-w-4xl mx-auto"
  >
    <div className="mb-16">
      <span className="text-red-500 font-bold uppercase tracking-[0.4em] text-xs">Security Protocol</span>
      <h1 className="text-7xl font-display font-black uppercase italic tracking-tighter leading-none mt-6 mb-4">
        Privacy <span className="text-red-600">Vault.</span>
      </h1>
      <p className="text-white/40 text-sm uppercase tracking-widest font-black">Last Updated: May 2026</p>
    </div>

    <div className="prose prose-invert max-w-none space-y-12 text-white/80 leading-relaxed uppercase text-sm tracking-wider">
      <section className="bg-white/5 p-8 border-l-2 border-red-600">
        <h2 className="text-2xl font-black text-white italic mb-4">1. Intelligence Gathering</h2>
        <p>FitNova Gym collects personal biological and performance data strictly for optimization. This includes metabolic rates, heart rate variance, and strength metrics. We encrypt this data at a military-grade standard to ensure your biological signature remains yours alone.</p>
      </section>
      
      <section className="p-8 border-l-2 border-white/10">
        <h2 className="text-2xl font-black text-white italic mb-4">2. The Digital Firewall</h2>
        <p>Your financial and personal ID data is housed in a neural-linked digital vault. We do not participate in commercial data trading. Our servers are audited monthly by independent security firms to ensure absolute zero-leak integrity.</p>
      </section>

      <section className="bg-white/5 p-8 border-l-2 border-red-600">
        <h2 className="text-2xl font-black text-white italic mb-4">3. Biometric Consent</h2>
        <p>By using our facilities, you grant FitNova permission to analyze movement patterns strictly for the purpose of injury prevention and performance coaching. This data is never shared with insurance providers or third-party labs without explicit written authorization.</p>
      </section>

      <section className="p-8 border-l-2 border-white/10">
        <h2 className="text-2xl font-black text-white italic mb-4">4. Telemetry Controls</h2>
        <p>Our digital platforms use minimal telemetry for interface optimization. You may opt-out of advanced tracking via our Member Portal settings at any time, though some AI-driven coaching features may be limited as a result.</p>
      </section>
    </div>
  </motion.div>
);

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('home');
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, 100]);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="bg-[#050505] text-white selection:bg-red-600 selection:text-white overflow-x-hidden font-sans min-h-screen flex flex-col">
      <Navbar setView={setView} currentView={view} />

      <AnimatePresence mode="wait">
        <motion.div
           key={view}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.3 }}
           className="flex-grow"
        >
          {view === 'home' && (
            <>
        {/* Hero Section */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
        {/* Background Video & Overlay */}
        <div className="absolute inset-0 z-0 scale-105">
          <motion.div style={{ y: heroY }} className="h-full w-full">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover brightness-[0.35]"
              poster="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
            >
              <source src="https://player.vimeo.com/external/494163967.sd.mp4?s=6668729583155d045d9e5045610e200c868427f7&profile_id=165&oauth2_token_id=57447761" type="video/mp4" />
            </video>
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pt-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-4 inline-block px-3 py-1 bg-red-600 text-[10px] font-black uppercase tracking-widest text-white">FitNova Elite</div>
            <h1 className="text-8xl font-display font-black leading-[0.85] tracking-tighter mb-8 italic uppercase text-white">
              Build Real<br />
              <span className="text-red-600">Dominance.</span>
            </h1>
            <p className="text-lg text-white/60 max-w-lg mb-10 font-light italic leading-relaxed">
              Ascend to peak biological efficiency. FitNova Gym provides the forge; you provide the fire. Precision training for those who refuse the status quo.
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row items-center gap-6"
              whileHover={{ scale: 1.02 }}
            >
              <button 
                id="cta-hero-primary"
                onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-10 py-5 bg-white text-black text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:bg-red-600 hover:text-white transition-all rounded-none cursor-pointer"
              >
                Join The Elite
              </button>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase text-white/40 tracking-widest mb-1">Limited Membership</span>
                <span className="text-sm font-bold text-red-500 underline underline-offset-4 cursor-pointer flex items-center gap-2">
                  The FitNova Standard <ArrowUpRight size={14} />
                </span>
              </div>
            </motion.div>

            <div className="mt-12 flex items-center gap-8 text-white/90">
              <motion.div whileHover={{ y: -5 }}>
                <p className="text-3xl font-black italic">12k+</p>
                <p className="text-white/50 text-xs uppercase tracking-widest mt-1">Active Titans</p>
              </motion.div>
              <div className="w-[1px] h-10 bg-white/10" />
              <motion.div whileHover={{ y: -5 }}>
                <p className="text-3xl font-black italic">99.8%</p>
                <p className="text-white/50 text-xs uppercase tracking-widest mt-1">Peak Success</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block relative"
          >
            <div className="relative z-10 rounded-none overflow-hidden border border-white/10 group shadow-2xl">
              <div className="absolute inset-0 bg-red-600/20 mix-blend-color group-hover:opacity-0 transition-opacity duration-700" />
              <img 
                src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
                className="w-full scale-110 group-hover:scale-100 transition-transform duration-[2s] brightness-75 grayscale hover:grayscale-0"
                alt="Elite Athlete"
              />
            </div>
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-red-600/30 rounded-full blur-[120px] -z-10" />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30"
        >
          <span className="text-[8px] font-black uppercase tracking-[0.5em] rotate-180 [writing-mode:vertical-lr]">Scroll</span>
          <div className="w-[1px] h-12 bg-white" />
        </motion.div>
      </section>

      <Marquee text="Peak Performance • No Excuses • Elite Bio-Mechanics • Limitless Power • FitNova Gym" />

      {/* Programs Section */}
      <section id="programs" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-7xl font-display font-black uppercase italic tracking-tighter">
                Elite <span className="text-red-600 underline decoration-white/10">Programs.</span>
              </h2>
              <p className="text-white/50 max-w-md mt-6 uppercase tracking-widest text-sm">
                Designed for those who demand more from their bodies.
              </p>
            </motion.div>
            <div className="hidden lg:block h-px flex-1 bg-white/10 mx-10 mb-6" />
            <button className="group flex items-center gap-2 text-white/80 hover:text-red-500 font-bold uppercase tracking-widest transition-colors mb-6">
              See All Services <ChevronRight className="group-hover:translate-x-2 transition-transform" />
            </button>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              num: "01",
              title: "Bodybuilding", 
              desc: "HYPERTROPHY FOCUS", 
              img: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
            },
            { 
              num: "02",
              title: "Fat Loss", 
              desc: "METABOLIC SHOCK", 
              img: "https://images.unsplash.com/photo-1550345332-09e3ac987658?q=80&w=1974&auto=format&fit=crop"
            },
            { 
              num: "03",
              title: "Performance", 
              desc: "BIO-EXPLOSIVE POWER", 
              img: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=2070&auto=format&fit=crop"
            }
          ].map((program, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group relative h-[500px] rounded-none overflow-hidden border border-white/10 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              whileHover={{ y: -10, boxShadow: `0 10px 40px -10px rgba(220, 38, 38, 0.3)` }}
            >
              <img 
                src={program.img} 
                className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.3] group-hover:brightness-[0.4] group-hover:scale-110 transition-all duration-700" 
                alt={program.title}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
              <div className="absolute inset-x-0 bottom-0 p-8 w-full border-t border-white/10 backdrop-blur-sm transform translate-y-2 group-hover:translate-y-0 transition-transform">
                <div className="text-red-600 font-bold mb-2 uppercase text-[10px] tracking-widest">{program.num}. {program.title}</div>
                <div className="text-lg font-bold text-white/90 group-hover:text-white uppercase tracking-tight mb-4">{program.desc}</div>
                <button className="flex items-center gap-2 text-red-500 font-black uppercase text-[10px] tracking-[0.2em] group-hover:gap-4 transition-all cursor-pointer">
                  Claim Program &rarr;
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative group">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.02 }}
              className="relative z-10 cursor-pointer transition-transform duration-500"
            >
              <img 
                src="https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=1974&auto=format&fit=crop" 
                className="rounded-lg shadow-2xl border border-white/10" 
                alt="Trainer"
              />
            </motion.div>
            <div className="absolute -bottom-10 -right-10 bg-red-600 p-8 rounded-lg z-20 hidden md:block shadow-[0_0_30px_rgba(220,38,38,0.4)] group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500">
              <p className="text-5xl font-black italic">15+</p>
              <p className="uppercase tracking-widest text-[10px] font-bold mt-1 leading-tight">Years of Elite <br/>Experience</p>
            </div>
            <div className="absolute -top-20 -left-20 w-80 h-80 bg-red-600/10 rounded-full blur-[120px] -z-10" />
          </div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-red-500 font-bold uppercase tracking-[0.4em] text-xs">Our Story</span>
            <h2 className="text-5xl md:text-6xl font-display font-black uppercase italic tracking-tighter leading-none mt-6 mb-8">
              We Don't Just Train.<br/>We <span className="text-red-600 underline">Transform.</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Founded on the principles of biomechanical excellence and mental resilience, Vanguard Elite is more than a gym—it's a high-performance sanctuary. We stripped away the clutter of standard fitness to provide only what fuels results: extreme intensity, unmatched expertise, and a community of titans.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Olympic Standard Strength Equipment",
                "Personalized Macro-Nutrient Tracking",
                "Advanced Recovery & Cryotherapy Suites",
                "IFBB Pro Series Coaching Staff"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90">
                  <CheckCircle2 className="text-red-600" size={20} />
                  <span className="font-bold uppercase italic tracking-wider text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <button 
              onClick={() => setView('about')}
              className="bg-white text-black hover:bg-red-600 hover:text-white px-10 py-5 font-black uppercase tracking-widest transition-all shadow-xl cursor-pointer"
            >
              Meet The Founders
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-black py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
            {[
              { val: "25k+", label: "Transformations" },
              { val: "40+", label: "Pro Trainers" },
              { val: "100%", label: "Satisfaction" },
              { val: "24/7", label: "Elite Access" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="cursor-default"
              >
                <h3 className="text-5xl font-black italic text-red-600 tracking-tighter drop-shadow-[0_0_15px_rgba(220,38,38,0.3)]">{stat.val}</h3>
                <p className="uppercase tracking-[0.3em] text-[10px] text-white/40 font-bold mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Showclase / Gallery */}
      <section id="showcase" className="py-32">
        <div className="max-w-7xl mx-auto px-6 text-center mb-20">
          <h2 className="text-6xl font-display font-black uppercase italic tracking-tighter mb-4">The Forge.</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 h-[800px] gap-2">
          {[
            "https://images.unsplash.com/photo-1549476464-37392f717551?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1574673130244-c707e9d8352b?q=80&w=1968&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=2070&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1593079831268-3381b06bd5bb?q=80&w=2070&auto=format&fit=crop"
          ].map((img, i) => (
            <motion.div 
              key={i}
              whileHover={{ flex: 2, zIndex: 10 }}
              className="relative overflow-hidden cursor-crosshair group flex-[1] transition-all duration-700 bg-black"
            >
              <img src={img} className="absolute inset-0 w-full h-full object-cover brightness-[0.3] group-hover:brightness-100 transition-all duration-700 grayscale group-hover:grayscale-0 shadow-2xl" alt="Gallery" />
              <div className="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-x-0 bottom-10 text-center opacity-0 group-hover:opacity-100 transition-opacity translate-y-10 group-hover:translate-y-0 duration-500">
                <span className="bg-red-600 text-white px-6 py-2 font-black uppercase tracking-widest text-[10px] shadow-xl">Level {i + 1} Protocol</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Membership / Pricing */}
      <section id="membership" className="py-32 px-6 bg-[#080808]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-red-500 font-bold uppercase tracking-[0.4em] text-xs">Ready to Commit?</span>
            <h2 className="text-5xl md:text-7xl font-display font-black uppercase italic tracking-tighter mt-4 leading-none text-white">Choose Your <span className="text-red-600">Tier.</span></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Basic", price: "99", features: ["24/7 Access", "Locker Access", "Standard Cardio", "Free Wifi"] },
              { name: "Elite", price: "199", popular: true, features: ["Everything in Basic", "Personal Trainer (2x/mo)", "Elite Weights", "Recovery Lounge Access", "Free Nutrition Guide"] },
              { name: "Legend", price: "499", features: ["Everything in Elite", "Unlimited PT", "Private Suite", "Cryotherapy", "Customized Meal Prep"] }
            ].map((plan, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03, borderColor: plan.popular ? PRIMARY_RED : 'rgba(255,255,255,0.3)' }}
                className={`relative p-10 rounded-none border ${plan.popular ? 'border-red-600 bg-red-600/5 z-10' : 'border-white/10 bg-white/5'} transition-all`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                    Best Value
                  </div>
                )}
                <h3 className="text-2xl font-black uppercase italic mb-2 tracking-widest">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-4xl font-black leading-none">$</span>
                  <span className="text-6xl font-black leading-none">{plan.price}</span>
                  <span className="text-white/40 uppercase font-bold text-xs tracking-widest">/mo</span>
                </div>
                <ul className="space-y-4 mb-10 border-t border-white/10 pt-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-white/70">
                      <CheckCircle2 size={16} className="text-red-600" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-4 rounded-sm font-black uppercase tracking-widest transition-all cursor-pointer ${plan.popular ? 'bg-red-600 hover:bg-red-700 hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]' : 'bg-white text-black hover:bg-red-600 hover:text-white'}`}>
                  Join The Pack
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-32 px-6">
        <div className="max-w-3xl mx-auto space-y-12">
          <div className="text-center">
            <h2 className="text-5xl font-display font-black uppercase italic tracking-tighter mb-4 leading-none">Inquiries.</h2>
            <p className="text-white/50 uppercase tracking-[0.3em] text-xs font-bold">Frequently Asked Questions</p>
          </div>
          <FAQ />
        </div>
      </section>

      {/* CTA Bottom Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-red-600/10 backdrop-blur-3xl -z-10" />
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-6xl md:text-9xl font-display font-black uppercase italic tracking-tighter leading-none mb-10">
              The Body Achieves <br />
              <span className="text-red-600 stroke-white stroke-1 text-transparent">What The Mind </span><br />
              Believes.
            </h2>
            <p className="text-xl text-white/60 mb-12 max-w-2xl mx-auto font-medium">
              Limited slots available for May. Join now and lock in your founding member rate before we reach capacity.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05, boxShadow: "0 0 80px rgba(220,38,38,0.5)" }}
              className="group relative bg-red-600 px-16 py-8 text-2xl font-black uppercase tracking-[0.2em] italic shadow-[0_0_50px_rgba(220,38,38,0.4)] transition-all cursor-pointer"
            >
              Join Vanguard Elite
            </motion.button>
          </motion.div>
        </div>
      </section>
      </>
      )}
      </motion.div>
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-white/5 bg-black mt-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-1">
              <button onClick={() => setView('home')} className="flex items-center gap-2 group mb-8 cursor-pointer">
                <div className="w-10 h-10 bg-red-600 flex items-center justify-center rounded-sm rotate-45">
                  <Dumbbell className="text-white -rotate-45" size={20} />
                </div>
                <span className="font-display font-black text-2xl tracking-tighter text-white uppercase italic">
                  FitNova<span className="text-red-600">Gym</span>
                </span>
              </button>
              <p className="text-white/40 text-sm leading-relaxed mb-8">
                FitNova Gym defines the standard for high-performance fitness. Exclusive, data-driven, and relentlessly intense.
              </p>
              <div className="flex gap-4">
                <motion.button whileHover={{ y: -5, color: '#dc2626' }} className="w-10 h-10 border border-white/10 flex items-center justify-center rounded hover:border-red-600 transition-colors">
                  <Instagram size={18} />
                </motion.button>
                <motion.button whileHover={{ y: -5, color: '#dc2626' }} className="w-10 h-10 border border-white/10 flex items-center justify-center rounded hover:border-red-600 transition-colors">
                  <Facebook size={18} />
                </motion.button>
                <motion.button whileHover={{ y: -5, color: '#dc2626' }} className="w-10 h-10 border border-white/10 flex items-center justify-center rounded hover:border-red-600 transition-colors">
                  <Twitter size={18} />
                </motion.button>
              </div>
            </div>

            {[
              { title: "Navigation", links: [{n: "Programs", v: 'home'}, {n: "About", v: 'about'}, {n: "Showcase", v: 'home'}, {n: "Pricing", v: 'home'}] },
              { title: "Support", links: [{n: "Contact", v: 'contact'}, {n: "Privacy", v: 'privacy'}, {n: "Security", v: 'privacy'}, {n: "Portal", v: 'contact'}] },
              { title: "Location", links: [{n: "77 Titan Way", v: 'home'}, {n: "Dubai Marina", v: 'home'}, {n: "UAE, 00000", v: 'home'}] }
            ].map((col, i) => (
              <div key={i}>
                <h4 className="text-white font-black uppercase italic tracking-widest mb-8 text-sm">{col.title}</h4>
                <ul className="space-y-4">
          {col.links.map((link, j) => (
            <li key={j}>
              <button 
                onClick={() => { setView(link.v as View); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                className="text-white/40 hover:text-red-500 text-sm transition-colors uppercase tracking-widest font-bold cursor-pointer flex items-center gap-2 group/link"
              >
                <span className="w-0 group-hover/link:w-2 h-[2px] bg-red-600 transition-all duration-300"></span>
                {link.n}
              </button>
            </li>
          ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-white/20 text-[10px] uppercase font-bold tracking-[0.3em]">
            <p>&copy; 2026 Vanguard Elite Performance Center. All rights reserved.</p>
            <div className="flex gap-8">
              <button onClick={() => setView('privacy')} className="hover:text-white transition-colors cursor-pointer">Privacy Policy</button>
              <button onClick={() => setView('privacy')} className="hover:text-white transition-colors cursor-pointer">Terms of Service</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
