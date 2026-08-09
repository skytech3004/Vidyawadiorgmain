"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, GraduationCap, Briefcase, Calendar, X, ExternalLink, Trophy, Medal, Star } from "lucide-react";
import Image from "next/image";

interface StaffMember {
    id: number;
    name: string;
    role: string;
    email: string;
    image: string;
    education: string;
    experience: string;
    dob: string;
    previousWork: string;
    bio: string;
}

const awardsData = [
    {
        id: 1,
        name: "Excellence in Girl Empowerment",
        role: "State Level Honor",
        email: "Education Excellence Award",
        image: "/images/trophy.png",
        education: "Awarded by Rajasthan Education Board",
        experience: "2024 Recognition",
        dob: "Academic Year 2024",
        previousWork: "State Level Achievement",
        bio: "Vidyawadi has been recognized for its outstanding contribution to girls' education and personality development through various co-curricular programs."
    },
    {
        id: 2,
        name: "Best Skill Development Program",
        role: "Skill Excellence",
        email: "Award for Creativity",
        image: "/images/trophy.png",
        education: "National Skill Council Recognition",
        experience: "2023-24 Awards",
        dob: "Feb 2024",
        previousWork: "National Level Achievement",
        bio: "Our unique blend of traditional values and modern skill-based programs including horse riding, karate, and culinary training have won national acclaim."
    },
    {
        id: 3,
        name: "Sports & Equestrian Excellence",
        role: "Championship Award",
        email: "State Level Sports",
        image: "/images/trophy.png",
        education: "Rajasthan Sports Federation",
        experience: "Continuous Excellence",
        dob: "Multiple Honors",
        previousWork: "Regional Championship",
        bio: "Recognized as the premier institution for equestrian training and diverse sports opportunities for girl students in the region."
    }
];

export default function Staff() {
    const [selectedAward, setSelectedAward] = useState<any | null>(null);

   
}
