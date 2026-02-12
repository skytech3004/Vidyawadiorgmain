"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    BookOpen, Trophy, School, Users, Star, Microscope,
    Medal, Phone, MapPin, Globe, CheckCircle2, GraduationCap,
    Mail, HeartPulse, Library, Dumbbell, Monitor, Utensils,
    Music, Bus, Search, Filter, Clock, Award, ChevronRight,
    ArrowRight, X
} from "lucide-react";
import Link from "next/link";
import coursesData from "@/data/courses.json";

const categories = [
    { name: "All Courses", slug: "all" },
    { name: "Undergraduate (UG)", slug: "ug" },
    { name: "Postgraduate (PG)", slug: "pg" },
    { name: "Skill Courses", slug: "skill" },
];

const labsData = [
    {
        "id": 1,
        "name": "Chemistry Laboratory",
        "slug": "chemistry",
        "icon": "🧪",
        "gradient": "from-red-500 to-orange-500",
        "description": "A well-equipped and student-friendly facility designed to support teaching and learning in inorganic, organic, and physical chemistry.",
        "fullDescription": "The Chemistry Laboratory of Leela Devi Parasmal Sancheti Kanya Mahavidyalaya is a well-equipped and student-friendly facility designed to support teaching and learning in inorganic, organic, and physical chemistry. The laboratory provides a safe and enriched environment where students can practically explore the fundamental principles of chemical science. Equipped with high-quality glassware, analytical balances, heating mantles, distillation units, colorimeters, and pH meters, the laboratory enables students to conduct a wide variety of experiments with precision. Adequate storage systems, fume hoods, and safety devices such as fire extinguishers, first-aid kits, and proper ventilation ensure a secure working environment. Practical sessions are structured to develop students' analytical abilities, experimental skills, and scientific temper. From basic qualitative and quantitative analysis to complex synthesis and titration procedures, the laboratory provides hands-on experience that strengthens conceptual understanding. The laboratory also houses reference charts, models, safety guidelines, and access to chemical databases to encourage self-learning. Faculty members and lab assistants offer continuous guidance, ensuring adherence to safety protocols and scientific ethics. Regular maintenance and stock updates keep the laboratory fully functional throughout the academic year. The space is also used for project work, demonstrations, and skill-based learning activities that enhance students' preparedness for higher education and competitive examinations. Overall, the Chemistry Laboratory plays a crucial role in fostering scientific inquiry, accuracy, and problem-solving skills, enabling students to gain confidence in laboratory practices and pursue careers in science with strong foundational knowledge.",
        "keyFeatures": [
            "High-quality glassware and analytical balances",
            "Heating mantles, distillation units, colorimeters, and pH meters",
            "Fume hoods and safety devices (fire extinguishers, first-aid kits)",
            "Proper ventilation and adequate storage systems",
            "Reference charts, models, and chemical databases",
            "Project work and skill-based learning activities"
        ],
        "activities": "Qualitative and quantitative analysis, complex synthesis, titration procedures, and hands-on experiments that strengthen conceptual understanding.",
        "impact": "Fosters scientific inquiry, accuracy, and problem-solving skills, enabling students to gain confidence in laboratory practices and pursue careers in science with strong foundational knowledge."
    },
    {
        "id": 2,
        "name": "Botany Laboratory",
        "slug": "botany",
        "icon": "🌱",
        "gradient": "from-green-500 to-emerald-500",
        "description": "A dynamic space designed to explore the vast diversity of the plant world with modern instruments and botanical resources.",
        "fullDescription": "The Botany Laboratory of Leela Devi Parasmal Sancheti Kanya Mahavidyalaya is a dynamic space designed to explore the vast diversity of the plant world. Equipped with compound and dissecting microscopes, microtomes, plant specimens, herbarium sheets, permanent slides, botanical charts, and modern instruments, the laboratory supports comprehensive learning in plant anatomy, taxonomy, physiology, ecology, and economic botany. The facility provides students with direct exposure to plant structures and processes through hands-on experiments and microscopic observations. A well-maintained botanical garden complements the laboratory by offering live plant material for study. Students engage in activities such as specimen collection, herbarium preparation, germination studies, and biochemical tests. The laboratory fosters scientific curiosity by encouraging exploration of plant adaptations, environmental interactions, and ecological balance. The workspace is organized to ensure smooth conduct of practical sessions, with provision for safe storage of chemicals and equipment. Faculty members guide students in conducting experiments with precision, maintaining laboratory notebooks, and understanding the scientific relevance of each activity. Reference books, charts, and digital resources further enrich their learning experience. The Botany Laboratory serves as a foundation for advanced study in life sciences and research oriented learning. It nurtures awareness of biodiversity conservation and promotes environmental responsibility among students. Through its practical orientation and supportive environment, the laboratory helps students develop observational skills, scientific reasoning, and a deep appreciation for the plant kingdom.",
        "keyFeatures": [
            "Compound and dissecting microscopes",
            "Microtomes and plant specimens",
            "Herbarium sheets and permanent slides",
            "Botanical charts and modern instruments",
            "Well-maintained botanical garden",
            "Safe storage for chemicals and equipment"
        ],
        "activities": "Specimen collection, herbarium preparation, germination studies, biochemical tests, and microscopic observations of plant structures.",
        "impact": "Nurtures awareness of biodiversity conservation and promotes environmental responsibility. Develops observational skills, scientific reasoning, and deep appreciation for the plant kingdom."
    },
    {
        "id": 3,
        "name": "Zoology Laboratory",
        "slug": "zoology",
        "icon": "🔬",
        "gradient": "from-blue-500 to-cyan-500",
        "description": "An excellent platform for the scientific study of animal life with comprehensive resources for hands-on learning.",
        "fullDescription": "The Zoology Laboratory at Leela Devi Parasmal Sancheti Kanya Mahavidyalaya provides an excellent platform for the scientific study of animal life. It is equipped with microscopes, prepared slides, dissecting instruments, models, charts, museum specimens, and audiovisual resources that support learning in anatomy, physiology, taxonomy, cell biology, genetics, and ecology. The laboratory is designed to offer students hands-on experience that strengthens their theoretical understanding through direct observation and experimentation. Students engage in activities such as microscopic examination of tissues, study of animal diversity, slide preparation, dissections (where applicable), and physiological experiments. The laboratory also houses well-preserved specimens representing major animal groups, enabling learners to gain insight into comparative anatomy and evolutionary relationships. Hygienic and ethical practices are strictly followed during all activities. Safety is a top priority, with proper workspaces, ventilation, first-aid facilities, and guidelines for instrument handling. Faculty members ensure that students conduct experiments responsibly while developing skills in data collection, analysis, and scientific documentation. The laboratory encourages critical thinking by integrating project work, field visits, and interactive demonstrations. Students learn to appreciate ecological balance, wildlife conservation, and the significance of animal studies in human welfare. Through practical training, learners build a strong foundation for careers in life sciences, biotechnology, education, and research. The Zoology Laboratory, through its comprehensive resources and academic support, plays a vital role in shaping students into knowledgeable and skilled young biologists.",
        "keyFeatures": [
            "Microscopes and prepared slides",
            "Dissecting instruments and models",
            "Museum specimens and charts",
            "Audiovisual resources",
            "Well-preserved specimens of major animal groups",
            "Proper ventilation and first-aid facilities"
        ],
        "activities": "Microscopic examination of tissues, study of animal diversity, slide preparation, dissections, physiological experiments, and comparative anatomy studies.",
        "impact": "Builds strong foundation for careers in life sciences, biotechnology, education, and research. Promotes appreciation for ecological balance and wildlife conservation."
    },
    {
        "id": 4,
        "name": "Physics Laboratory",
        "slug": "physics",
        "icon": "⚛️",
        "gradient": "from-purple-500 to-pink-500",
        "description": "A well-organized facility enabling students to explore principles of classical and modern physics through experiment-based learning.",
        "fullDescription": "The Physics Laboratory of Leela Devi Parasmal Sancheti Kanya Mahavidyalaya is a well-organized facility that enables students to explore the principles of classical and modern physics through experiment-based learning. The laboratory is equipped with high-quality instruments such as optical benches, galvanometers, voltmeters, ammeters, vernier calipers, micrometers, spectrometers, potentiometers, pendulums, and various electrical, optical, and mechanical apparatus used for standard undergraduate experiments. The environment encourages precision, observation, and analytical thinking. Students conduct experiments in mechanics, electricity, magnetism, optics, electronics, and thermodynamics. Through these activities, they develop essential laboratory skills such as error analysis, data interpretation, and scientific reporting. The structured practical sessions complement classroom teaching, helping students connect theoretical concepts with real-world applications. Safety measures including insulated wiring, safety charts, fire extinguishers, and well-ventilated workspaces ensure a secure laboratory experience. The faculty provides guidance on instrument handling, experimental setup, calibration, and interpretation of results, encouraging students to think logically and critically. The laboratory is also used for project-based learning and demonstrations of innovative scientific phenomena. This fosters creativity and strengthens problem-solving abilities, preparing students for higher studies in physics, engineering, and related fields. Overall, the Physics Laboratory plays a vital role in nurturing scientific temper, promoting curiosity, and enhancing technical competence. Its systematic approach to practical education ensures that students gain confidence in experimentation and develop a strong foundational understanding of physical science.",
        "keyFeatures": [
            "Optical benches and spectrometers",
            "Galvanometers, voltmeters, and ammeters",
            "Vernier calipers and micrometers",
            "Potentiometers and pendulums",
            "Electrical, optical, and mechanical apparatus",
            "Insulated wiring and safety charts"
        ],
        "activities": "Experiments in mechanics, electricity, magnetism, optics, electronics, and thermodynamics. Error analysis, data interpretation, and scientific reporting.",
        "impact": "Nurtures scientific temper, promotes curiosity, and enhances technical competence. Prepares students for higher studies in physics, engineering, and related fields."
    },
    {
        "id": 5,
        "name": "Geography Laboratory",
        "slug": "geography",
        "icon": "🌍",
        "gradient": "from-teal-500 to-green-500",
        "description": "Essential facility supporting practical learning in physical, human, and environmental geography with modern tools.",
        "fullDescription": "The Geography Laboratory at Leela Devi Parasmal Sancheti Kanya Mahavidyalaya is an essential facility that supports practical learning in physical, human, and environmental geography. It is equipped with topographical maps, aerial photographs, satellite imagery, tracing tables, weather instruments, survey equipment, GIS resources, globes, models, atlases, and thematic charts that enable students to understand spatial patterns and geographical concepts effectively. Students engage in activities such as map reading, contour interpretation, landform analysis, and weather data recording, and surveying techniques using instruments like plane tables, compasses, and clinometers. The laboratory also introduces students to modern tools such as GIS and remote sensing, enhancing their technical proficiency and spatial analytical skills. The environment encourages hands-on exploration, critical observation, and interpretation of geographical information. Faculty mentors ensure that students learn practical skills such as map drawing, data representation, field survey methods, and preparation of geographical reports. The laboratory also supports fieldwork, a significant component of geography education, by helping students analyze environmental conditions and human-land interactions. Safety, cleanliness, and proper equipment storage are maintained to ensure smooth and effective functioning. The lab promotes environmental awareness by encouraging students to study climate patterns, soil characteristics, natural resource distribution, and sustainable development issues. Through its comprehensive resources and activity-based learning approach, the Geography Laboratory enhances students' conceptual clarity, research aptitude, and understanding of the dynamic relationship between people and their environment.",
        "keyFeatures": [
            "Topographical maps and aerial photographs",
            "Satellite imagery and GIS resources",
            "Weather instruments and survey equipment",
            "Plane tables, compasses, and clinometers",
            "Globes, models, and atlases",
            "Modern GIS and remote sensing tools"
        ],
        "activities": "Map reading, contour interpretation, landform analysis, weather data recording, surveying techniques, and field survey methods.",
        "impact": "Enhances conceptual clarity, research aptitude, and understanding of the dynamic relationship between people and their environment. Promotes environmental awareness."
    },
    {
        "id": 6,
        "name": "Home Science Laboratory",
        "slug": "home-science",
        "icon": "🏠",
        "gradient": "from-pink-500 to-rose-500",
        "description": "Multifunctional space supporting training in nutrition, food science, clothing, textiles, and resource management.",
        "fullDescription": "The Home Science Laboratory of Leela Devi Parasmal Sancheti Kanya Mahavidyalaya is a multifunctional space that supports training in nutrition, food science, clothing and textiles, human development, and resource management. The laboratory is equipped with modern kitchen appliances, weighing scales, cooking tools, sewing machines, measuring instruments, fabric samples, nutrition charts, and child development materials that enable hands-on learning. Students participate in activities such as food preparation, nutritional assessment, diet planning, textile testing, garment construction, interior decoration exercises, and creative craftwork. These practical experiences strengthen students' understanding of health, hygiene, family resource management, and scientific cooking methods. The laboratory emphasizes safety, with proper ventilation, fire extinguishers, and hygienic workstations. Through guided practical sessions, students learn essential life skills, technical processes, and scientific principles that build confidence and self-reliance. Faculty members provide continuous support in conducting experiments, using instruments correctly, and maintaining laboratory records. The laboratory also encourages innovation through project work such as recipe development, nutritional surveys, fabric analysis, and design activities. Students gain exposure to real-life applications, preparing them for fields such as nutrition, childcare, fashion design, home management, and social service. The Home Science Laboratory fosters creativity, critical thinking, and problem-solving abilities, making it a vital component of holistic education. It empowers students with knowledge and practical experience essential for personal development and professional growth.",
        "keyFeatures": [
            "Modern kitchen appliances and cooking tools",
            "Weighing scales and measuring instruments",
            "Sewing machines and fabric samples",
            "Nutrition charts and diet planning resources",
            "Child development materials",
            "Proper ventilation and fire extinguishers"
        ],
        "activities": "Food preparation, nutritional assessment, diet planning, textile testing, garment construction, interior decoration, and creative craftwork.",
        "impact": "Empowers students with knowledge and practical experience essential for personal development and professional growth in nutrition, childcare, fashion design, and home management."
    },
    {
        "id": 7,
        "name": "Music Laboratory",
        "slug": "music",
        "icon": "🎵",
        "gradient": "from-indigo-500 to-purple-500",
        "description": "A vibrant space that nurtures creativity, rhythm, and musical expression with classical and contemporary instruments.",
        "fullDescription": "The Music Laboratory at Leela Devi Parasmal Sancheti Kanya Mahavidyalaya is a vibrant space that nurtures creativity, rhythm, and musical expression. The lab is equipped with classical and contemporary musical instruments including harmoniums, tablas, tanpuras, keyboards, and percussion instruments. Audio systems, microphones, practice modules, and digital tools support both theoretical and practical training in vocal and instrumental music. Students explore classical ragas, folk traditions, notation systems, rhythm patterns, and performance techniques. The laboratory environment encourages practice, experimentation, and artistic growth. Sessions include individual training, group rehearsals, and performance-based activities that help students improve vocal clarity, rhythm sense, and instrumental skills. The laboratory is acoustically arranged to provide a conducive space for music learning. Faculty members guide students in mastering techniques, understanding musical theory, and developing stage confidence. Recordings and digital resources are used to help learners analyze performances and refine their musical abilities. Workshops, demonstrations, and cultural events further enhance the learning experience by exposing students to diverse musical traditions and professional artistry. The lab also encourages participation in college events, competitions, and community programs. Through its creative environment and strong academic foundation, the Music Laboratory fosters cultural appreciation, artistic expression, and holistic development. It plays a key role in shaping confident performers, informed musicians, and culturally enriched individuals.",
        "keyFeatures": [
            "Harmoniums, tablas, and tanpuras",
            "Keyboards and percussion instruments",
            "Audio systems and microphones",
            "Practice modules and digital tools",
            "Acoustically arranged space",
            "Recording and playback facilities"
        ],
        "activities": "Classical ragas, folk traditions, notation systems, rhythm patterns, performance techniques, individual training, and group rehearsals.",
        "impact": "Fosters cultural appreciation, artistic expression, and holistic development. Shapes confident performers, informed musicians, and culturally enriched individuals."
    },
    {
        "id": 8,
        "name": "Fine Arts Laboratory",
        "slug": "fine-art",
        "icon": "🎨",
        "gradient": "from-yellow-500 to-orange-500",
        "description": "A creative hub designed to support artistic expression and skill development with diverse art materials.",
        "fullDescription": "The Fine Arts Laboratory of Leela Devi Parasmal Sancheti Kanya Mahavidyalaya is a creative hub designed to support artistic expression and skill development. The laboratory is equipped with drawing boards, easels, painting materials, craft tools, sculpting resources, color media, and display facilities that allow students to work with diverse art forms. Students engage in activities such as sketching, painting, clay modeling, fabric arts, craftwork, design projects, and mixed-media compositions. The environment encourages imagination and experimentation, enabling learners to explore various techniques and develop their unique artistic style. Wall displays, sample works, and reference materials further inspire creativity. Faculty mentors provide personalized guidance, helping students understand concepts such as color theory, composition, shading, texture, and aesthetic balance. The laboratory also offers opportunities for project-based learning, exhibitions, and collaborative artwork that enhance confidence and communication skills. The lab is maintained with cleanliness, proper lighting, and organized storage, ensuring a comfortable and productive workspace. Students are encouraged to think critically, observe their surroundings, and translate ideas into visual forms. Through practical engagement, the Fine Arts Laboratory helps students develop artistic sensitivity, technical proficiency, and appreciation for visual culture. It plays a significant role in nurturing creative professionals and enriching the cultural environment of the college.",
        "keyFeatures": [
            "Drawing boards and easels",
            "Painting materials and color media",
            "Craft tools and sculpting resources",
            "Display facilities and wall exhibitions",
            "Proper lighting and organized storage",
            "Reference materials and sample works"
        ],
        "activities": "Sketching, painting, clay modeling, fabric arts, craftwork, design projects, and mixed-media compositions.",
        "impact": "Develops artistic sensitivity, technical proficiency, and appreciation for visual culture. Nurtures creative professionals and enriches the cultural environment."
    },
    {
        "id": 9,
        "name": "ICT Laboratory",
        "slug": "ict",
        "icon": "💻",
        "gradient": "from-blue-600 to-indigo-600",
        "description": "Modern digital learning space supporting computer education and technological skill development.",
        "fullDescription": "The ICT Laboratory of Leela Devi Parasmal Sancheti Kanya Mahavidyalaya is a modern digital learning space that supports computer education and technological skill development. The lab is equipped with updated desktop systems, internet connectivity, projectors, educational software, and printers, enabling students to gain hands-on experience with essential ICT tools and applications. Students learn computer fundamentals, office automation, data handling, digital literacy, internet research, and basic programming skills. The laboratory enhances their understanding of modern technologies such as cloud tools, e-learning platforms, digital communication, and information management systems. The spacious, well-ventilated lab environment allows every learner individual access to computers. Regular maintenance ensures uninterrupted performance. Trained faculty members guide students through practical sessions, emphasize responsible digital behavior, and promote cyber-awareness. ICT skills are integrated across various disciplines to support research, presentations, and project based learning. The lab also provides access to online educational resources through platforms like DELNET, enhancing academic engagement. The ICT Laboratory plays a vital role in preparing students for a technology-driven world. It helps them develop digital competence, problem-solving abilities, and confidence in using modern tools, making it an essential component of contemporary education.",
        "keyFeatures": [
            "Updated desktop systems",
            "High-speed internet connectivity",
            "Projectors and educational software",
            "Printers and scanning facilities",
            "Access to DELNET and online resources",
            "Spacious, well-ventilated environment"
        ],
        "activities": "Computer fundamentals, office automation, data handling, digital literacy, internet research, basic programming, and cloud tools.",
        "impact": "Prepares students for a technology-driven world. Develops digital competence, problem-solving abilities, and confidence in using modern tools."
    },
    {
        "id": 10,
        "name": "Psychology Laboratory",
        "slug": "psychology",
        "icon": "🧠",
        "gradient": "from-violet-500 to-purple-500",
        "description": "Interactive space to understand human behavior through scientific methods and psychological assessments.",
        "fullDescription": "The Psychology Laboratory at Leela Devi Parasmal Sancheti Kanya Mahavidyalaya provides students an interactive space to understand human behavior through scientific methods. It is equipped with psychological tests, personality inventories, aptitude scales, reaction time apparatus, memory instruments, perceptual tools, and audio-visual resources for conducting experiments. Students learn to administer, score, and interpret psychological assessments related to intelligence, personality, learning, motivation, attention, and mental processes. Activities include experiments on memory, problem-solving, motor skills, sensory perception, and emotional responses. These experiences help students connect theoretical concepts with real-life human behavior. The laboratory is arranged to ensure privacy, concentration, and ethical conduct during assessments. Faculty members guide students in research methodology, data analysis, and report writing, emphasizing confidentiality and professional ethics. Through project work, case studies, and demonstrations, the lab encourages critical thinking and scientific inquiry. Students gain confidence in understanding psychological processes and develop skills useful for careers in education, counseling, social work, and human resource management. The Psychology Laboratory provides a foundation for exploring mental functions through structured and engaging activities. It nurtures empathy, observational skills, and analytical abilities, making it an integral part of the academic and personal development of students.",
        "keyFeatures": [
            "Psychological tests and personality inventories",
            "Aptitude scales and reaction time apparatus",
            "Memory instruments and perceptual tools",
            "Audio-visual resources",
            "Privacy-focused assessment areas",
            "Research methodology resources"
        ],
        "activities": "Intelligence testing, personality assessment, memory experiments, problem-solving tasks, sensory perception studies, and emotional response analysis.",
        "impact": "Nurtures empathy, observational skills, and analytical abilities. Prepares students for careers in education, counseling, social work, and human resource management."
    }
];

export default function LeelaDeviContent() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [showAll, setShowAll] = useState(false);
    const [selectedLab, setSelectedLab] = useState<any>(null);

    const filteredCourses = useMemo(() => {
        return coursesData.courses.filter((course: any) => {
            const matchesSearch = course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                course.degree.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesCategory = selectedCategory === "all" || course.category.slug === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, selectedCategory]);

    const displayedCourses = showAll ? filteredCourses : filteredCourses.slice(0, 6);

    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative pt-40 pb-20 px-6 bg-oxford/90 text-white overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-sandstone/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row gap-8 items-center mb-10"
                    >
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-sandstone overflow-hidden bg-white shrink-0">
                            <img src="/leeladevi.jpg" alt="Leela Devi College Logo" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <span className="text-sandstone font-bold uppercase tracking-widest text-sm mb-4 block">A Premier Women’s College in Western Rajasthan</span>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight">
                                Leela Devi Parasmal Sancheti Kanya Mahavidyalaya
                            </h1>
                            <div className="flex flex-wrap gap-4 items-center text-white/80">
                                <div className="px-4 py-1.5 bg-sandstone/20 rounded-full border border-sandstone/30 text-sandstone font-bold text-sm uppercase">
                                    NAAC B++ Grade
                                </div>
                                <div className="px-4 py-1.5 bg-white/10 rounded-full border border-white/20 text-white font-bold text-sm uppercase">
                                    Affiliated to JNVU
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="grid md:grid-cols-3 gap-8 text-sm font-medium text-white/80 border-t border-white/10 pt-10"
                    >
                        <div className="flex items-start gap-3">
                            <MapPin className="text-sandstone shrink-0" size={20} />
                            <span>Vidyawadi, Khimel – Station Rani,<br />Dist. Pali, Rajasthan – 306115, India.</span>
                        </div>
                        <div className="flex items-start gap-3">
                            <Phone className="text-sandstone shrink-0" size={20} />
                            <div className="flex flex-col">
                                <a href="tel:+918764185993" className="hover:text-sandstone transition-colors">+91-8764185993</a>
                                <a href="tel:+916377204208" className="hover:text-sandstone transition-colors">+91-63772-04208</a>
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <Mail className="text-sandstone shrink-0" size={20} />
                            <a href="mailto:ldpsvidhyawadi@gmail.com" className="hover:text-sandstone transition-colors">ldpsvidhyawadi@gmail.com</a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1"
                    >
                        <div className="relative">
                            <img src="/lps.jpg" alt="College Campus" className="rounded-3xl shadow-2xl relative z-10" />
                            <div className="absolute -top-6 -left-6 w-full h-full border-2 border-sandstone rounded-3xl -z-10" />
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-oxford/5 rounded-full -z-10 blur-2xl" />
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-oxford mb-6">About the College</h2>
                        <div className="prose text-gray-600 leading-relaxed space-y-4">
                            <p>
                                Leela Devi Parasmal Sancheti Kanya Mahavidyalaya is a women-only higher education institution managed by <b>Marudhar Mahila Shikshan Sangh,Vidyawadi </b>.
                                Established to empower girls in academics, leadership, and career preparedness, we provide a transformative learning experience.
                            </p>
                            <p>
                                Our institution is affiliated with **Jai Narain Vyas University (JNVU), Jodhpur**, and is recognized by the University Grants Commission (UGC).
                                We are proud to hold a **NAAC B++ grade** (valid through March 2028), reflecting our commitment to quality education.
                            </p>
                            <div className="pt-6 grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <p className="text-xs font-bold text-sandstone uppercase mb-1">Accreditation</p>
                                    <p className="text-lg font-bold text-oxford">NAAC B++</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                                    <p className="text-xs font-bold text-sandstone uppercase mb-1">Type</p>
                                    <p className="text-lg font-bold text-oxford">Women Only</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* University Toppers Section */}
            <section className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-sandstone-dark font-black uppercase tracking-[0.2em] text-xs mb-3 block"
                        >
                            Academic Toppers
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-black text-oxford mt-2"
                        >
                            University Topper
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-gray-500 mt-4 max-w-2xl mx-auto font-medium"
                        >
                            Celebrating the academic excellence and hard work of our students who achieved the highest honors at the university level.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Ratan Rathore",
                                father: "Shri Mahaveer Singh Rathore (Jalap, Barmer)",
                                course: "Bachelor of Arts, 2013",
                                result: "First (Gold Medalist)"
                            },
                            {
                                name: "Anjali Rathore",
                                father: "Shri Dheerendra Singh Rathore (Malari, Bali)",
                                course: "Bachelor of Arts, 2014",
                                result: "First (Gold Medalist)"
                            },
                            {
                                name: "Ankita Kumari Jain",
                                father: "Shri Sohanraj Ji (Ana)",
                                course: "Bachelor of Science, 2018",
                                result: "First (Gold Medalist)"
                            },
                            {
                                name: "Ankita Rajpurohit",
                                father: "Shri Mangilal Ji Rajpurohit (Mada)",
                                course: "Bachelor of Commerce, 2018",
                                result: "First (Gold Medalist)"
                            },
                            {
                                name: "Sanju Kanwar",
                                father: "Amar Singh (Shri Sela)",
                                course: "B.Sc., B.Ed., 2022",
                                result: "First (Gold Medalist)"
                            },
                            {
                                name: "Gracy Soni",
                                father: "Naresh Kumar Soni (Dhola Sasan)",
                                course: "Bachelor of Commerce, 2024",
                                result: "First (Gold Medalist)"
                            }
                        ].map((topper, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-gray-50 rounded-[2.5rem] p-8 hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-sandstone/20"
                            >
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-20 h-20 rounded-full bg-sandstone/10 flex items-center justify-center shrink-0 group-hover:bg-sandstone group-hover:text-oxford transition-all duration-300">
                                        <div className="w-16 h-16 rounded-full overflow-hidden flex items-center justify-center bg-gray-200">
                                            {/* SVG Placeholder for Topper Image */}
                                            <svg className="w-full h-full text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Trophy size={14} className="text-sandstone" fill="currentColor" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-sandstone">Gold Medalist</span>
                                        </div>
                                        <h3 className="text-xl font-black text-oxford leading-tight group-hover:text-sandstone transition-colors">
                                            {topper.name}
                                        </h3>
                                    </div>
                                </div>

                                <div className="space-y-4 relative z-10">
                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                                            <Users size={12} className="text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Daughter of</p>
                                            <p className="text-sm font-semibold text-oxford/70 truncate">{topper.father}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                                            <School size={12} className="text-gray-400" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Program & Batch</p>
                                            <p className="text-sm font-semibold text-oxford/70">{topper.course}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                                            <Medal size={12} className="text-sandstone" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Achievement</p>
                                            <p className="text-sm font-black text-sandstone uppercase tracking-tight">{topper.result}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="absolute top-6 right-8 text-oxford/5 font-black text-7xl select-none group-hover:text-sandstone/10 transition-colors">
                                    {i + 1}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Academic Programs - DYNAMIC SECTION */}
            <section className="py-24 px-6 bg-gray-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-sandstone font-bold uppercase tracking-widest text-sm"
                        >
                            Academic Programs
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-3xl md:text-5xl font-black text-oxford mt-2"
                        >
                            Courses Offered
                        </motion.h2>
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="mt-4"
                        >
                            <a
                                href="https://vidyawadicollege.org/courses"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sandstone font-bold hover:text-sandstone-dark transition-colors"
                            >
                                <Globe size={18} />
                                Visit Official Course Portal
                            </a>
                        </motion.div>
                    </div>

                    {/* Integrated Filters & Search */}
                    <div className="mb-12 space-y-8">
                        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
                            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                {categories.map((cat) => (
                                    <button
                                        key={cat.slug}
                                        onClick={() => { setSelectedCategory(cat.slug); setShowAll(false); }}
                                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${selectedCategory === cat.slug
                                            ? "bg-oxford text-white shadow-lg scale-105"
                                            : "bg-white text-gray-600 border border-gray-200 hover:border-sandstone"
                                            }`}
                                    >
                                        {cat.name}
                                    </button>
                                ))}
                            </div>

                            <div className="relative w-full lg:w-80 group">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-sandstone transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search degrees..."
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setShowAll(false); }}
                                    className="w-full bg-white border border-gray-200 rounded-full py-3.5 pl-12 pr-6 outline-none focus:ring-2 focus:ring-sandstone/20 focus:border-sandstone transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Dynamic Course Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <AnimatePresence mode="popLayout">
                            {displayedCourses.map((course: any, i: number) => (
                                <motion.div
                                    layout
                                    key={course.slug}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.3 }}
                                    className="group bg-white rounded-[2rem] border border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
                                >
                                    <div className="p-8 pb-0">
                                        <div className="flex justify-between items-start mb-6">
                                            <div className="w-12 h-12 rounded-2xl bg-oxford/5 flex items-center justify-center text-oxford group-hover:bg-oxford group-hover:text-white transition-all duration-300">
                                                <GraduationCap size={24} />
                                            </div>
                                            <span className="px-3 py-1 bg-sandstone/10 border border-sandstone/20 text-sandstone-dark text-[10px] font-black uppercase tracking-widest rounded-full">
                                                {course.category.name}
                                            </span>
                                        </div>
                                        <h3 className="text-xl font-bold text-oxford mb-2 group-hover:text-sandstone transition-colors min-h-[3.5rem] line-clamp-2">
                                            {course.name}
                                        </h3>
                                        <p className="text-sm text-gray-500 font-medium mb-6">
                                            {course.facultyDepartment}
                                        </p>
                                    </div>
                                    <div className="p-8 pt-0 flex-grow">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                                <Clock className="text-sandstone" size={16} />
                                                <span>Duration: <span className="font-bold text-oxford">{course.duration || "Contact for info"}</span></span>
                                            </div>
                                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                                <Award className="text-sandstone" size={16} />
                                                <span>Fees: <span className="font-bold text-oxford">{course.fees.total}</span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-8 pt-0 mt-auto">
                                        <Link
                                            href={course.externalLink || `/courses/${course.id || course.slug}`}
                                            target={course.externalLink ? "_blank" : "_self"}
                                            className="inline-flex items-center gap-2 text-oxford font-black text-xs uppercase tracking-widest hover:gap-4 transition-all"
                                        >
                                            View Details
                                            <ChevronRight size={16} className="text-sandstone" />
                                        </Link>
                                    </div>
                                    <div className="h-1.5 w-0 group-hover:w-full bg-sandstone transition-all duration-500" />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    {/* Show More / View All */}
                    {filteredCourses.length > 6 && !showAll && (
                        <div className="mt-16 text-center">
                            <button
                                onClick={() => setShowAll(true)}
                                className="inline-flex items-center gap-3 px-10 py-4 bg-oxford text-white rounded-full font-black text-xs uppercase tracking-widest shadow-2xl hover:bg-sandstone hover:text-oxford transition-all group"
                            >
                                Show All {filteredCourses.length} Courses
                                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                            </button>
                        </div>
                    )}

                    {filteredCourses.length === 0 && (
                        <div className="py-20 text-center">
                            <h3 className="text-2xl font-bold text-oxford mb-2">No courses found matching your criteria</h3>
                            <button
                                onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
                                className="mt-4 text-sandstone font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}

                    <div className="mt-20 bg-white p-8 md:p-12 rounded-[2.5rem] border border-dashed border-gray-300 flex flex-col md:flex-row items-center gap-8 shadow-sm">
                        <div className="flex-1">
                            <h4 className="font-bold text-2xl text-oxford mb-4 flex items-center gap-3">
                                <Star className="text-sandstone" size={24} fill="currentColor" />
                                Admission Criteria
                            </h4>
                            <ul className="space-y-4 text-base text-gray-600">
                                <li className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle2 size={14} />
                                    </div>
                                    <span>Admissions are generally merit-based on previous qualifying exam scores.</span>
                                </li>
                                <li className="flex items-start gap-4">
                                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle2 size={14} />
                                    </div>
                                    <span>Integrated B.Ed programs may include entrance criteria set by the university or state.</span>
                                </li>
                            </ul>
                        </div>
                        <Link href="/contact" className="px-8 py-4 bg-sandstone text-oxford rounded-full font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg shrink-0">
                            Apply for Admission
                        </Link>
                    </div>
                </div>
            </section>

            {/* Laboratories Section */}
            <section className="py-24 px-6 bg-white overflow-hidden scroll-mt-20" id="laboratories">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.span
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-sandstone-dark font-black uppercase tracking-[0.2em] text-xs mb-3 block"
                        >
                            Advanced Learning Hubs
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            className="text-4xl md:text-5xl font-black text-oxford mt-2"
                        >
                            Laboratories & Research
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            className="text-gray-500 mt-4 max-w-2xl mx-auto font-medium"
                        >
                            State-of-the-art facilities designed to foster scientific inquiry, creative expression, and technical proficiency.
                        </motion.p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {labsData.map((lab, i) => (
                            <motion.div
                                key={lab.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                onClick={() => setSelectedLab(lab)}
                                className="group cursor-pointer bg-gray-50 rounded-[2.5rem] p-8 hover:bg-white hover:shadow-2xl transition-all duration-500 border border-transparent hover:border-sandstone/20 overflow-hidden relative"
                            >
                                <div className={`aspect-square w-16 rounded-2xl bg-gradient-to-br ${lab.gradient} flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500`}>
                                    {lab.icon}
                                </div>
                                <h3 className="text-2xl font-black text-oxford mb-4 group-hover:text-sandstone transition-colors leading-tight">
                                    {lab.name}
                                </h3>
                                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                                    {lab.description}
                                </p>
                                <div className="flex items-center gap-2 text-oxford font-black text-[10px] uppercase tracking-widest group-hover:gap-4 transition-all">
                                    View Details
                                    <ArrowRight size={14} className="text-sandstone" />
                                </div>

                                {/* Abstract background circle */}
                                <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${lab.gradient} opacity-[0.03] group-hover:opacity-[0.08] rounded-full blur-2xl transition-opacity`} />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lab Detailed Modal */}
            <AnimatePresence>
                {selectedLab && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedLab(null)}
                            className="absolute inset-0 bg-oxford/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className={`p-8 md:p-12 bg-gradient-to-br ${selectedLab.gradient} text-white relative`}>
                                <button
                                    onClick={() => setSelectedLab(null)}
                                    className="absolute top-8 right-8 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center hover:bg-white/30 transition-colors z-10"
                                >
                                    <X size={24} />
                                </button>
                                <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                                    <div className="w-24 h-24 rounded-[2rem] bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-xl">
                                        {selectedLab.icon}
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-3xl md:text-5xl font-black mb-4 leading-tight">{selectedLab.name}</h2>
                                        <p className="text-white/90 text-lg font-medium max-w-2xl leading-relaxed">
                                            {selectedLab.description}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 overflow-y-auto p-8 md:p-12">
                                <div className="grid lg:grid-cols-3 gap-12">
                                    <div className="lg:col-span-2 space-y-12">
                                        <section>
                                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-sandstone mb-6 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-sandstone" />
                                                Overview
                                            </h4>
                                            <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                                                {selectedLab.fullDescription}
                                            </p>
                                        </section>

                                        <div className="grid sm:grid-cols-2 gap-8">
                                            <section className="bg-gray-50 p-8 rounded-[2rem]">
                                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-sandstone mb-6">Key Activities</h4>
                                                <p className="text-gray-700 font-medium leading-relaxed">
                                                    {selectedLab.activities}
                                                </p>
                                            </section>
                                            <section className="bg-oxford text-white p-8 rounded-[2rem]">
                                                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-sandstone mb-6">Learning Impact</h4>
                                                <p className="text-white/80 font-medium leading-relaxed">
                                                    {selectedLab.impact}
                                                </p>
                                            </section>
                                        </div>
                                    </div>

                                    <div className="space-y-8">
                                        <section className="sticky top-0">
                                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-sandstone mb-6 flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-sandstone" />
                                                Key Features
                                            </h4>
                                            <div className="space-y-4">
                                                {selectedLab.keyFeatures.map((feature: string, i: number) => (
                                                    <div key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:border-sandstone/30 transition-colors">
                                                        <div className="w-6 h-6 rounded-lg bg-sandstone/10 text-sandstone flex items-center justify-center shrink-0 mt-0.5">
                                                            <CheckCircle2 size={14} />
                                                        </div>
                                                        <span className="text-sm font-bold text-oxford/70 leading-snug">{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Footer */}
                            <div className="p-8 md:p-12 border-t border-gray-100 bg-gray-50 flex justify-between items-center shrink-0">
                                <div className="hidden md:block">
                                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Leela Devi Parasmal Sancheti Kanya Mahavidyalaya</p>
                                </div>
                                <button
                                    onClick={() => setSelectedLab(null)}
                                    className="px-10 py-4 bg-oxford text-white rounded-full font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-sandstone hover:text-oxford transition-all"
                                >
                                    Close Facility Info
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Facilities Section */}
            <section className="py-24 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-sandstone font-bold uppercase tracking-widest text-sm">Facilities & Campus Life</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-oxford mt-2">Supporting Your Growth</h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                            The college provides a learner-friendly environment designed for academics, sports, and overall well-being.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                        {[
                            { name: "Girls Hostel", icon: School },
                            { name: "Medical Support", icon: HeartPulse },
                            { name: "Library", icon: Library },
                            { name: "Sports & Gym", icon: Dumbbell },
                            { name: "IT Infrastructure", icon: Monitor },
                            { name: "Science Labs", icon: Microscope },
                            { name: "Cafeteria", icon: Utensils },
                            { name: "Auditorium", icon: Music },
                            { name: "Transport", icon: Bus },
                            { name: "Extra-curricular", icon: Trophy }
                        ].map((facility, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group p-8 rounded-3xl bg-gray-50 hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-sandstone/20 text-center flex flex-col items-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6 group-hover:bg-sandstone group-hover:text-white transition-colors">
                                    <facility.icon size={32} strokeWidth={1.5} />
                                </div>
                                <h3 className="font-bold text-oxford leading-tight">{facility.name}</h3>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Admission Process */}
            <section className="py-24 px-6 bg-oxford text-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="text-sandstone font-bold uppercase tracking-widest text-sm">WANT TO JOIN US?</span>
                        <h2 className="text-3xl md:text-5xl font-bold mt-2">Admission Process</h2>
                    </div>

                    <div className="grid lg:grid-cols-5 gap-4 relative">
                        <div className="hidden lg:block absolute top-[60px] left-0 w-full h-0.5 bg-white/10" />
                        {[
                            { step: "01", title: "Application", desc: "Submit online/offline as per official notices." },
                            { step: "02", title: "Eligibility", desc: "Based on 12th class marks for UG programs." },
                            { step: "03", title: "Merit List", desc: "Lists prepared for BA/B.Sc/B.Com programs." },
                            { step: "04", title: "Verification", desc: "Check original documents at the college." },
                            { step: "05", title: "Payment", desc: "Pay the required fees to confirm admission." }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative z-10 flex flex-col items-center text-center px-4"
                            >
                                <div className="w-14 h-14 rounded-full bg-oxford border-4 border-sandstone flex items-center justify-center font-black text-sandstone text-xl mb-6 shadow-xl">
                                    {step.step}
                                </div>
                                <h3 className="font-bold text-xl mb-3">{step.title}</h3>
                                <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10">
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <Trophy className="text-sandstone" />
                            Required Documents
                        </h3>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                "10th & 12th Mark Sheets",
                                "Transfer Certificate",
                                "Character Certificate",
                                "Caste Certificate (if applicable)",
                                "Passport-size Photos"
                            ].map((doc, i) => (
                                <div key={i} className="flex items-center gap-4 group">
                                    <div className="w-8 h-8 rounded-lg bg-sandstone/20 text-sandstone flex items-center justify-center shrink-0 group-hover:bg-sandstone group-hover:text-oxford transition-colors">
                                        <CheckCircle2 size={16} />
                                    </div>
                                    <span className="text-white/80 font-medium">{doc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-6 bg-sandstone">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-oxford mb-8 uppercase tracking-tight leading-tight">Empowering Women Through Excellence</h2>
                    <p className="text-xl text-oxford/80 font-medium mb-12">
                        Invest in your future. Join a community of leaders, thinkers, and changemakers. Admissions are now open.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <a href="tel:+918764185993" className="px-10 py-5 bg-oxford text-white rounded-full font-bold uppercase tracking-wider shadow-2xl hover:bg-white hover:text-oxford transition-all">
                            Call: 8764185993
                        </a>
                        <Link href="/contact" className="px-10 py-5 bg-white text-oxford rounded-full font-bold uppercase tracking-wider shadow-2xl hover:scale-105 transition-all">
                            Apply for Admission
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
