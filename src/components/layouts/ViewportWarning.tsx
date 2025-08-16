"use client"

import React, { useState, useEffect } from "react";

export default function ViewportWidth() {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        width < 1080 && (
            <div className="absolute w-full h-full bg-custom-gradient z-50 flex flex-col justify-center place-items-center">
                <p className="no-underline bg-transparent px-5 font-iconsolata text-base font-bold text-pearl-white text-center">
                    This project does not support devices less than 1080 pixels width (built for desktop first)
                </p>
                <p className="no-underline bg-transparent px-5 font-iconsolata text-base font-bold text-pearl-white text-center">
                    Mobile responsiveness to be added in the future
                </p>
            </div>
        )
    );
}