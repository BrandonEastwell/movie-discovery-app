import React from "react";
import "../../app/styles/globals.css"
import Image from 'next/image'
import netflix from '../../images/netflix.svg'
import disney from '../../images/disney.svg'
import primevideo from '../../images/primevideo.svg'
import NavButton from "./NavButton";

function UserNavigation() {
        return (
                <div className="min-w-[200px] flex flex-col place-items-start font-semibold text-gray-100">
                    <nav className="grid grid-cols-1 grid-rows-4 place-items-start font-semibold">
                        <NavButton params={{name: "Home", symbol: "home", href: "../.."}} />
                        <NavButton params={{name: "Suggest me", symbol: "psychology", href: ""}} />
                        <NavButton params={{name: "Discovery queue", symbol: "layers", href: ""}} />
                        <NavButton params={{name: "Trending", symbol: "local_fire_department", href: "../.."}} />
                    </nav>
                    <div className="flex flex-col items-start justify-center py-[25px] gap-[20px]">
                        <Image
                            className="max-w-[70px] max-h-[32px]"
                            alt="primevideo"
                            src={primevideo}
                            placeholder="blur"
                            blurDataURL="data:..."
                        />
                        <Image
                            className="max-w-[70px] max-h-[32px]"
                            alt="disney"
                            src={disney}
                            placeholder="blur"
                            blurDataURL="data:..."
                        />
                        <Image
                            className="max-w-[70px] max-h-[32px]"
                            alt="netflix"
                            src={netflix}
                            placeholder="blur"
                            blurDataURL="data:..."
                        />
                    </div>
                    <div className="flex flex-col place-items-start box-border gap-[25px] text-[0.65rem]">
                        <div className="flex flex-col items-start justify-start gap-[7px]">
                            <div className="text-sm text-silver font-vt323">RECENTLY VIEWED</div>
                            <div className="lowercase">oppenheimer</div>
                            <div className="lowercase">BARBIE</div>
                            <div className="lowercase">PRISONERS</div>
                        </div>
                        <div className="flex flex-col items-start justify-start gap-[7px]">
                            <div className="text-sm text-silver font-vt323">BY CATEGORIES</div>
                            <div className="lowercase">TOP WATCHED</div>
                            <div className="lowercase">NEW RELEASE</div>
                            <div className="lowercase">SIMILAR TO</div>
                            <div className="lowercase">NETFLIX ONLY</div>
                        </div>
                        <div className="flex flex-col items-start justify-start gap-[7px]">
                            <div className="text-sm text-silver font-vt323">BY GENRE</div>
                            <div className="lowercase">ACTION</div>
                            <div className="lowercase">ADVENTURE</div>
                            <div className="lowercase">THRILLER</div>
                            <div className="lowercase">COMEDY</div>
                        </div>
                    </div>
                </div>
        );
}

export default UserNavigation;
