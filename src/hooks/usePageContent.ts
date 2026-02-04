"use client";

import { useState, useEffect } from 'react';

export function usePageContent(pageName: string, initialData: any = {}) {
    // Start with initialData (hardcoded fallback)
    const [content, setContent] = useState(initialData);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchContent = async () => {
            try {
                const res = await fetch(`/api/content/${pageName}`);
                if (res.ok) {
                    const dbData = await res.json();
                    if (isMounted && Object.keys(dbData).length > 0) {
                        // Merge DB data on top of initial data
                        // logic: if dbData has 'hero', replace initialData.hero
                        setContent((prev: any) => ({
                            ...prev,
                            ...dbData
                        }));
                    }
                }
            } catch (error) {
                console.error(`Failed to fetch content for ${pageName}`, error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchContent();
        return () => { isMounted = false; };
    }, [pageName]);

    return { content, loading };
}
