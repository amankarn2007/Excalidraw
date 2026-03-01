import Footer from "./components/landing/Footer";
import Navbar from "./components/landing/Navbar";
import Section1 from "./components/landing/Section1";
import Section2 from "./components/landing/Section2";
import Section3 from "./components/landing/Section3";
import Section4 from "./components/landing/Section4";

export default function Home() {
  return (
    <div className="bg-white font-sans">
      <Navbar />
      <Main />
      <Footer />
    </div>
  );
}


function Main() {
  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
    </>
  )
}