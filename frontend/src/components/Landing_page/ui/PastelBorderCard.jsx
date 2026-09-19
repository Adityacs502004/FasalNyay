// Reusable Pastel Border Card Wrapper with gentle hover transition
export const PastelBorderCard = ({ children, className = "", rounded = "rounded-2xl" }) => (
  <div className={`relative p-[2px] ${rounded} bg-gradient-to-br from-[#FFDAB9] via-[#FF7F50] to-[#ADD8E6] transition-all duration-300 hover:shadow-xl hover:shadow-emerald-950/5 ${className}`}>
    <div className={`bg-white w-full h-full ${rounded} overflow-hidden`}>
      {children}
    </div>
  </div>
);

export default PastelBorderCard;
