import React from "react";
import "../../app/styles/globals.css"
import Image from 'next/image'
import netflix from '../../images/netflix.svg'
import disney from '../../images/disney.svg'
import primevideo from '../../images/primevideo.svg'
import NavButton from "../NavButton";

function UserNavigation() {
        return (
                <div className="fixed flex flex-col place-items-start overflow-hidden w-52 max-w-[200px] text-xl text-gray-100">
                    <div className="grid grid-cols-1 grid-rows-4 place-items-start">
                        <NavButton params={{name: "home", symbol: "home", href: "../.."}} />
                        <NavButton params={{name: "suggest me", symbol: "psychology", href: ""}} />
                        <NavButton params={{name: "discovery queue", symbol: "layers", href: ""}} />
                        <NavButton params={{name: "trending", symbol: "local_fire_department", href: "../.."}} />
                    </div>
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
                        <div className="self-stretch flex flex-col items-start justify-start gap-[7px]">
                            <div className="self-stretch relative text-sm font-robotomono text-silver">RECENTLY VIEWED</div>
                            <div className="relative lowercase font-robotomono">oppenheimer</div>
                            <div className="relative lowercase font-robotomono">BARBIE</div>
                            <div className="relative lowercase font-robotomono">PRISONERS</div>
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-start gap-[7px]">
                            <div className="self-stretch relative text-sm font-robotomono text-silver">BY CATEGORIES</div>
                            <div className="self-stretch relative lowercase font-robotomono">TOP WATCHED</div>
                            <div className="self-stretch relative lowercase font-robotomono">NEW RELEASE</div>
                            <div className="self-stretch relative lowercase font-robotomono">SIMILAR TO</div>
                            <div className="self-stretch relative lowercase font-robotomono">NETFLIX ONLY</div>
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-start gap-[7px]">
                            <div className="relative text-sm font-robotomono text-silver">BY GENRE</div>
                            <div className="relative lowercase font-robotomono">ACTION</div>
                            <div className="relative lowercase font-robotomono">ADVENTURE</div>
                            <div className="relative lowercase font-robotomono">THRILLER</div>
                            <div className="relative lowercase font-robotomono">COMEDY</div>
                        </div>
                    </div>
                </div>
        );
}

export default UserNavigation;
