'use client';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Layout from '@/components/layout/Layout';
import Contact from "@/components/sections/Contact";

export default function ContactUs() {
    return(
    <main>
        <Navbar/>
        <br /> <br />
        <div className="min-h-screen bg-linear-to-br from-white to-gray-50">
            <Contact />
        </div>
        <Footer/>
    </main>
    )
}