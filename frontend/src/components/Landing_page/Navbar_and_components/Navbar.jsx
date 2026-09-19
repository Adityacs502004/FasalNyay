import { useState, useEffect } from 'react';
import { Leaf, ArrowRight, Menu, X } from 'lucide-react';
import { scrollToSection } from '../utils/scrollUtils';
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

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
            <div onClick={()=> navigate("/dashboard")} 
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
          <button type="button"
            onClick={() => {setIsOpen(false); navigate("/dashboard")}}
            className="w-full bg-emerald-950 text-white text-center py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-sm"
          >
            Start Your Appeal <ArrowRight className="w-4 h-4 text-[#FFDAB9]" />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
