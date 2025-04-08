'use client'
import React, {forwardRef} from 'react';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import AuthForm from "./AuthForm";

interface formProps {
    action: "login" | "signup";
    isVisible: boolean;
    setIsVisible: () => void;
}

const AuthPopup = forwardRef<HTMLDivElement, formProps>((props, ref) => {
    return (
        props.isVisible && (
            <div ref={ref} className="fixed max-w-[500px] w-full backdrop-blur-[20px] bg-white/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl z-20 overflow-hidden">
                <div className="bg-midnight/90 p-4">
                    <div className="flex w-full justify-end">
                        <button onClick={props.setIsVisible} className="bg-transparent cursor-pointer">
                            <FontAwesomeIcon className="text-pearl-white" icon={faXmark} size="xl"/>
                        </button>
                    </div>
                    <AuthForm action={props.action}/>
                </div>
            </div>
        ))
});

export {AuthPopup};