import React from "react";
import "../../app/styles/globals.css"
import Image from 'next/image'
import netflix from '../../images/netflix.svg'
import disney from '../../images/disney.svg'
import primevideo from '../../images/primevideo.svg'
import NavButton from "./NavButton";
import RecentlyViewed from "./RecentlyViewed";

function UserNavigation() {
    const StreamService = ({src} : {src: string}) => {
        return (
            <div className="cursor-pointer bg-[#282828]/40 border-[#132C4F]/[0.04] rounded-xl p-1 px-2.5">
                <Image
                    className="max-w-[70px] max-h-[35px]"
                    alt={src}
                    src={src}
                    placeholder="blur"
                    blurDataURL="data:..."
                />
            </div>
        )
    }

    return (
        <div className="min-w-[200px] max-w-[200px] gap-6 flex flex-col place-items-start font-semibold text-gray-100">
            <nav className="grid grid-cols-1 grid-rows-4 place-items-start font-semibold">
                <NavButton params={{name: "Home", symbol: "home", href: "../.."}} />
                <NavButton params={{name: "Suggest me", symbol: "psychology", href: ""}} />
                <NavButton params={{name: "Discovery queue", symbol: "layers", href: ""}} />
                <NavButton params={{name: "Trending", symbol: "local_fire_department", href: "../.."}} />
            </nav>
            <div className="flex flex-row flex-wrap items-start gap-3">
                <StreamService src={primevideo} />
                <StreamService src={disney} />
                <StreamService src={netflix} />
            </div>
            <div className="flex flex-col w-full place-items-start gap-3 text-[0.65rem]">
                <RecentlyViewed />
                <div className="w-full flex flex-col gap-1.5">
                    <span className="text-2xl text-pearl-white opacity-80 font-vt323 font-semibold px-2">WATCHLISTS</span>
                    <div className="grid grid-cols-[1fr_2fr] grid-rows-[1fr_1fr] w-full cursor-pointer bg-[#282828]/40 border-[#132C4F]/[0.04] rounded-xl">
                        <div className="row-span-2 col-start-1 rounded aspect-square p-2">
                            <div className="bg-white w-full h-full rounded"></div>
                        </div>
                        <span className="row-start-1 col-start-2 p-1 self-end text-sm font-iconsolata text-pearl-white">oppenheimer</span>
                        <span className="row-start-2 col-start-2 p-1 self-start text-xs opacity-80 font-iconsolata">something</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserNavigation;
