"use client"
import React from 'react';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AuthForm from "./AuthForm";
import {AnimatePresence, motion} from 'framer-motion';

interface formProps {
    action: "login" | "signup";
    setIsVisible: (visible: boolean) => void;
}

const AuthPopup = ((props: formProps) => {
    const outsideClicked = (event: React.MouseEvent) => {
        event.stopPropagation()
        props.setIsVisible(false)
    }

    return (
        <AnimatePresence>
            <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                        onClick={outsideClicked} className="absolute w-screen h-screen backdrop-blur-[10px] bg-midnight/30 z-50">
                <div onClick={event => event.stopPropagation()}
                    className="fixed max-w-[500px] w-full backdrop-blur-[20px] bg-white/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl z-20 overflow-hidden">
                    <div className="bg-midnight/90 p-4">
                        <div className="flex w-full justify-end">
                            <button onClick={outsideClicked} className="bg-transparent cursor-pointer">
                                <FontAwesomeIcon className="text-pearl-white" icon={faXmark} size="xl"/>
                            </button>
                        </div>
                        <AuthForm action={props.action}/>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
});

export default AuthPopup;