import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HostelSection from "@/components/HostelSection";
import HostelGallery from "@/components/HostelGallery";

export const metadata = {
    title: "Hostel - Vidyawadi",
    description: "Experience the safe, nurturing, and disciplined residential life at Vidyawadi Hostel.",
};

export default function HostelPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <HostelSection />
            <HostelGallery />
            <Footer />
        </main>
    );
}
