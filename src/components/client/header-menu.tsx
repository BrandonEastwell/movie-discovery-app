'use client'
import React, {useEffect, useRef, useState} from 'react';
import Link from "next/link";
import ReactDOM from "react-dom";
import LoginForm from "./login-form";
import {useRouter} from "next/navigation";

const HeaderMenu: React.FC = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const formRef = useRef<HTMLDivElement>(null);
    const router = useRouter()
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userid, setUserid] = useState<number | undefined>(undefined);
    const [username, setUsername] = useState<string | undefined>(undefined);

    useEffect(() => {
        const handleOutSideClick = (event: MouseEvent) => {
            // Check if the clicked element is not part of the login form
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setIsVisible(false);
            }
        };
        document.addEventListener("mousedown", handleOutSideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutSideClick);
        };
    }, []);

    const handleAccountClick = () => {
        if (loggedIn && userid != null || undefined) {
            router.push(`/account/${userid}`);
        } else {
            setIsVisible(!isVisible);
        }
    }

    useEffect(() => {
        const authenticate = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/auth-session`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({}),
                });
                const data = await response.json();
                if (response.ok) {
                    setUserid(data.userid);
                    setUsername(data.username);
                    setLoggedIn(true);
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        authenticate();
    }, []);

    return (
        <div className="flex flex-row flex-initial items-center justify-end gap-5 text-[1.25rem] text-gray-100 w-[33%]">
            {loggedIn && (
                <button className="cursor-pointer [border:none] p-0 bg-[transparent]">
                    <Link
                        className="cursor-pointer no-underline border:none p-0 bg-[transparent] text-gray-100 font-robotomono opacity-75"
                        href={`/account/${userid}/watchlists`}>
                        watchlist
                    </Link>
                </button>
            )}
            {loggedIn && (
                <button className="cursor-pointer [border:none] p-0 bg-[transparent]">
                    <Link
                        className="cursor-pointer no-underline border:none p-0 bg-[transparent] text-gray-100 font-robotomono opacity-75"
                        href={`/account/${userid}/favourites`}>
                        favourites
                    </Link>
                </button>
            )}
            {loggedIn && (
                <button
                    className="cursor-pointer no-underline border:none p-0 bg-[transparent] text-gray-100 font-robotomono opacity-75"
                    onClick={handleAccountClick}
                >
                    {username}
                </button>
            )}
            {!loggedIn && (
                <button className="cursor-pointer [border:none] p-0 bg-[transparent]">
                    <Link
                        className="cursor-pointer no-underline border:none p-0 bg-[transparent] text-gray-100 font-robotomono opacity-75"
                        href={`/login`}>
                        watchlist
                    </Link>
                </button>
            )}
            {!loggedIn && (
                <button className="cursor-pointer [border:none] p-0 bg-[transparent]">
                    <Link
                        className="cursor-pointer no-underline border:none p-0 bg-[transparent] text-gray-100 font-robotomono opacity-75"
                        href={`/login`}>
                        favourites
                    </Link>
                </button>
            )}
            {!loggedIn && (
                <button
                    className="cursor-pointer no-underline border:none p-0 bg-[transparent] text-gray-100 font-robotomono opacity-75"
                    onClick={handleAccountClick}
                >
                    login
                </button>
            )}
            {isVisible && ReactDOM.createPortal(<LoginForm ref={formRef} />, document.body)}
        </div>
    )
}

export default HeaderMenu;