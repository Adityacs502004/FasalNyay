import { useEffect, useRef, useState } from 'react';
import { 
  ShieldCheck, 
  Leaf, 
  CloudRain, 
  FileText, 
  Clock, 
  FileX2, 
  Banknote, 
  ArrowRight, 
  Menu, 
  X, 
  MapPin, 
  Scale, 
  CheckCircle2, 
  Sparkles
} from 'lucide-react';

// Smooth scroll helper
const scrollToSection = (e, targetId) => {
  e.preventDefault();
  const element = document.getElementById(targetId);
  if (element) {
    const navHeight = 72;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - navHeight;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

// Intersection observer hook that triggers once when element enters viewport
const useInView = (threshold = 0.15) => {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
      }
    }, { threshold });

    const current = ref.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [threshold]);

  return [ref, isInView];
};

// Smooth count-up hook for animated stats
const useCountUp = (endValue, duration = 1600, isVisible = false, decimals = 0) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let startTime = null;
    let frameId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out quartic for natural deceleration
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const current = easeProgress * endValue;
      setCount(current);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [endValue, duration, isVisible]);

  return decimals > 0 ? count.toFixed(decimals) : Math.round(count);
};

// Reusable Pastel Border Card Wrapper with gentle hover transition
const PastelBorderCard = ({ children, className = "", rounded = "rounded-2xl" }) => (
  <div className={`relative p-[2px] ${rounded} bg-gradient-to-br from-[#FFDAB9] via-[#FF7F50] to-[#ADD8E6] transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/5 ${className}`}>
    <div className={`bg-white w-full h-full ${rounded} overflow-hidden`}>
      {children}
    </div>
  </div>
);

// Navigation Bar
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-emerald-100/60' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo with animated leaf hover */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer group"
            onClick={(e) => scrollToSection(e, 'home')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-900 flex items-center justify-center text-white shadow-md shadow-emerald-900/10 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
              <Leaf className="w-5 h-5 text-emerald-100" />
            </div>
            <div>
              <span className="text-2xl font-black text-emerald-950 tracking-tight">Fasal<span className="text-emerald-600">Nyay</span></span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#crisis" 
              onClick={(e) => scrollToSection(e, 'crisis')} 
              className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300"
            >
              The Crisis
            </a>
            <a 
              href="#how-it-works" 
              onClick={(e) => scrollToSection(e, 'how-it-works')} 
              className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300"
            >
              How It Works
            </a>
            <a 
              href="#trust-model" 
              onClick={(e) => scrollToSection(e, 'trust-model')} 
              className="text-sm font-medium text-slate-600 hover:text-emerald-700 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-emerald-600 hover:after:w-full after:transition-all after:duration-300"
            >
              Trust Model
            </a>
            
            {/* CTA Button with gentle gradient border */}
            <div 
              
              className="relative p-[2px] rounded-full bg-gradient-to-r from-[#FFDAB9] via-[#EE82EE] to-[#ADD8E6] hover:scale-105 hover:shadow-md transition-all duration-300 cursor-pointer"
            >
              <div className="bg-emerald-950 hover:bg-emerald-900 rounded-full px-5 py-2.5 flex items-center gap-2 transition-colors">
                <span className="text-sm font-semibold text-white">Start Your Appeal</span>
                <ArrowRight className="w-4 h-4 text-[#FFDAB9] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 rounded-lg text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav dropdown with smooth slide */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-lg border-b border-emerald-100 px-6 pt-3 pb-6 space-y-3 shadow-xl">
          <a 
            href="#crisis" 
            onClick={(e) => { scrollToSection(e, 'crisis'); setIsOpen(false); }} 
            className="block py-2 text-base font-medium text-slate-700 hover:text-emerald-700"
          >
            The Crisis
          </a>
          <a 
            href="#how-it-works" 
            onClick={(e) => { scrollToSection(e, 'how-it-works'); setIsOpen(false); }} 
            className="block py-2 text-base font-medium text-slate-700 hover:text-emerald-700"
          >
            How It Works
          </a>
          <a 
            href="#trust-model" 
            onClick={(e) => { scrollToSection(e, 'trust-model'); setIsOpen(false); }} 
            className="block py-2 text-base font-medium text-slate-700 hover:text-emerald-700"
          >
            Trust Model
          </a>
          <div 
            onClick={(e) => {  setIsOpen(false); }}
            className="w-full bg-emerald-950 text-white text-center py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-sm"
          >
            Start Your Appeal <ArrowRight className="w-4 h-4 text-[#FFDAB9]" />
          </div>
        </div>
      )}
    </nav>
  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-white">
      {/* Ambient background glowing orbs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-5%] right-[-5%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#FFDAB9]/35 to-[#EE82EE]/25 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-[5%] left-[-8%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#ADD8E6]/30 to-[#FF7F50]/20 blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 text-center lg:text-left">
            {/* Live Indicator Pill */}
            <div className="animate-fade-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-emerald-200/80 shadow-sm mb-6">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
              </span>
              <span className="text-xs font-semibold tracking-wide text-emerald-900 uppercase">
                PMFBY Dispute Defense & Evidence Builder
              </span>
            </div>

            {/* Headline */}
            <h1 className="animate-fade-up delay-100 text-4xl sm:text-5xl lg:text-6xl font-extrabold text-emerald-950 tracking-tight leading-[1.15] mb-6">
              AI-Powered Justice for <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-emerald-600 to-teal-700">
                Crop Insurance Claims
              </span>
            </h1>

            {/* Subtext */}
            <p className="animate-fade-up delay-200 text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Turn geotagged photos and independent NASA weather data into guideline-grounded appeal letters when your PMFBY claim is unfairly rejected or delayed.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up delay-300 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
              <button 
                
                className="group relative w-full sm:w-auto p-[2px] rounded-2xl bg-gradient-to-r from-[#FFDAB9] via-[#FF7F50] via-[#EE82EE] to-[#ADD8E6] hover:shadow-xl hover:shadow-emerald-900/15 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="bg-emerald-950 text-white px-7 py-3.5 rounded-2xl flex items-center justify-center gap-3 group-hover:bg-emerald-900 transition-colors">
                  <span className="text-base font-semibold">Start Your Appeal</span>
                  <ArrowRight className="w-5 h-5 text-[#FFDAB9] group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </button>

              <button 
                onClick={(e) => scrollToSection(e, 'trust-model')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white border border-emerald-200 text-emerald-900 font-semibold text-base hover:bg-emerald-50/80 hover:border-emerald-300 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <FileText className="w-4 h-4 text-emerald-600" />
                How Grounding Works
              </button>
            </div>

            {/* Quick trust badges */}
            <div className="animate-fade-up delay-400 mt-10 pt-6 border-t border-emerald-100/80 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-500">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>EXIF GPS/Timestamp Proof</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>NASA POWER Weather Cross-Check</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>12% Statutory Penal Interest Rule</span>
              </div>
            </div>
          </div>

          {/* Hero Illustration / Plant Floating Graphic */}
          <div className="animate-fade-up delay-300 lg:col-span-4 flex justify-center">
            <div className="relative w-72 sm:w-80 lg:w-full max-w-sm aspect-square flex items-center justify-center">
              {/* Pulsing background circle */}
              <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-emerald-100 via-[#FFDAB9]/40 to-[#ADD8E6]/40 blur-2xl animate-pulse-glow" />
              
              {/* Outer decorative ring */}
              <div className="absolute inset-0 rounded-3xl border border-emerald-200/50 bg-white/40 backdrop-blur-sm shadow-xl p-6 flex flex-col items-center justify-center">
                {/* Floating Wheat Plant Image with gentle bob */}
                <div className="animate-float-slow relative">
                  <img 
                    src="/wheat-plant.png" 
                    alt="Wheat Crop Illustration" 
                    className="w-44 h-44 object-contain filter drop-shadow-md"
                  />
                </div>

                {/* Floating live badge */}
                <div className="animate-float-reverse mt-2 bg-emerald-950/90 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-lg border border-emerald-700/50 flex items-center gap-2">
                  <Scale className="w-3.5 h-3.5 text-[#FFDAB9]" />
                  <span>PMFBY Dispute Shield</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

// Crisis Section with animated stat counters
const CrisisSection = () => {
  const [ref, isVisible] = useInView(0.2);

  // Animated counters
  const monthsCount = useCountUp(14, 1400, isVisible, 0);
  const claimsCount = useCountUp(4.3, 1600, isVisible, 1);
  const duesCount = useCountUp(500, 1800, isVisible, 0);

  return (
    <section id="crisis" ref={ref} className="py-24 bg-emerald-950 text-white relative overflow-hidden">
      {/* Pastel accent top gradient border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFDAB9] via-[#FF7F50] via-[#EE82EE] to-[#ADD8E6]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} text-center max-w-3xl mx-auto mb-16`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-900/90 text-emerald-300 text-xs font-semibold mb-3 border border-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-[#FFDAB9]" />
            Ground Reality in 2025–2026
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">The System is Broken for Farmers</h2>
          <p className="text-emerald-100/75 text-base sm:text-lg leading-relaxed">
            Insurers routinely dismiss PMFBY claims because farmers lack independent, verifiable evidence to contest arbitrary rejections and delays.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Stat 1 */}
          <div className={`transition-all duration-700 delay-100 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} bg-emerald-900/40 border border-emerald-800/80 rounded-3xl p-8 relative overflow-hidden group hover:border-[#FFDAB9]/60 hover:bg-emerald-900/60 transition-all duration-300 hover:-translate-y-1`}>
            <div className="absolute -right-6 -top-6 w-28 h-28 bg-[#FF7F50]/15 rounded-full blur-2xl group-hover:bg-[#FF7F50]/25 transition-all duration-300" />
            <Clock className="w-10 h-10 text-[#FFDAB9] mb-6 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-5xl font-black text-white mb-2 tracking-tight">
              {monthsCount} <span className="text-2xl text-emerald-400 font-medium">Months</span>
            </div>
            <div className="h-1 w-12 bg-gradient-to-r from-[#FFDAB9] to-[#FF7F50] rounded-full mb-4 group-hover:w-20 transition-all duration-300" />
            <h3 className="text-lg font-bold text-emerald-50 mb-2">Maximum Settlement Delay</h3>
            <p className="text-sm text-emerald-200/70 leading-relaxed">Documented by a 2025 IIM study, leaving farmers without critical capital for subsequent sowing seasons.</p>
          </div>

          {/* Stat 2 */}
          <div className={`transition-all duration-700 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} bg-emerald-900/40 border border-emerald-800/80 rounded-3xl p-8 relative overflow-hidden group hover:border-[#EE82EE]/60 hover:bg-emerald-900/60 transition-all duration-300 hover:-translate-y-1`}>
            <div className="absolute -right-6 -top-6 w-28 h-28 bg-[#EE82EE]/15 rounded-full blur-2xl group-hover:bg-[#EE82EE]/25 transition-all duration-300" />
            <FileX2 className="w-10 h-10 text-[#EE82EE] mb-6 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-5xl font-black text-white mb-2 tracking-tight">
              {claimsCount} <span className="text-2xl text-emerald-400 font-medium">Lakh+</span>
            </div>
            <div className="h-1 w-12 bg-gradient-to-r from-[#EE82EE] to-[#ADD8E6] rounded-full mb-4 group-hover:w-20 transition-all duration-300" />
            <h3 className="text-lg font-bold text-emerald-50 mb-2">Claims Rejected</h3>
            <p className="text-sm text-emerald-200/70 leading-relaxed">In Maharashtra alone during Kharif 2024, often due to allegedly fabricated field inspection reports without farmer signatures.</p>
          </div>

          {/* Stat 3 */}
          <div className={`transition-all duration-700 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} bg-emerald-900/40 border border-emerald-800/80 rounded-3xl p-8 relative overflow-hidden group hover:border-[#ADD8E6]/60 hover:bg-emerald-900/60 transition-all duration-300 hover:-translate-y-1`}>
            <div className="absolute -right-6 -top-6 w-28 h-28 bg-[#ADD8E6]/15 rounded-full blur-2xl group-hover:bg-[#ADD8E6]/25 transition-all duration-300" />
            <Banknote className="w-10 h-10 text-[#ADD8E6] mb-6 group-hover:scale-110 transition-transform duration-300" />
            <div className="text-5xl font-black text-white mb-2 tracking-tight">
              ₹{duesCount} <span className="text-2xl text-emerald-400 font-medium">Cr</span>
            </div>
            <div className="h-1 w-12 bg-gradient-to-r from-[#ADD8E6] to-[#FFDAB9] rounded-full mb-4 group-hover:w-20 transition-all duration-300" />
            <h3 className="text-lg font-bold text-emerald-50 mb-2">Pending Claim Dues</h3>
            <p className="text-sm text-emerald-200/70 leading-relaxed">Triggered massive farmer protests and tractor marches in Churu, Rajasthan in late 2025 demanding enforcement.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// How It Works Section with animated connector beam
const HowItWorksSection = () => {
  const [ref, isVisible] = useInView(0.15);

  return (
    <section id="how-it-works" ref={ref} className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'} text-center max-w-3xl mx-auto mb-20`}>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold mb-3 border border-emerald-100">
            Automated 3-Step Pipeline
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-950 mb-4 tracking-tight">How FasalNyay Protects You</h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Build an independently-verified evidence dossier that insurance surveyors and DLMC committees cannot disregard.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-10 relative">
          {/* Animated Connecting Beam (Desktop) */}
          <div className="hidden lg:block absolute top-20 left-[15%] w-[70%] h-1 bg-emerald-100 rounded-full overflow-hidden -z-0">
            <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-emerald-500 to-transparent animate-beam" />
          </div>

          {/* Step 1 */}
          <div className={`transition-all duration-700 delay-100 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} flex flex-col items-center text-center group`}>
            <div className="relative mb-6">
              <PastelBorderCard className="w-20 h-20 rounded-full flex items-center justify-center group-hover:-translate-y-1.5 transition-transform duration-300" rounded="rounded-full">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </PastelBorderCard>
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-emerald-950 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                01
              </span>
            </div>
            <h3 className="text-xl font-bold text-emerald-950 mb-2.5">Upload Field Photos</h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              Upload photos taken during the crop loss event. Our engine parses the binary EXIF metadata directly for verified GPS coordinates and true capture timestamps.
            </p>
          </div>

          {/* Step 2 */}
          <div className={`transition-all duration-700 delay-200 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} flex flex-col items-center text-center group`}>
            <div className="relative mb-6">
              <PastelBorderCard className="w-20 h-20 rounded-full flex items-center justify-center group-hover:-translate-y-1.5 transition-transform duration-300" rounded="rounded-full">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <CloudRain className="w-8 h-8 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </PastelBorderCard>
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-emerald-950 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                02
              </span>
            </div>
            <h3 className="text-xl font-bold text-emerald-950 mb-2.5">NASA Weather Cross-Check</h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              Public meteorological data from the NASA POWER API verifies rainfall deficit, drought, or extreme excess against historical norms for that exact village block.
            </p>
          </div>

          {/* Step 3 */}
          <div className={`transition-all duration-700 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'} flex flex-col items-center text-center group`}>
            <div className="relative mb-6">
              <PastelBorderCard className="w-20 h-20 rounded-full flex items-center justify-center group-hover:-translate-y-1.5 transition-transform duration-300" rounded="rounded-full">
                <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-emerald-600 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </PastelBorderCard>
              <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 bg-emerald-950 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
                03
              </span>
            </div>
            <h3 className="text-xl font-bold text-emerald-950 mb-2.5">Generate Grounded Appeal</h3>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">
              The AI retrieves official PMFBY operational guidelines to match binding clauses (joint survey requirements & 12% statutory penal interest) into a ready appeal letter.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Trust Model Section with floating dynamic data blocks
const TrustModelSection = () => {
  const [ref, isVisible] = useInView(0.15);

  return (
    <section id="trust-model" ref={ref} className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column Text */}
          <div className={`transition-all duration-1000 transform ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'} space-y-7`}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-900 font-semibold text-xs border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-700" /> 
              Hard Core Trust Constraint
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-950 leading-tight tracking-tight">
              AI That Never <br /> Invents Data.
            </h2>
            
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              In legal disputes and insurance claims, hallucinations destroy credibility. FasalNyay operates on a strict zero-hallucination trust model: the LLM only formats facts extracted by independent code and public APIs.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-4 p-3 rounded-2xl hover:bg-white transition-colors duration-200">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#FF7F50]" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-emerald-950 mb-0.5">Immutable EXIF Metadata</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">Extracted directly via binary header parser (`exifr`), confirming the photo is genuine, on-field, and untampered.</p>
                </div>
              </div>

              <div className="flex gap-4 p-3 rounded-2xl hover:bg-white transition-colors duration-200">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center">
                  <CloudRain className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-emerald-950 mb-0.5">Public NASA Weather Archive</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">Historical precipitation and temperature records retrieved from open space-agency satellites, independent of insurer claims.</p>
                </div>
              </div>

              <div className="flex gap-4 p-3 rounded-2xl hover:bg-white transition-colors duration-200">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center">
                  <Scale className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-emerald-950 mb-0.5">Grounded PMFBY Clauses</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">The AI retrieves actual paragraphs from the official PMFBY guidelines PDF — zero fabricated legal sections.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Live Pipeline Card with Floating Blocks */}
          <div className={`transition-all duration-1000 delay-200 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} relative`}>
            <PastelBorderCard className="relative z-10 w-full max-w-md mx-auto shadow-2xl" rounded="rounded-3xl">
              <div className="bg-emerald-950 w-full p-7 sm:p-8 flex flex-col justify-center relative overflow-hidden">
                
                {/* Internal grid lines */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808015_1px,transparent_1px),linear-gradient(to_bottom,#80808015_1px,transparent_1px)] bg-[size:20px_20px]" />
                
                {/* Header of mock terminal */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-emerald-800/60 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                    <span className="text-xs font-mono text-emerald-300 ml-2 font-medium">pipeline_verifier.py</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-900/80 px-2 py-0.5 rounded">STATUS: OK</span>
                </div>

                <div className="relative z-10 space-y-4">
                  {/* Mock Data Block 1: EXIF (Gentle Float) */}
                  <div className="animate-float-slow bg-emerald-900/90 border border-emerald-700/60 p-4 rounded-xl shadow-lg hover:border-emerald-500 transition-colors">
                    <div className="flex items-center justify-between text-[11px] text-emerald-400 font-mono mb-1">
                      <span className="flex items-center gap-1.5 font-bold">
                        <MapPin className="w-3 h-3 text-[#FF7F50]" /> EXIF_PARSER.JSON
                      </span>
                      <span className="text-emerald-300 text-[10px]">Verified Hash</span>
                    </div>
                    <div className="font-mono text-xs text-emerald-100 space-y-0.5">
                      <div>"lat": <span className="text-[#FFDAB9]">28.6139</span>, "lng": <span className="text-[#FFDAB9]">75.3842</span></div>
                      <div>"timestamp": <span className="text-emerald-200">"2024-09-14 08:32 IST"</span></div>
                    </div>
                  </div>
                  
                  {/* Mock Data Block 2: NASA API (Reverse Float) */}
                  <div className="animate-float-reverse bg-emerald-900/90 border border-emerald-700/60 p-4 rounded-xl shadow-lg hover:border-blue-400 transition-colors">
                    <div className="flex items-center justify-between text-[11px] text-[#ADD8E6] font-mono mb-1">
                      <span className="flex items-center gap-1.5 font-bold">
                        <CloudRain className="w-3 h-3 text-blue-400" /> NASA_POWER_API.RES
                      </span>
                      <span className="text-emerald-400 text-[10px]">200 OK</span>
                    </div>
                    <div className="font-mono text-xs text-white space-y-0.5">
                      <div>"rainfall_anomaly": <span className="text-emerald-300 font-semibold">+240% vs 10yr-avg</span></div>
                      <div>"event_type": <span className="text-blue-200">"Inundation / Cloudburst"</span></div>
                    </div>
                  </div>

                  {/* Mock Data Block 3: PMFBY Retrieval */}
                  <div className="animate-float-slow bg-emerald-900/90 border border-emerald-700/60 p-4 rounded-xl shadow-lg hover:border-purple-400 transition-colors">
                    <div className="flex items-center justify-between text-[11px] text-[#EE82EE] font-mono mb-1">
                      <span className="flex items-center gap-1.5 font-bold">
                        <Scale className="w-3 h-3 text-purple-400" /> PMFBY_GUIDELINE.TXT
                      </span>
                      <span className="text-purple-300 text-[10px]">Clause 15.3</span>
                    </div>
                    <div className="font-mono text-xs text-white">
                      "Mandatory joint inspection within 48h prior to claim rejection; 12% statutory interest applies."
                    </div>
                  </div>

                  {/* Final Verified Output Button */}
                  <div className="pt-2 flex justify-center">
                    <div className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center justify-between shadow-lg shadow-emerald-600/30">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                        DLMC-Ready Appeal Letter
                      </span>
                      <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded text-emerald-100 font-mono">100% Grounded</span>
                    </div>
                  </div>
                </div>

              </div>
            </PastelBorderCard>
          </div>

        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => {
  return (
    <footer className="bg-emerald-950 pt-16 pb-12 text-white border-t border-emerald-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-10 border-b border-emerald-900/80">
          
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-900 flex items-center justify-center text-white shadow-md">
                <Leaf className="w-5 h-5 text-emerald-100" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">Fasal<span className="text-emerald-400">Nyay</span></span>
            </div>
            <p className="text-emerald-200/70 text-sm max-w-sm text-center md:text-left">
              AI Evidence & Dispute Builder for PMFBY Crop Insurance Claims in India.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-emerald-200/80">
            <a href="#crisis" onClick={(e) => scrollToSection(e, 'crisis')} className="hover:text-white transition-colors">The Crisis</a>
            <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="hover:text-white transition-colors">How It Works</a>
            <a href="#trust-model" onClick={(e) => scrollToSection(e, 'trust-model')} className="hover:text-white transition-colors">Trust Model</a>
          </div>

        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-emerald-300/60">
          <p>© {new Date().getFullYear()} FasalNyay. Built for Devengers Hackathon.</p>
          <p>Empowering farmers with independently-verified meteorological & geospatial proof.</p>
        </div>
      </div>
    </footer>
  );
};

export default function Landingpage() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#FFDAB9] selection:text-emerald-950">
      <Navbar />
      <main>
        <HeroSection />
        <CrisisSection />
        <HowItWorksSection />
        <TrustModelSection />
      </main>
      <Footer />
    </div>
  );
}