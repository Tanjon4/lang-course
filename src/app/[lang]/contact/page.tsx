'use client';
import Layout from '@/components/layout/BaseLayout';
import Contact from "@/components/sections/Contact";

export default function ContactUs() {
    return(
    <Layout>
        <br /> <br />
        <div className="min-h-screen bg-linear-to-br from-white to-gray-50">
            <Contact />
        </div>
    </Layout>
    )
}