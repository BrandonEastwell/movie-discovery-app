'use client'
import React, {useCallback, useEffect, useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {AnimatePresence, motion} from 'framer-motion';
import OpenSearchFiltersBtn from "../buttons/OpenSearchFiltersBtn";

const SearchBar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [shineActive, setShineActive] = useState(false);
    const [showFilterBtn, setShowFilterBtn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState(false);
    const [searchTerm, setSearchTerm] = useState({
        q: "",
        page: "",
        sort: ""
    });

    useEffect(() => {
        triggerFilter(false)
        setLoading(true);
        setTimeout(() => setLoading(false), 2500)
    },[pathname]);

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

    const triggerFilter = (show: boolean) => {
        if (pathname.startsWith("/find")) setShowFilterBtn(true);
        else setShowFilterBtn(show);
    }

    const triggerShine = () => {
        setShineActive(true);
        setTimeout(() => setShineActive(false), 400);
    };

    return (
        <div className="relative flex flex-row items-start gap-2">
            <motion.div animate={showFilterBtn ? {left: -30} : {left: 0}} className="relative h-full rounded-xl p-[1px] overflow-hidden">
                <AnimatePresence>
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0, rotate: 0 }}
                            animate={{ opacity: 1, rotate: 360 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                rotate: { repeat: Infinity, ease: "linear", duration: 2.5 }
                            }}
                            className="absolute top-[-400px] left-[-400px] w-screen h-screen z-0"
                            style={{
                                background: 'conic-gradient(from 0deg, #8566e0, #121212, #5F43B2, #8566e0)',
                            }}
                        />
                    )}
                </AnimatePresence>
                <div className="relative h-full flex flex-row items-start justify-between bg-[#181818] px-2.5 rounded-xl overflow-hidden">
                    {shineActive && (
                        <motion.div
                            initial={{ left: -20, opacity: 0.3 }}
                            animate={{ left: "100%", opacity: [0.3, 0.25, 0.1] }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="z-20 absolute top-[-10px] left-0 w-[40px] h-[75px] blur bg-gradient-to-r from-transparent via-white to-transparent -rotate-12"
                        />
                    )}
                    <motion.input
                        id="search"
                        className="z-10 justify-start self-center p-0 font-iconsolata text-base focus:outline-none w-[20rem] bg-[transparent] placeholder:text-gray-400 text-pearl-white"
                        placeholder="Search by name, genre or category..."
                        type="text"
                        value={searchTerm.q}
                        onChange={handleChange}
                        onFocus={() => {
                            triggerShine()
                            triggerFilter(true)
                            setFocused(true)
                        }}
                        onBlur={() => {
                            setFocused(false)
                        }}
                    />
                    <button
                        className="z-10 font-iconsolata p-0 text-base justify-end place-self-center cursor-pointer bg-[transparent] text-pearl-white hover:underline"
                        onClick={handleSearch}>
                        explore
                    </button>
                    <motion.div initial={{width: "0%", opacity: 0 }} animate={focused ? {width: "100%", opacity: 1 } : {width: "0%", opacity: 0 }} exit={{width: "0%", opacity: 0 }}
                                    transition={{ delay: 0.1, duration: 0.75, ease: "linear" }}
                                    className="absolute left-0 h-full blur bg-[#282828]"/>
                </div>
            </motion.div>
            {showFilterBtn && (
                <OpenSearchFiltersBtn />
            )}
        </div>

    );
};
export default SearchBar;
