'use client'
import React, {useEffect, useState} from 'react';
import {useSearchParams, useRouter, usePathname} from 'next/navigation';

const SearchBar: React.FC = () => {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState({
        q: "",
        page: "",
        sort: ""
    });

    const handleSearch = () => {
        const params = new URLSearchParams();
        Object.entries(searchTerm).forEach(([key, value]) => {
            if (value) {
                params.set(key, value);
            }
        });
        router.push(`/find?${params.toString()}`, {});
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget;
        const updatedQuery= { ...searchTerm, q: value};
        setSearchTerm(updatedQuery)
        handleSearch();
    };

    return (
        <div className="fixed max-w-[1920px] w-full flex flex-row items-center justify-center py-[7px] px-0 gap-4 text-5xl text-gray-300">
            <div className="flex flex-row items-start justify-between gap-5">
                <input
                    id="search"
                    className="justify-start text-left border-none focus:outline-none font-robotomono w-[20rem] text-base bg-[transparent] text-gray-300"
                    placeholder="Search for name, genre or category..."
                    type="text"
                    value={searchTerm.q}
                    onChange={handleChange}
                />
                <button
                    className="justify-end text-right cursor-pointer [border:none] p-0 bg-[transparent] text-base font-robotomono text-pearl-white inline-block"
                    onClick={handleSearch}>
                    explore
                </button>
            </div>
        </div>
    );
};
export default SearchBar;
