import { motion } from "framer-motion";
import React from "react";

export default function PopupBackground({children, setIsVisible} : {children: React.ReactNode, setIsVisible: (value: boolean) => void}) {
    const outsideClicked = (event: React.MouseEvent) => {
        event.stopPropagation();
        setIsVisible(false);
    }

    return (
        <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                    onClick={outsideClicked}
                    className="absolute w-screen h-screen backdrop-blur-[10px] bg-midnight/30 z-50">
            {children}
        </motion.div>
    )
}