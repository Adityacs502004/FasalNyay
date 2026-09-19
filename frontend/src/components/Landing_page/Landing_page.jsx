import Navbar from './Navbar_and_components/Navbar';
import Hero_section from './Hero_content/Hero_section';
import Crisis_section from './Crisis_section/Crisis_section';
import How_it_works_section from './How_it_works/How_it_works_section';
import Trust_model_section from './Trust_model/Trust_model_section';
import Footer from './Last_section/Footer';

const Landing_page = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-[#FFDAB9] selection:text-emerald-950">
      <Navbar />
      <main>
        <Hero_section />
        <Crisis_section />
        <How_it_works_section />
        <Trust_model_section />
      </main>
      <Footer />
    </div>
  );
};

export default Landing_page;
