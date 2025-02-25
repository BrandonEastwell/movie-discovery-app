'use client'
import Link from "next/link";
import React from "react";

export default function NavBtn({ params } : { params: { name: string, symbol: string, href: string }}) {
    const { name, symbol, href } = params;
    return (
        <div className="flex flex-row gap-[1rem] place-items-center pt-4">
            <span className="material-symbols-outlined text-[1rem] text-pearl-white">{symbol}</span>
            <Link href={href} className="lowercase no-underline text-[1rem] text-pearl-white font-robotomono">{name}</Link>
        </div>
    )
}