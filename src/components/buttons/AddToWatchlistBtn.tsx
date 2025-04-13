"use client"
import WatchlistPopup from "../forms/WatchlistPopup";
import React, {lazy, Suspense, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCirclePlus} from "@fortawesome/free-solid-svg-icons";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";

const AuthPopup = lazy(() => import("../forms/AuthPopup"))

function AddToWatchlistBtn({ movieId, isLoggedIn } : { movieId: number, isLoggedIn: boolean }) {
    const [showWatchlists, setShowWatchlists] = useState(false);
    const [showAuthForm, setShowAuthForm] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    const handleBtnClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (isLoggedIn) {
            const { clientX, clientY } = event;
            setCursorPosition({ x: clientX + 25, y: clientY + 25 });
            setShowWatchlists(!showWatchlists);
        } else {
            setShowAuthForm(true);
        }
    };

    return (
        <>
            <motion.button whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} onClick={(e) => handleBtnClick(e)}
                    className="p-0 bg-transparent max-h-[32px] max-w-[32px] cursor-pointer">
                <FontAwesomeIcon className="text-pearl-white opacity-75" icon={faCirclePlus} size="xl"/>
            </motion.button>
            {showAuthForm && ReactDOM.createPortal((
                <Suspense fallback={<p></p>}>
                    <AuthPopup action={"login"} setIsVisible={() => setShowAuthForm(false)} />
                </Suspense>),document.body)}
            {showWatchlists && ReactDOM.createPortal(
                    <motion.div animate={{ scale: showWatchlists ? 1 : 0 }} onClick={(event) => { event.stopPropagation(); setShowWatchlists(false); }} className="absolute left-0 top-0 w-screen h-screen bg-transparent z-10">
                        <WatchlistPopup cursorPosition={cursorPosition} movieId={movieId} />
                    </motion.div>, document.body
            )}
        </>
    )
}

AddToWatchlistBtn.displayName = "AddToWatchlistBtn"

export default AddToWatchlistBtn