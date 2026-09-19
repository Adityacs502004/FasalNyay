import { MapPin, CloudRain, FileText } from 'lucide-react';
import PastelBorderCard from '../ui/PastelBorderCard';
import useInView from '../hooks/useInView';

const How_it_works_section = () => {
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
              Upload photos or documents. Our engine extracts available EXIF metadata and reports which capture details can or cannot be established.
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
              NASA POWER provides independent rainfall and temperature context near the selected district and incident date. Weather context does not by itself establish crop damage.
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
              The AI drafts a neutral review request from accepted evidence and curated PMFBY provisions, with limitations kept visible.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default How_it_works_section;
