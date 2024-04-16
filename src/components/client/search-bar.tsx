'use client'
import React, {useEffect, useState} from 'react';
import {useSearchParams, useRouter, usePathname} from 'next/navigation';

const SearchBar: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter()
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
        useEffect(() => {
            router.push(`/find?${params.toString()}`, {});
        })
    };

    return (
        <div className="fixed w-full flex flex-row items-center justify-center py-[7px] px-0 gap-4 text-5xl text-gray-300">
            <div className="flex flex-row items-start justify-between gap-5">
                <input
                    id="search"
                    className="justify-start border-none focus:outline-none font-robotomono w-[20rem] text-base bg-[transparent] text-gray-300 text-left"
                    placeholder="Search for name, genre or category..."
                    type="text"
                    value={searchTerm.q}
                    onChange={handleSearch}
                />
                <button
                    className="justify-end cursor-pointer [border:none] p-0 bg-[transparent] text-base font-robotomono text-pearl-white text-left inline-block"
                    onClick={handleSearch}>
                    explore
                </button>
            </div>
        </div>
    );
};
export default SearchBar;
