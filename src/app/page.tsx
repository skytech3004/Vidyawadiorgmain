import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Stats from "@/components/Stats";
import Institutions from "@/components/Institutions";
import Facilities from "@/components/Facilities";
import Heritage from "@/components/Heritage";
import HostelSection from "@/components/HostelSection";
import Staff from "@/components/Staff";
import BlogSection from "@/components/BlogSection";
import Academics from "@/components/Academics";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import HomeNewsEvents from "@/components/HomeNewsEvents";
export default async function Home() {
  // Initialize DB table on first load
  // await initDB();

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <Institutions />
      <Facilities />
      <Heritage />
      <HomeNewsEvents />
      <HostelSection />
      <Staff />
      <BlogSection />
      <Academics />
      <ContactForm />
      <Footer />
    </main>
  );
}
