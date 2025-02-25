'use client'
import React, {useEffect, useRef, useState} from 'react';
import Link from "next/link";
import ReactDOM from "react-dom";
import LoginForm from "./login-form";
import {useRouter} from "next/navigation";

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
            return {loggedIn: true, userid: data.userid, username: data.username};
        } else {
            console.error(data.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
    return {loggedIn: false}
}

const HeaderMenu: React.FC = async () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const formRef = useRef<HTMLDivElement>(null);
    const router = useRouter()
    const [loggedIn, setLoggedIn] = useState<Promise<boolean>>(async () => {
        const {loggedIn} = await authenticate();
        return loggedIn;
    });
    const [userid, setUserid] = useState<number | undefined>(undefined);
    const [username, setUsername] = useState<string | undefined>(undefined);

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
        if (await loggedIn && userid != null || undefined) {
            router.push(`/account/${userid}`);
        } else {
            setIsVisible(!isVisible);
        }
    }

    useEffect(() => {
        authenticate();
    }, []);

    return (
        <div className="flex justify-center align-middle gap-5 text-[1.25rem] text-gray-100">
            {/* Navigation links that change based on login status */}
            <button className="cursor-pointer [border:none] p-0 bg-[transparent]">
                <Link
                    className="cursor-pointer no-underline border:none p-0 bg-[transparent] text-gray-100 font-robotomono opacity-75"
                    href={await loggedIn ? `/account/${userid}/watchlists` : '/login'}>
                    watchlist
                </Link>
            </button>

            <button className="cursor-pointer [border:none] p-0 bg-[transparent]">
                <Link
                    className="cursor-pointer no-underline border:none p-0 bg-[transparent] text-gray-100 font-robotomono opacity-75"
                    href={await loggedIn ? `/account/${userid}/favourites` : '/login'}>
                    favourites
                </Link>
            </button>

            <button
                className="cursor-pointer no-underline border:none p-0 bg-[transparent] text-gray-100 font-robotomono opacity-75"
                onClick={handleAccountClick}
            >
                {await loggedIn ? username : 'login'}
            </button>

            {isVisible && ReactDOM.createPortal(<LoginForm ref={formRef}/>, document.body)}
        </div>
    );
}

export default HeaderMenu;