'use client'
import React, {useEffect, useState} from "react";
import "../../app/styles/globals.css"
import Link from 'next/link'

function AccountNavigation() {
    const [userid, setUserid] = useState<number | undefined>(undefined);
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
        <div className="flex flex-col items-start justify-start overflow-hidden w-full max-w-[200px] text-left text-xl text-gray-100">
            <div className="self-stretch flex flex-col items-start justify-start pt-4 pb-0 pr-0 pl-6 gap-[1rem] text-pearl-white">
                <div className="flex flex-row items-start justify-center gap-[1.5rem]">
                    <span className="material-symbols-outlined text-[1rem]">home</span>
                    <Link href={`http://localhost:3000`}
                          className="lowercase self-stretch relative no-underline text-[1rem] text-pearl-white font-robotomono">home</Link>
                </div>
                <div className="flex flex-row items-start justify-center gap-[1.5rem]">
                    <span className="material-symbols-outlined text-[1rem]">person</span>
                    <Link href={`/account/${userid}`}
                          className="lowercase self-stretch relative no-underline text-[1rem] text-pearl-white font-robotomono">profile</Link>
                </div>
                <div className="flex flex-row items-start justify-center gap-[1.5rem]">
                    <span className="material-symbols-outlined text-[1rem]">playlist_play</span>
                    <Link href={`/account/${userid}/watchlists`}
                          className="lowercase self-stretch relative no-underline text-[1rem] text-pearl-white font-robotomono">watchlists</Link>
                </div>
                <div className="flex flex-row items-start justify-center gap-[1.5rem]">
                    <span className="material-symbols-outlined text-[1rem]">favorite</span>
                    <Link href={`/account/${userid}/favourites`}
                          className="lowercase self-stretch relative no-underline text-[1rem] text-pearl-white font-robotomono">favourites</Link>
                </div>
            </div>
        </div>
    );
}

export default AccountNavigation;