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
import GallerySection from "@/components/GallerySection";
import AwardsSection from "@/components/AwardsSection";
import Script from "next/script";

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
      <HostelSection />

      <Facilities />
      <AwardsSection />
      <GallerySection />

      <Heritage />
      <HomeNewsEvents />
      {/* <Staff /> */}
      <BlogSection />
      {/* <Academics /> */}
      
    <section className="py-12 md:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 w-full">
        <div className="sk-ww-google-reviews" data-embed-id="25634352"></div>
        <Script
          src="https://widgets.sociablekit.com/google-reviews/widget.js"
          strategy="lazyOnload"
        />
      </div>
    </section>



      <ContactForm />
      <Footer />
    </main>
  );
}
