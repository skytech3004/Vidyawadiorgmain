"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const useTimelineAnimation = () => {
    const svgRef = useRef<SVGSVGElement>(null);
    const pathRef = useRef<SVGPathElement>(null);

    useEffect(() => {
        if (!pathRef.current || !svgRef.current) return;

        const path = pathRef.current;

        // Calculate total length of the path
        const length = path.getTotalLength();

        // Set up the start position of the drawing
        gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
        });

        // Create the drawing animation synced with scroll
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#heritage", // Target the main section
                start: "top center",
                end: "bottom center",
                scrub: 1.5, // Smoother follow
                once: false, // User requested "Animate only once per scroll session" - but scrub usually needs scrolling back and forth. 
                // If they strictly want "draw and stay", scrub isn't ideal, but they requested scrubbed (scroll-synced).
                // I will stick with scrub as requested.
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
