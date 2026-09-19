// Helper utility for smooth scrolling to anchor sections
export const scrollToSection = (e, targetId) => {
  if (e && e.preventDefault) {
    e.preventDefault();
  }
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
