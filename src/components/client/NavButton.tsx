'use client'
import Link from "next/link";
import React from "react";
import {useRouter} from "next/navigation";
import { motion } from "framer-motion";

export default function NavButton({ params } : { params: { name: string, symbol: string, href: string }}) {
    const { name, symbol, href } = params;
    const router = useRouter();

    function onNavClick() {
        router.push(href)
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
        <motion.div variants={containerVariants} whileHover={'hover'} whileTap={'tap'} className="cursor-pointer flex flex-row gap-[1rem] bg-[#282828]/80 border-[#132C4F]/[0.04] place-items-center p-1 px-3 mt-2 rounded-xl">
            <Link href={href}>
                <motion.span variants={textVariants} className="material-symbols-outlined text-sm text-pearl-white">{symbol}</motion.span>
            </Link>
            <motion.button variants={textVariants}
                           onClick={onNavClick}
                           className="cursor-pointer no-underline bg-transparent p-0 font-iconsolata text-base font-bold text-pearl-white">{name}</motion.button>
        </motion.div>
    )
}