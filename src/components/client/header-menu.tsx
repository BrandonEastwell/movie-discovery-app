'use client'
import React, {useEffect, useRef, useState} from 'react';
import Link from "next/link";
import ReactDOM from "react-dom";
import {useRouter} from "next/navigation";
import AuthForm from "./auth-form";

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

    return (
        <div className="flex justify-center align-middle gap-5 text-[1.25rem] text-gray-100">
            <button className="cursor-pointer [border:none] p-0 bg-[transparent]">
                <Link
                    className="cursor-pointer no-underline border:none p-0 bg-[transparent] text-gray-100 font-robotomono opacity-75"
                    href={isLoggedIn ? `/account/${userid}/watchlists` : '/login'}>
                    watchlist
                </Link>
            </button>

            <button className="cursor-pointer [border:none] p-0 bg-[transparent]">
                <Link
                    className="cursor-pointer no-underline border:none p-0 bg-[transparent] text-gray-100 font-robotomono opacity-75"
                    href={isLoggedIn ? `/account/${userid}/favourites` : '/login'}>
                    favourites
                </Link>
            </button>

            <button
                className="cursor-pointer no-underline border:none p-0 bg-[transparent] text-gray-100 font-robotomono opacity-75"
                onClick={handleAccountClick}
            >
                {isLoggedIn ? username : 'login'}
            </button>

            {isVisible && ReactDOM.createPortal(<AuthForm ref={formRef} action={"login"}
                                                          setIsVisible={() => setIsVisible(false)}
                                                          isVisible={isVisible} />, document.body)}
        </div>
    );
}

export default HeaderMenu;