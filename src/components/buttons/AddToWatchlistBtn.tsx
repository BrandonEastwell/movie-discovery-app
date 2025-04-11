"use client"
import WatchlistPopup from "../WatchlistPopup";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import {useRouter} from "next/navigation";

export default function AddToWatchlistBtn({ movieId, isLoggedIn } : { movieId: number, isLoggedIn: boolean }) {
    const [isVisible, setIsVisible] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const router = useRouter();

    const handleBtnClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (isLoggedIn) {
            const { clientX, clientY } = event;
            setCursorPosition({ x: clientX + 25, y: clientY + 25 });
            setIsVisible(!isVisible);
        } else {
            router.push("/auth/login")
        }
    };

    return (
        <>
            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} onClick={(e) => handleBtnClick(e)}
                    className="p-0 bg-transparent max-h-[32px] max-w-[32px] cursor-pointer">
                <FontAwesomeIcon className="text-pearl-white opacity-75" icon={faCirclePlus} size="xl"/>
            </motion.button>
            {isVisible && ReactDOM.createPortal(
                <motion.div animate={{ scale: isVisible ? 1 : 0 }}  onClick={(event) => { event.stopPropagation(); setIsVisible(false); }} className="absolute left-0 top-0 w-screen h-screen bg-transparent z-10">
                    <WatchlistPopup cursorPosition={cursorPosition} movieId={movieId} />
                </motion.div>, document.body
            )}
        </>
    )
}