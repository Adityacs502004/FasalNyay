import { ArrowRight, FileText, CheckCircle2, Scale } from 'lucide-react';
import { scrollToSection } from '../utils/scrollUtils';
import { useNavigate } from "react-router-dom";

const Hero_section = () => {

  const navigate = useNavigate();
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden">
      {/* Scenic agricultural crop background visible across hero */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <img 
          src="/crops-bg.jpg" 
          alt="Lush Indian agricultural crop field" 
          className="w-full h-full object-cover object-right lg:object-center opacity-70 filter brightness-[1.02] contrast-[1.05]"
        />
        {/* Soft gradient: pure clean readability on text side, vibrant natural crop landscape on the right */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/85 to-white/25 sm:to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-transparent to-white" />

        {/* Ambient glowing pastel orbs for modern agritech depth */}
        <div className="absolute top-[-5%] right-[-5%] w-[450px] h-[450px] rounded-full bg-gradient-to-br from-[#FFDAB9]/40 to-[#EE82EE]/30 blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-[5%] left-[-8%] w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#ADD8E6]/35 to-[#FF7F50]/25 blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 text-center lg:text-left">
            {/* Live Indicator Pill */}
            <div className="animate-fade-up inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-emerald-200/80 shadow-sm mb-6">
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
            <p className="animate-fade-up delay-200 text-lg sm:text-xl text-slate-700 max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed font-normal">
              Turn geotagged photos and independent NASA weather data into guideline-grounded appeal letters when your PMFBY claim is unfairly rejected or delayed.
            </p>

            {/* CTAs */}
            <div className="animate-fade-up delay-300 flex flex-col sm:flex-row justify-center lg:justify-start items-center gap-4">
              <button onClick={()=> navigate("/dashboard")}
                className="group relative w-full sm:w-auto p-[2px] rounded-2xl bg-gradient-to-r from-[#FFDAB9] via-[#FF7F50] via-[#EE82EE] to-[#ADD8E6] hover:shadow-xl hover:shadow-emerald-900/15 hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="bg-emerald-950 text-white px-7 py-3.5 rounded-2xl flex items-center justify-center gap-3 group-hover:bg-emerald-900 transition-colors">
                  <span className="text-base font-semibold">Start Your Appeal</span>
                  <ArrowRight className="w-5 h-5 text-[#FFDAB9] group-hover:translate-x-1.5 transition-transform duration-300" />
                </div>
              </button>

              <button 
                onClick={(e) => scrollToSection(e, 'trust-model')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-white/95 border border-emerald-200 text-emerald-900 font-semibold text-base hover:bg-emerald-50 hover:border-emerald-300 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <FileText className="w-4 h-4 text-emerald-600" />
                How Grounding Works
              </button>
            </div>

            {/* Quick trust badges */}
            <div className="animate-fade-up delay-400 mt-10 pt-6 border-t border-emerald-200/70 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-700 font-medium">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>EXIF GPS/Timestamp Review</span>
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

          {/* Hero Illustration / Plant Floating Graphic with Field Card */}
          <div className="animate-fade-up delay-300 lg:col-span-4 flex justify-center">
            <div className="relative w-72 sm:w-80 lg:w-full max-w-sm aspect-square flex items-center justify-center">
              {/* Pulsing background glow circle */}
              <div className="absolute inset-2 rounded-full bg-gradient-to-tr from-emerald-200/60 via-[#FFDAB9]/50 to-[#ADD8E6]/50 blur-2xl animate-pulse-glow" />
              
              {/* Outer decorative card with scenic crop field backdrop */}
              <div className="relative z-10 w-full h-full rounded-3xl border-2 border-emerald-100/90 bg-white/85 backdrop-blur-xl shadow-2xl p-6 flex flex-col items-center justify-between overflow-hidden">
                {/* Crop field background inside card */}
                <div className="absolute inset-0 z-0 opacity-50">
                  <img 
                    src="/crops-bg.jpg" 
                    alt="Crops field" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent" />
                </div>

                {/* Top mini geotag badge */}
                <div className="relative z-10 self-start px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-emerald-200/80 shadow-sm flex items-center gap-1.5 text-[11px] font-semibold text-emerald-900">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Verified Kharif Field</span>
                </div>

                {/* Floating Wheat Plant Image with gentle bob */}
                <div className="animate-float-slow relative z-10 my-auto">
                  <img 
                    src="/wheat-plant.png" 
                    alt="Wheat Crop Illustration" 
                    className="w-40 h-40 sm:w-44 sm:h-44 object-contain filter drop-shadow-xl"
                  />
                </div>

                {/* Floating live badge */}
                <div className="animate-float-reverse relative z-10 bg-emerald-950/95 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-xl shadow-lg border border-emerald-700/60 flex items-center gap-2">
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

export default Hero_section;
