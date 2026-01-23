"use client";

import React, { ForwardedRef, forwardRef } from "react";

interface TimelineSVGProps {
    // Add props if needed
}

const TimelineSVG = forwardRef<SVGPathElement, TimelineSVGProps>((props, ref) => {
    return (
        <div className="absolute inset-0 pointer-events-none z-0 overflow-visible flex justify-center">
            <svg
                width="100%"
                height="100%"
                viewBox="0 0 400 1200"
                preserveAspectRatio="none"
                className="w-full max-w-4xl opacity-30"
            >
                {/* Placeholder Path (Gray/Shadow) */}
                <path
                    d="M 200,0 
                    C 200,100 350,150 350,250 
                    C 350,350 50,450 50,550 
                    C 50,650 350,750 350,850 
                    C 350,950 50,1050 50,1150 
                    C 50,1250 200,1350 200,1400"
                    fill="none"
                    stroke="#0C2C55"
                    strokeWidth="12"
                    strokeLinecap="round"
                    className="opacity-[0.03]"
                />

                {/* Active Path (Drawing) */}
                <path
                    ref={ref}
                    d="M 200,0 
                    C 200,100 350,150 350,250 
                    C 350,350 50,450 50,550 
                    C 50,650 350,750 350,850 
                    C 350,950 50,1050 50,1150 
                    C 50,1250 200,1350 200,1400"
                    fill="none"
                    stroke="#c9a870"
                    strokeWidth="12"
                    strokeLinecap="round"
                    className="opacity-100 drop-shadow-[0_0_15px_rgba(201,168,112,0.4)]"
                />
            </svg>
        </div>
    );
});

TimelineSVG.displayName = "TimelineSVG";

export default TimelineSVG;
