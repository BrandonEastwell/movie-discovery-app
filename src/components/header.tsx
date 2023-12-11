'use client'
import React, { useState } from 'react';
import "../app/styles/globals.css"
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
interface HeaderProps {
    onSearch: (searchTerm: string) => void;
}
const Header: React.FC = () => {
    const searchParams = useSearchParams()
    const pathname = usePathname();
    const { replace } = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = () => {
        console.log(`Searching... ${searchTerm}`);
        const params = new URLSearchParams(searchParams);
        if (searchTerm) {
            params.set('query', searchTerm);
        } else {
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    };

        return (
                <div className="fixed w-screen h-16 flex flex-row items-center justify-start py-0 pr-0 pl-6 box-border gap-[15vw] text-left text-17xl text-mediumslateblue font-montserrat">
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,1,0" />
                    <div className="shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] flex flex-row items-center justify-start gap-[15px]">
                        <span className="material-symbols-outlined relative w-8 h-8">menu</span>
                        <b className="relative tracking-[0.31em] [text-shadow:0px_0px_22.4px_#8566e0]">
                            SIVTER
                        </b>
                    </div>
                    <div className="flex flex-col items-start justify-start py-[7px] px-0 gap-[15px] text-5xl text-gray-300">
                        <div className="w-[663px] flex flex-row items-center justify-start gap-[80px]">
                            <input
                                id="search"
                                className="[border:none] w-[500px] font-montserrat text-5xl bg-[transparent] relative text-gray-300 text-left"
                                placeholder="Search for name, genre or category..."
                                type="text"
                                defaultValue={searchParams.get('query')?.toString()}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-xl font-bold font-montserrat text-pearl-white text-left inline-block [text-shadow:0px_0px_10.6px_rgba(255,_255,_255,_0.25)]" onClick={handleSearch}>
                                EXPLORE
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row items-center justify-start gap-[20px] text-xl text-pearl-white">
                        <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative w-8 h-8">
                            <span className="material-symbols-outlined relative w-8 h-8">favorite</span>
                        </button>
                        <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative w-[42px] h-[42px]">
                            <span className="material-symbols-outlined relative w-8 h-8">playlist_play</span>
                        </button>
                        <div className="h-[58px] flex flex-row items-center justify-start gap-[12px]">
                            <button className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-xl font-montserrat text-pearl-white text-left inline-block">
                                LOGIN
                            </button>
                            <span className="material-symbols-outlined">account_circle</span>
                        </div>
                    </div>
                </div>
        );
};
export default Header;