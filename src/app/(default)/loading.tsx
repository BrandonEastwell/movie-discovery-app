import React from "react";

export default function Loading() {
    const arr = Array.from({ length: 10 }, (_, i) => i);

    const Item = () => (
        <div className="mr-10 flex flex-col w-full max-h-[325px] max-w-[250px] animate-pulse">
            <div className="h-[325px] w-[250px] blur-lg bg-neutral-800/20" />
            <p className="px-3 m-0 text-3xl uppercase text-pearl-white font-vt323">
                LOREM IPSUM
            </p>
        </div>
    )

    return (
        <div className="w-full flex flex-col gap-5 justify-start font-vt323 blur-lg overflow-hidden no-scrollbar">
            <h2 className="flex items-center text-[3rem] text-pearl-white ml-2 font-medium">
                LOREM IPSUM
            </h2>
            <div className="flex w-full h-full flex-row gap-[3rem] no-scrollbar">
                {arr.map((_, i) => (
                    <Item key={i} />
                ))}
            </div>
            <h2 className="flex items-center text-[3rem] text-pearl-white mt-4 ml-2 font-medium">
                LOREM IPSUM
            </h2>
            <div className="flex w-full h-full flex-row gap-[3rem] no-scrollbar">
                {arr.map((_, i) => (
                    <Item key={i} />
                ))}
            </div>
            <h2 className="flex items-center text-[3rem] text-pearl-white mt-4 ml-2 font-medium">
                LOREM IPSUM
            </h2>
            <div className="flex w-full h-full flex-row gap-[3rem] no-scrollbar">
                {arr.map((_, i) => (
                    <Item key={i} />
                ))}
            </div>
            <h2 className="flex items-center text-[3rem] text-pearl-white mt-4 ml-2 font-medium">
                LOREM IPSUM
            </h2>
            <div className="flex w-full h-full flex-row gap-[3rem] no-scrollbar">
                {arr.map((_, i) => (
                    <Item key={i} />
                ))}
            </div>
        </div>
    )
}