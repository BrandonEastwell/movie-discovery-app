'use client'
import React, { useState } from 'react';
import {useSearchParams, useRouter, usePathname} from 'next/navigation';
import Link from "next/link";

const Header: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [searchTerm, setSearchTerm] = useState({
        q: "",
        page: "",
        sort: ""
    });

    const handleSearch = (e: any) => {
        const { value } = e.target;
        const updatedQuery= { ...searchTerm, q: value};
        setSearchTerm(updatedQuery);
        const params = new URLSearchParams(searchParams);
        Object.keys(updatedQuery).forEach((key : any) => {
            const keyValue = updatedQuery[key as keyof typeof updatedQuery];
            if (keyValue) {
                params.set(key, keyValue);
            } else {
                params.delete(key);
            }
        });
        console.log(params.toString)
        params.set('page', '1');
        router.push(`/find?${params.toString()}`, {});
    };

        return (
                <div className="fixed w-full h-16 grid grid-cols-3 grid-rows-1 items-center justify-start py-0 pr-6 pl-6 box-border gap-5 text-left text-17xl text-mediumslateblue font-montserrat">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0" />
                    <div className="w-full flex flex-row col-start-1 col-span-1 items-center justify-self-start">
                        <span className="material-symbols-outlined relative w-9 h-9">menu</span>
                        <b className="relative tracking-[0.31em] [text-shadow:0px_0px_22.4px_#8566e0]">
                            SIVTER
                        </b>
                    </div>
                    <div className="w-full flex flex-col col-start-2 col-span-1 items-start justify-self-center py-[7px] px-0 gap-3 text-5xl text-gray-300">
                        <div className="flex flex-row items-center justify-center gap-5">
                            <input
                                id="search"
                                className="border-none focus:outline-none font-montserrat text-base bg-[transparent] relative text-gray-300 text-left"
                                placeholder="Search for name, genre or category..."
                                type="text"
                                value={searchTerm.q}
                                onChange={handleSearch}
                            />
                            <button className="justify-end cursor-pointer [border:none] p-0 bg-[transparent] relative text-xl font-bold font-montserrat text-pearl-white text-left inline-block [text-shadow:0px_0px_10.6px_rgba(255,_255,_255,_0.25)]" onClick={handleSearch}>
                                EXPLORE
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row col-start-3 col-span-1 items-center justify-self-end gap-5 text-xl text-pearl-white">
                        <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative w-8 h-8">
                            <span className="material-symbols-outlined relative w-8 h-8">favorite</span>
                        </button>
                        <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative w-8 h-8">
                            <span className="material-symbols-outlined relative w-8 h-8">playlist_play</span>
                        </button>
                        <div className="flex flex-row items-center justify-center gap-3">
                            <Link className="cursor-pointer no-underline border:none p-0 bg-[transparent] relative text-xl font-montserrat text-pearl-white text-left inline-block" href={"../login"}>
                                LOGIN
                            </Link>
                            <span className="material-symbols-outlined">account_circle</span>
                        </div>
                    </div>
                </div>
        );
};
export default Header;
