import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Trophy } from "lucide-react";

export const metadata = {
    title: "Co-Curricular Activities - Vidyawadi",
    description: "Explore the vibrant co-curricular life at Vidyawadi, including sports, arts, and NCC.",
};

export default function CoCurricularPage() {
    return (
        <main className="min-h-screen bg-white">
            <Navbar />
            <section className="py-32 px-6 text-center">
                <div className="max-w-4xl mx-auto">
                    <Trophy className="w-16 h-16 text-oxford mx-auto mb-6" />
                    <h1 className="text-4xl md:text-6xl font-serif text-oxford mb-6">Co-Curricular Activities</h1>
                    <p className="text-xl text-gray-600 mb-12">
                        At Vidyawadi, we believe in holistic development. Our students excel not just in academics but also in sports, arts, and community service.
                    </p>
                    <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-gray-500 italic">Detailed content is coming soon.</p>
                    </div>
                </div>
            </section>
            <Footer />
        </main>
    );
}
