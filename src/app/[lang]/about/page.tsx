import About from "@/components/sections/About";
import Layout from "@/components/layout/BaseLayout";

export default function Home() {
  return (
    <Layout>
        <br /> <br />
        <div className="min-h-screen bg-linear-to-br from-white to-gray-50">
        
            <About />
        
        </div>
    </Layout>

  );
}