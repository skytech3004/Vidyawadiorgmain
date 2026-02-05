import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeelaDeviContent from "../leela-devi-college/LeelaDeviContent";

export const metadata = {
    title: "Leeladevi Parasmal Sancheti Kanya Mahavidyalaya - Vidyawadi",
    description: "Empowering women through higher education at Leeladevi Parasmal Sancheti Kanya Mahavidyalaya.",
};

export default function LeelaDeviPage() {
    return (
        <main className="min-h-screen">
            <LeelaDeviContent />
        </main>
    );
}
