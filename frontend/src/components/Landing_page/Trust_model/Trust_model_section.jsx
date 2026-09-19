import { ShieldCheck, MapPin, CloudRain, Scale, CheckCircle2 } from 'lucide-react';
import PastelBorderCard from '../ui/PastelBorderCard';
import useInView from '../hooks/useInView';

const Trust_model_section = () => {
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
              In legal disputes and insurance claims, unsupported statements destroy credibility. FasalNyay separates machine observations, external context, reported statements, and human-review needs.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-4 p-3 rounded-2xl hover:bg-white transition-colors duration-200">
                <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white shadow-sm border border-slate-200 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#FF7F50]" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-emerald-950 mb-0.5">Available EXIF Metadata</h4>
                  <p className="text-sm text-slate-600 leading-relaxed">Extracted directly with `exifr` when available. Metadata can support date and location review, but does not prove authenticity or rule out editing.</p>
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
                  <p className="text-sm text-slate-600 leading-relaxed">The AI receives curated PMFBY provisions from the official source and can cite only the references allowed by the backend.</p>
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
                      <span className="text-purple-300 text-[10px]">Para 16.14</span>
                    </div>
                    <div className="font-mono text-xs text-white">
                      "Admissible claims must follow stipulated timelines; applicable delayed-claim provisions may include 12% penal interest subject to guideline conditions."
                    </div>
                  </div>

                  {/* Final Verified Output Button */}
                  <div className="pt-2 flex justify-center">
                    <div className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-3 rounded-xl font-bold text-sm flex items-center justify-between shadow-lg shadow-emerald-600/30">
                      <span className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                        DLMC-Ready Appeal Letter
                      </span>
                      <span className="text-[11px] bg-white/20 px-2 py-0.5 rounded text-emerald-100 font-mono">Source-grounded</span>
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

export default Trust_model_section;
