'use client'
import React, {useEffect, useRef, useState} from 'react';
import Link from "next/link";
import ReactDOM from "react-dom";
import LoginForm from "./login-form";
import {router} from "next/client";

interface UserListProps {
    loggedIn: boolean;
    username: string | null;
}
const HeaderMenu: React.FC<UserListProps> = ({username, loggedIn}) => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const handleOutSideClick = (event: any) => {
            if (!ref.current?.contains(event.target)) {
                setIsVisible(false);
            }
        };
        window.addEventListener("mousedown", handleOutSideClick);
        return () => {
            window.removeEventListener("mousedown", handleOutSideClick);
        };
    }, [ref]);

    const accountHandler = () => {
        if (loggedIn) {
            useEffect(() => {
                router.push(`/account`, {});
            })
        } else {
            setIsVisible(true);
        }
    }
    return (
        <div className="flex flex-row text-left items-center justify-start gap-5 text-[1.25rem] font-robotomono text-gray-100">
            <button className="cursor-pointer [border:none] p-0 bg-[transparent]">
                <Link
                    className="cursor-pointer no-underline border:none p-0 bg-[transparent] text-gray-100"
                    href={"../login"}>
                    watchlist
                </Link>
            </button>
            <button className="cursor-pointer [border:none] p-0 bg-[transparent]">
                <Link
                    className="cursor-pointer no-underline border:none p-0 bg-[transparent] text-gray-100"
                    href={"../login"}>
                    favourites
                </Link>
            </button>
            <button className="cursor-pointer no-underline border:none p-0 bg-[transparent] text-gray-100"
                onClick={accountHandler}>
                {loggedIn ? `${username}` : "login"}
            </button>
            {isVisible && ReactDOM.createPortal(<LoginForm/>, document.body)}
        </div>
    )
}

export default HeaderMenu;