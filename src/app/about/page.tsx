import About from "@/components/sections/About";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Layout from "@/components/layout/Layout";

export default function Home() {
  return (
    <main>
        <Navbar/>
        <br /> <br />
        <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
        
            <About />
        
        </div>
        <Footer/>
    </main>

  );
}