"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const MusicPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [config, setConfig] = useState({
        url: "/theboysbeats-lofi-boy-serene-strings-lofi-instrumental-278238.mp3",
        volume: 0.4
    });
    const audioRef = useRef<HTMLAudioElement | null>(null);
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith("/admin");

    useEffect(() => {
        const fetchConfig = async () => {
            try {
                const res = await fetch("/api/admin/settings");
                const data = await res.json();
                if (data.success && data.settings) {
                    let musicUrl = data.settings.bg_music_url || "/theboysbeats-lofi-boy-serene-strings-lofi-instrumental-278238.mp3";
                    
                    // Fallback to proxy if it's an uploaded file to avoid 404s
                    if (musicUrl.startsWith("/uploads/")) {
                        musicUrl = "/api" + musicUrl;
                    }

                    setConfig({
                        url: musicUrl,
                        volume: data.settings.bg_music_volume !== undefined ? parseInt(data.settings.bg_music_volume) / 100 : 0.4
                    });
                }
            } catch (err) {
                console.error("Failed to fetch music config:", err);
            }
        };

        fetchConfig();
    }, []);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = config.volume;
            audioRef.current.loop = true;
        }
    }, [config.volume]);

    useEffect(() => {
        // Automatically pause/mute if on admin page
        if (isAdmin && audioRef.current && isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    }, [isAdmin]);

    useEffect(() => {
        // Try to resume audio if it was playing before or if it's the first visit
        const storedState = localStorage.getItem("bg-music-playing");
        
        // If it's the first visit (null) or explicitly set to true
        if ((storedState === "true" || storedState === null) && !isAdmin) {
            const handleFirstInteraction = () => {
                if (audioRef.current && !isPlaying) {
                    audioRef.current.play()
                        .then(() => {
                            setIsPlaying(true);
                            localStorage.setItem("bg-music-playing", "true");
                        })
                        .catch(err => console.log("Autoplay still blocked:", err));
                }
                // Use capture phase and multiple events for better reliability
                window.removeEventListener('mousedown', handleFirstInteraction, true);
                window.removeEventListener('touchstart', handleFirstInteraction, true);
                window.removeEventListener('scroll', handleFirstInteraction, true);
                window.removeEventListener('keydown', handleFirstInteraction, true);
            };

            window.addEventListener('mousedown', handleFirstInteraction, true);
            window.addEventListener('touchstart', handleFirstInteraction, true);
            window.addEventListener('scroll', handleFirstInteraction, true);
            window.addEventListener('keydown', handleFirstInteraction, true);

            return () => {
                window.removeEventListener('mousedown', handleFirstInteraction, true);
                window.removeEventListener('touchstart', handleFirstInteraction, true);
                window.removeEventListener('scroll', handleFirstInteraction, true);
                window.removeEventListener('keydown', handleFirstInteraction, true);
            };
        }
    }, [isAdmin, config.url]); // Re-run if URL changes

    const togglePlay = () => {
        if (!audioRef.current || isAdmin) return;

        if (isPlaying) {
            audioRef.current.pause();
            localStorage.setItem("bg-music-playing", "false");
        } else {
            audioRef.current.play().catch(err => console.log("Playback failed:", err));
            localStorage.setItem("bg-music-playing", "true");
        }
        setIsPlaying(!isPlaying);
    };

    // Don't show the player at all in admin panel to avoid confusion
    if (isAdmin) return null;

    return (
        <div className="fixed bottom-24 right-6 z-[90]">
            <audio
                ref={audioRef}
                src={config.url}
                preload="auto"
            />
            <motion.button
                onClick={togglePlay}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`flex items-center justify-center w-12 h-12 rounded-full shadow-2xl transition-all duration-300 ${
                    isPlaying 
                    ? "bg-oxford text-white border-2 border-sandstone/30" 
                    : "bg-white text-oxford border-2 border-oxford/10"
                }`}
                title={isPlaying ? "Pause Background Music" : "Play Background Music"}
            >
                <AnimatePresence mode="wait">
                    {isPlaying ? (
                        <motion.div
                            key="playing"
                            initial={{ opacity: 0, rotate: -45 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 45 }}
                            transition={{ duration: 0.2 }}
                            className="relative flex items-center justify-center"
                        >
                            <Volume2 size={20} />
                            <motion.div 
                                animate={{ 
                                    scale: [1, 1.5, 1],
                                    opacity: [0.5, 0, 0.5]
                                }}
                                transition={{ 
                                    repeat: Infinity, 
                                    duration: 1.5,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 bg-white/20 rounded-full -z-10"
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="paused"
                            initial={{ opacity: 0, rotate: -45 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 45 }}
                            transition={{ duration: 0.2 }}
                        >
                            <VolumeX size={20} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
            
            {isPlaying && (
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute right-14 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-oxford/10 shadow-sm whitespace-nowrap hidden md:block"
                >
                    <span className="text-[10px] font-bold text-oxford uppercase tracking-wider">
                        Background Music Active
                    </span>
                </motion.div>
            )}
        </div>
    );
};


export default MusicPlayer;
