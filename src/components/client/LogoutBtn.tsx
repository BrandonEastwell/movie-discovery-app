"use client"
import {motion} from "framer-motion";
import React from "react";
import {useRouter} from "next/navigation";
import LogoutSymbol from "../../assets/logout_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg"

export default function LogoutBtn() {
    const router = useRouter();

    async function onLogout() {
        const response = await fetch('/api/account/logout', {
            method: 'POST',
        })

        if (response.ok) {
            router.push("/");
        }
    }

    const containerVariants = {
        hover: {
            backgroundColor: 'rgba(40, 40, 40, 0.8)',
            transition: {
                duration: 0.1,
                ease: "easeInOut"
            }
        },
        tap: {
            scale: 0.9,
            transition: {
                duration: 0.1,
                ease: "easeInOut"
            }
        }
    }

    const textVariants = {
        hover: {
            color: '#9673f5',
            transition: {
                duration: 0.1,
                ease: "easeInOut"
            }
        }
    }

    return (
        <motion.div onClick={onLogout} variants={containerVariants} whileHover={'hover'} whileTap={'tap'} className="cursor-pointer flex flex-row gap-[1rem] bg-[#282828]/60 border-[#132C4F]/[0.04] place-items-center p-1 px-3 mt-2 rounded-xl">
            <motion.span variants={textVariants}><LogoutSymbol fill="currentColor"/></motion.span>
            <motion.button variants={textVariants}
                           className="cursor-pointer no-underline bg-transparent p-0 font-iconsolata text-base font-bold text-pearl-white">Logout</motion.button>
        </motion.div>
    )
}