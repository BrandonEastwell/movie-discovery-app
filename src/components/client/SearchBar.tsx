'use client'
import React, {useCallback, useEffect, useState} from 'react';
import {usePathname, useRouter} from 'next/navigation';
import {AnimatePresence, motion} from 'framer-motion';
import FilterIcon from '../../assets/tune_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg'

const SearchBar: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [shineActive, setShineActive] = useState(false);
    const [filterActive, setFilterActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState({
        q: "",
        page: "",
        sort: ""
    });

    useEffect(() => {
        triggerFilter(false)
        setLoading(true);
        setTimeout(() => setLoading(false), 5000)
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
        if (pathname.startsWith("/find")) setFilterActive(true);
        else setFilterActive(show);
    }

    const triggerShine = () => {
        setShineActive(true);
        setTimeout(() => setShineActive(false), 400);
    };

    return (
        <div className="relative flex flex-row items-start gap-2">
            <motion.div animate={filterActive ? {left: -30} : {left: 0}} className="relative h-full rounded-xl p-[1px] overflow-hidden">
                <AnimatePresence>
                    {loading && (
                        <motion.div
                            initial={{ opacity: 0, rotate: 0 }}
                            animate={{ opacity: 1, rotate: 360 }}
                            exit={{ opacity: 0 }}
                            transition={{
                                rotate: { repeat: Infinity, ease: "linear", duration: 5 }
                            }}
                            className="absolute top-[-400px] left-[-400px] w-screen h-screen z-0"
                            style={{
                                background: 'conic-gradient(from 0deg, #8566e0, #121212, #5F43B2, #8566e0)',
                            }}
                        />
                    )}
                </AnimatePresence>
                <motion.div
                    className="relative h-full flex flex-row items-start justify-between bg-[#282828] px-2.5 rounded-xl overflow-hidden">
                    <input
                        id="search"
                        className="justify-start self-center p-0 font-iconsolata text-base focus:outline-none w-[20rem] bg-[transparent] placeholder:text-gray-400 text-pearl-white"
                        placeholder="Search by name, genre or category..."
                        type="text"
                        value={searchTerm.q}
                        onChange={handleChange}
                        onFocus={() => {
                            triggerShine()
                            triggerFilter(true)
                        }}
                        onBlur={() => triggerFilter(false)}
                    />
                    <button
                        className="font-iconsolata p-0 text-base justify-end place-self-center cursor-pointer bg-[transparent] text-pearl-white hover:underline"
                        onClick={handleSearch}>
                        explore
                    </button>
                    {shineActive && (
                        <motion.div
                            initial={{ left: -20, opacity: 0.3 }}
                            animate={{ left: "120%", opacity: [0.3, 0.25, 0.1] }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="absolute top-[-10px] left-0 w-[40px] h-[75px] bg-gradient-to-r from-transparent via-white to-transparent -rotate-12"
                        />
                    )}
                </motion.div>
            </motion.div>
            <AnimatePresence>
                {filterActive && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        whileHover={{color: "#9673f5"}}
                        whileTap={{scale: 0.9}}
                        transition={{duration: 0.1}}
                        className="absolute flex justify-center items-center top-0 -right-7 h-full aspect-square rounded-full bg-[#282828]/60 border-solid border border-[#3E3E3E]/20 cursor-pointer"
                    ><FilterIcon fill="currentColor" /></motion.button>
                )}
            </AnimatePresence>
        </div>

    );
};
export default SearchBar;
