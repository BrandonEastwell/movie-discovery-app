import { useState, useEffect } from "react";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false, trickleSpeed: 100, speed: 500, easing: 'ease' })

export function useProgress() {
    const [isLoading, setIsLoading] = useState(false);

    // Start Progress Bar
    const start = () => {
        setIsLoading(true);
        NProgress.start();
    };

    // Stop Progress Bar
    const stop = () => {
        setIsLoading(false);
        NProgress.done();
    };

    // Cleanup on Unmount
    useEffect(() => {
        return () => {
            NProgress.remove();
        };
    }, []);

    return { start, stop, isLoading };
}