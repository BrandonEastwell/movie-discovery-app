"use client"
import React from 'react';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AuthForm from "./AuthForm";
import {AnimatePresence} from 'framer-motion';
import PopupBackground from "./PopupBackground";

interface formProps {
    action: "login" | "signup";
    setIsVisible: (visible: boolean) => void;
}

const AuthPopup = ((props: formProps) => {
    const close = (event: React.MouseEvent) => {
        event.stopPropagation()
        props.setIsVisible(false)
    }

    return (
        <AnimatePresence>
            <PopupBackground setIsVisible={props.setIsVisible} blur={true}>
                <div onClick={event => event.stopPropagation()}
                    className="fixed max-w-[500px] w-full backdrop-blur-[20px] bg-white/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl z-20 overflow-hidden">
                    <div className="bg-midnight/90 p-4">
                        <div className="flex w-full justify-end">
                            <button onClick={close} className="bg-transparent cursor-pointer">
                                <FontAwesomeIcon className="text-pearl-white" icon={faXmark} size="xl"/>
                            </button>
                        </div>
                        <AuthForm action={props.action}/>
                    </div>
                </div>
            </PopupBackground>
        </AnimatePresence>
    )
});

export default AuthPopup;