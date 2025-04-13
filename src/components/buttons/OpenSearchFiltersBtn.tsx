import {AnimatePresence, motion} from "framer-motion";
import React, {useState} from "react";
import FilterIcon from "../../assets/tune_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg";
import ReactDOM from "react-dom";
import PopupBackground from "../forms/PopupBackground";

export default function OpenSearchFiltersBtn() {
    const [cursorPos, setCursorPos] = useState<{x: number, y:number}>({x: 0, y: 0});
    const [showFilter, setShowFilter] = useState<boolean>(false);
    const offsetY = 15;
    const offsetX = 100;

    const showFilters = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const { clientX, clientY } = event;
        setCursorPos({x: clientX, y: clientY});
        setShowFilter(true);
    }

    return (
        <AnimatePresence>
            <div className="absolute -right-7 h-full">
                <motion.button
                    onClick={showFilters}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    whileHover={{color: "#9673f5"}}
                    whileTap={{scale: 0.9}}
                    transition={{duration: 0.1}}
                    className="flex justify-center items-center h-full aspect-square rounded-full bg-[#282828]/60 border-solid border border-[#3E3E3E]/20 cursor-pointer"
                ><FilterIcon fill="currentColor" /></motion.button>
                {showFilter && ReactDOM.createPortal(
                    <PopupBackground setIsVisible={setShowFilter} blur={false}>
                        <motion.div
                            data-testid="filter-options"
                            onClick={(event) => event.stopPropagation()}
                            style={{left: `${cursorPos.x - offsetX}px`, top: `${cursorPos.y + offsetY}px`}}
                            initial={{ height: 0 }}
                            animate={{ height: "600px" }}
                            exit={{ height: 0 }}
                            className="absolute min-w-[200px] backdrop-blur-[40px] bg-[#212121]/80 border rounded-xl z-30">
                            <div className="flex flex-col gap-1">

                            </div>
                        </motion.div>
                    </PopupBackground>, document.body
                )}
            </div>
        </AnimatePresence>
    )
}