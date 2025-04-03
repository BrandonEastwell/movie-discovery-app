'use client'
import React, {useCallback, useState} from 'react';
import {useRouter} from 'next/navigation';

const SearchBar: React.FC = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState({
        q: "",
        page: "",
        sort: ""
    });
    const isInitialRender = React.useRef(true);

    const handleSearch = () => {
        const params = new URLSearchParams();
        Object.entries(searchTerm).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            }
        });
        router.push(`/find?${params.toString()}`);
    };

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(prevState => ({...prevState, q: e.target.value}));
    }, []);

    return (
        <div className="max-w-[1920px] w-full flex flex-row place-content-center gap-4">
            <div className="flex flex-row items-start justify-between gap-5 bg-[#282828]/80 border-[#132C4F]/[0.04] rounded-xl p-1">
                <input
                    id="search"
                    className="justify-start font-iconsolata text-base focus:outline-none w-[20rem] bg-[transparent] placeholder:text-gray-300 text-pearl-white"
                    placeholder="Search by name, genre or category..."
                    type="text"
                    value={searchTerm.q}
                    onChange={handleChange}
                />
                <button
                    className="font-iconsolata text-base justify-end place-self-center cursor-pointer bg-[transparent] text-pearl-white hover:underline"
                    onClick={handleSearch}>
                    explore
                </button>
            </div>
        </div>
    );
};
export default SearchBar;
