import { Sparkles, Clock, FileX2, Banknote } from 'lucide-react';
import useInView from '../hooks/useInView';
import useCountUp from '../hooks/useCountUp';

const Crisis_section = () => {
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

export default Crisis_section;
