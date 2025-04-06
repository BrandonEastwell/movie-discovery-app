"use client"
import React, {useState} from 'react';
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {AnimatePresence, motion} from "framer-motion";
import {createWatchlist} from "../../lib/api/client/watchlist";

const WatchlistForm = (({isFormVisible, setIsFormVisible} : {isFormVisible: boolean, setIsFormVisible: (visible : boolean) => void}) => {
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [name, setName] = useState<string>('');
    const [description, setDesc] = useState<string>('');

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        setName(event.target.value);
    };

    const handleDescChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        event.stopPropagation();
        setDesc(event.target.value);
    };

    const handleCreatePlaylist = async (event: React.FormEvent) => {
        event.stopPropagation();
        event.preventDefault();

        const response = await createWatchlist(name, description);
        if (response) {
            if (response.success) setMessage(response.result);
            else setError(response.error);
        }
    };

    return (
        isFormVisible && (
            <AnimatePresence>
                <motion.div initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                            className="fixed max-w-[500px] w-full backdrop-blur-[20px] bg-white/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl z-20 overflow-hidden">
                    <div className="bg-midnight/90 p-4">
                        <div className="flex w-full justify-end">
                            <button onClick={(event) => { event.stopPropagation(); setIsFormVisible(false)}} className="bg-transparent cursor-pointer">
                                <FontAwesomeIcon className="text-pearl-white" icon={faXmark} size="xl"/>
                            </button>
                        </div>
                        <h1 className="text-center mx-2 text-4xl text-pearl-white font-bold">Create Watchlist</h1>
                        <form onClick={(e) => e.stopPropagation()} className="w-3/4 flex flex-col gap-4 pb-5 place-self-center font-iconsolata">
                            <p className="text-left mb-0 text-xl text-pearl-white font-bold">watchlist name</p>
                            <div className="rounded bg-[#121212] py-3 px-3 overflow-hidden">
                                <input className="w-full border-none outline-none font-iconsolata text-lg text-silver bg-transparent"
                                       type="text"
                                       id="name"
                                       placeholder=""
                                       value={name}
                                       onChange={handleNameChange}
                                       onClick={(e) => e.stopPropagation()}
                                       onFocus={(e) => e.stopPropagation()}
                                       required
                                       maxLength={26}
                                />
                            </div>
                            <p className="text-left mb-0 text-xl text-pearl-white font-bold">watchlist description</p>
                            <div className="rounded bg-[#121212] py-3 px-3 overflow-hidden">
                                <textarea className="w-full border-none outline-none font-iconsolata text-lg text-silver bg-transparent"
                                          id="desc"
                                          value={description}
                                          onChange={handleDescChange}
                                          onClick={(e) => e.stopPropagation()}
                                          onFocus={(e) => e.stopPropagation()}
                                          required
                                          cols={5}
                                />
                            </div>
                            <button className="font-iconsolata text-lg bg-Purple text-pearl-white text-center rounded-2xl p-3 cursor-pointer"
                                type="submit" onClick={handleCreatePlaylist}>create watchlist
                            </button>
                            <div className="message-handle w-full flex flex-col">
                                {message && <p className="font-michroma text-Purple text-[1rem] m-1">{message}</p>}
                                {error && <p className="font-michroma text-red-800 text-[1rem] m-1">{error}</p>}
                            </div>
                        </form>
                    </div>
                </motion.div>
            </AnimatePresence>
        ))
});

export default WatchlistForm;