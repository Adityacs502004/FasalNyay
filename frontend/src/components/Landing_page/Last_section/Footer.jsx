import { Leaf } from 'lucide-react';
import { scrollToSection } from '../utils/scrollUtils';

const Footer = () => {
  return (
    <footer className="bg-emerald-950 pt-16 pb-12 text-white border-t border-emerald-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pb-10 border-b border-emerald-900/80">
          
          {/* Logo & Description */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={(e) => scrollToSection(e, 'home')}>
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

export default Footer;
