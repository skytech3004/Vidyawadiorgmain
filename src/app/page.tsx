import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Institutions from "@/components/Institutions";
import Facilities from "@/components/Facilities";
import Heritage from "@/components/Heritage";
import HostelSection from "@/components/HostelSection";
import Staff from "@/components/Staff";
import BlogSection from "@/components/BlogSection";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import { initDB } from "@/lib/init-db";

export default async function Home() {
  // Initialize DB table on first load
  await initDB();

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Institutions />
      <Facilities />
      <Heritage />
      <HostelSection />
      <Staff />
      <BlogSection />
      <ContactForm />
      <Footer />
    </main>
  );
}
