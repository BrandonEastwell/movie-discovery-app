"use client"
import React, {useState} from "react";
import WatchlistForm from "../form/WatchlistForm";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import {Watchlists} from "../../lib/utils/types/watchlist";

export default function CreateWatchlistBtn({setWatchlists} : {setWatchlists?: React.Dispatch<React.SetStateAction<Watchlists[]>>}) {
    const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

    return (
        <>
            <motion.button initial={{backgroundColor: '#212121'}} whileHover={{backgroundColor: '#333333'}}
                           onClick={(event) => {
                               event.stopPropagation();
                               setIsFormVisible(true);
                           }}
                    className="rounded cursor-pointer text-left p-2 bg-[transparent] text-gray-100 font-iconsolata opacity-75">
                + New watchlist
            </motion.button>
            {isFormVisible && ReactDOM.createPortal(<WatchlistForm setWatchlists={setWatchlists}
                setIsFormVisible={(visible: boolean) => setIsFormVisible(visible)} isFormVisible={isFormVisible} />, document.body)}
        </>
    )
}
