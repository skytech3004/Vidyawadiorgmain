"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useTimelineAnimation = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        if (!pathRef.current) return;

        const path = pathRef.current;
        const length = path.getTotalLength();

        // Set initial state
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;

        // Create the drawing animation synced with scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#heritage",
                start: "top center", // Starts when top of section hits center of viewport
                end: "bottom center",
                scrub: 1,
            },
        });

        tl.to(path, {
            strokeDashoffset: 0,
            ease: "none",
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    return { svgRef, pathRef };
};
