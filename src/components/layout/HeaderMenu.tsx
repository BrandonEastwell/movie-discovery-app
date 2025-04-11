'use client'
import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from "react-dom";
import {useRouter} from "next/navigation";
import { motion } from 'framer-motion';
import AuthPopup from "../form/AuthPopup";

interface HeaderMenuProps {
    isLoggedIn: boolean;
    userData: { username: string, userid: number } | null;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({isLoggedIn, userData}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const formRef = useRef<HTMLDivElement>(null);
    const router = useRouter()
    const userid = userData?.userid;
    const username = userData?.username;

    useEffect(() => {
        const handleOutSideClick = (event: MouseEvent) => {
            // Check if the clicked element is not part of the login.tsx form
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setIsVisible(false);
            }
        };

        document.addEventListener("mousedown", handleOutSideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutSideClick);
        };
    }, []);

    const handleAccountClick = async () => {
        if (isLoggedIn && userid != null || undefined) {
            router.push(`/account/${userid}`);
        } else {
            setIsVisible(!isVisible);
        }
    }

    function handleLinkClick(href: string) {
        router.push(href)
    }

    const variants = {
        hover: {
            color: '#fefdfd', borderBottom: "1px solid #8566e0",
            transition: {
                duration: 0.2,
                ease: "easeInOut"
            }
        },
        initial: {
            color: 'rgba(254,253,253,0.8)', borderBottom: "0px solid #8566e0",
            transition: {
                duration: 0,
                ease: "easeInOut"
            }
        }
    }

    return (
        <div className="flex justify-end gap-5 text-lg place-items-center">
            <motion.button variants={variants} initial={"initial"} whileHover={"hover"} whileTap={{scale: 0.9}} className="cursor-pointer border:none p-0 bg-[transparent] font-iconsolata text-lg text-gray-100"
                    onClick={() => handleLinkClick(isLoggedIn ? `/account/${userid}/watchlists` : 'auth/login')}>
                watchlist
            </motion.button>
            <motion.button variants={variants} initial={"initial"} whileHover={"hover"} whileTap={{scale: 0.9}} className="cursor-pointer border:none p-0 bg-[transparent] font-iconsolata text-lg text-gray-100"
                    onClick={() => handleLinkClick(isLoggedIn ? `/account/${userid}/favourites` : 'auth/login')}>
                favourites
            </motion.button>
            <motion.button variants={variants} initial={"initial"} whileHover={"hover"} whileTap={{scale: 0.9}} className="cursor-pointer border:none p-0 bg-[transparent] font-iconsolata text-lg text-gray-100"
                    onClick={handleAccountClick}>
                {isLoggedIn ? username : 'login'}
            </motion.button>
            {isVisible && ReactDOM.createPortal(<AuthPopup ref={formRef} action={"login"}
                                                           setIsVisible={() => setIsVisible(false)}
                                                           isVisible={isVisible} />, document.body)}
        </div>
    );
}

export default HeaderMenu;