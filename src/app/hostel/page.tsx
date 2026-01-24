import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import React from "react";
import { Clock, CheckCircle2, Utensils } from "lucide-react";
import HostelGallery from "@/components/HostelGallery";

export const metadata = {
    title: "Hostel | Vidyawadi School",
    description: "Experience the home away from home at Vidyawadi Hostel. Discover our facilities, routine, and values."
};

export default function HostelPage() {
    return (
        <main className="min-h-screen bg-oxford text-white">
            <Navbar />

            {/* Hero / Intro */}
            <section className="pt-40 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl md:text-6xl font-bold text-sandstone mb-8">Vidyawadi Hostel</h1>
                    <div className="prose prose-invert max-w-none text-white/80 leading-relaxed text-lg space-y-6">
                        <p>
                            Hostel life is one of the most cherished time of a student’s life. Vidyawadi hostels are no exception to this reality. Each hostel in this institute provides each individual, ample opportunities to develop the art of living. The comfortable atmosphere, the air of geniality and joviality makes everyone feel at home. It is indeed a home away from home.
                        </p>
                        <p>
                            Hostel life revolves around discipline, duty and devotion. A very high standard of discipline is practiced. Infringement of discipline is viewed gravely by the hostel authorities. Students are expected to ensure that there is absolutely no lapse on their part on this count. Here girls feel themselves at the threshold of a complete new world to be explored.
                        </p>
                    </div>
                </div>
            </section>

            {/* Salient Features */}
            <section className="py-20 px-6 bg-white/5 border-y border-white/10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-sandstone mb-10 uppercase tracking-widest">Salient Features</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            "Promote harmony and co-operation amongst the boarders.",
                            "Provide boarders a peaceful and congenial environment to enable them to excel in studies and focus on personality development.",
                            "Develop discipline and the sense of responsibility among the students."
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-oxford p-8 rounded-3xl border border-white/10 hover:border-sandstone/50 transition-colors">
                                <CheckCircle2 className="text-sandstone mb-6" size={32} />
                                <p className="text-white/90 font-medium">{feature}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <HostelGallery />

            {/* Mess Details */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-6">
                            <Utensils className="text-sandstone" size={32} />
                            <h2 className="text-3xl font-bold text-white uppercase tracking-widest">Mess & Dining</h2>
                        </div>

                        <div className="space-y-6 text-white/80 leading-relaxed">
                            <p>
                                Mess serves <strong className="text-sandstone">JAIN food</strong>, cooked in total hygienic conditions, has a capacity to accommodate 400 children at a time.
                            </p>
                            <p>
                                Lunch and dinner comprise of rice, daal, chapatis, a green vegetable and a dry vegetable. Morning breakfast and afternoon snack consist of one dry item and another, a freshly cooked one. Children are served milk and biscuits at night.
                            </p>
                            <div className="bg-sandstone/10 p-6 rounded-xl border border-sandstone/20 mt-6">
                                <p className="font-bold text-sandstone text-sm uppercase tracking-wider">
                                    IMPORTANT NOTE
                                </p>
                                <p className="mt-2 text-white/90 text-sm">
                                    Items prohibited in 'Jainism', are neither offered nor allowed on the campus. All resident students are requested to adhere to this norm.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Quick Stats / Info Card */}
                    <div className="bg-white/5 p-10 rounded-3xl border border-white/10 space-y-8">
                        <div>
                            <h3 className="text-sandstone font-bold uppercase tracking-widest mb-2">Hostel Accommodation</h3>
                            <p className="text-4xl font-light text-white">700 Students</p>
                        </div>
                        <div>
                            <h3 className="text-sandstone font-bold uppercase tracking-widest mb-2">Office Timing</h3>
                            <p className="text-xl text-white">9:00 AM to 6:00 PM</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Routine */}
            <section className="py-20 px-6 bg-white/5 border-t border-white/10">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-3xl font-bold text-sandstone mb-10 text-center uppercase tracking-widest">Daily Routine</h2>

                    <div className="overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
                        <table className="w-full text-left border-collapse">
                            <tbody className="divide-y divide-white/10">
                                {/* Row 1 */}
                                <tr className="group hover:bg-white/5 transition-colors">
                                    <td className="p-6 md:p-8 w-1/3 align-top border-r border-white/10 text-sandstone font-bold">
                                        Wake up time
                                    </td>
                                    <td className="p-6 md:p-8 text-white/90">
                                        <div>5.45 am (Winter)</div>
                                        <div>5.30 am (Summer)</div>
                                    </td>
                                </tr>

                                {/* Row 2 */}
                                <tr className="group hover:bg-white/5 transition-colors">
                                    <td className="p-6 md:p-8 w-1/3 align-top border-r border-white/10 text-sandstone font-bold">
                                        Activity Slot 1
                                        <span className="block text-xs font-normal text-white/40 mt-1">Sports, Yoga, Dance, etc.</span>
                                    </td>
                                    <td className="p-6 md:p-8 text-white/90">
                                        <div>6.30 am to 7.30 am (Winter)</div>
                                        <div>6.00 am to 7.00 am (Summer)</div>
                                        <div className="mt-2 text-sm text-white/50 italic">Followed by breakfast and daily routine</div>
                                    </td>
                                </tr>

                                {/* Row 3 */}
                                <tr className="group hover:bg-white/5 transition-colors">
                                    <td className="p-6 md:p-8 w-1/3 align-top border-r border-white/10 text-sandstone font-bold">
                                        Afternoon Break
                                        <span className="block text-xs font-normal text-white/40 mt-1">Return from school</span>
                                    </td>
                                    <td className="p-6 md:p-8 text-white/90">
                                        <div>3.00 pm to 4.30 pm (Summer)</div>
                                        <div>3.30 pm to 4.30 pm (Winter)</div>
                                        <div className="mt-2 text-sm text-white/50 italic">Snacks and rest</div>
                                    </td>
                                </tr>

                                {/* Row 4 */}
                                <tr className="group hover:bg-white/5 transition-colors">
                                    <td className="p-6 md:p-8 w-1/3 align-top border-r border-white/10 text-sandstone font-bold">
                                        Skill Training
                                        <span className="block text-xs font-normal text-white/40 mt-1">Baking, Music, English etc.</span>
                                    </td>
                                    <td className="p-6 md:p-8 text-white/90">
                                        4.30 pm onwards
                                    </td>
                                </tr>

                                {/* Row 5 */}
                                <tr className="group hover:bg-white/5 transition-colors">
                                    <td className="p-6 md:p-8 w-1/3 align-top border-r border-white/10 text-sandstone font-bold">
                                        Evening Activities
                                        <span className="block text-xs font-normal text-white/40 mt-1">Sports, Karate, Nursery etc.</span>
                                    </td>
                                    <td className="p-6 md:p-8 text-white/90">
                                        5.30 pm to 6.30 pm
                                    </td>
                                </tr>

                                {/* Row 6 */}
                                <tr className="group hover:bg-white/5 transition-colors">
                                    <td className="p-6 md:p-8 w-1/3 align-top border-r border-white/10 text-sandstone font-bold">
                                        Evening Schedule
                                    </td>
                                    <td className="p-6 md:p-8 text-white/90">
                                        <ul className="space-y-2">
                                            <li className="flex items-center gap-3">
                                                <Clock size={16} className="text-sandstone" />
                                                <span>Dinner & free time until 7.20 pm</span>
                                            </li>
                                            <li className="flex items-center gap-3">
                                                <Clock size={16} className="text-sandstone" />
                                                <span>7.30 pm onwards prayer, silence and study until 10.30 pm</span>
                                            </li>
                                        </ul>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
