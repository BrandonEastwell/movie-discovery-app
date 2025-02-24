'use client'
import React from "react";
import "../../app/styles/globals.css"
import Link from 'next/link'
import Image from 'next/image'
import netflix from '../../images/netflix.svg'
import disney from '../../images/disney.svg'
import primevideo from '../../images/primevideo.svg'

function UserNavigation() {
        return (
                <div className="fixed flex flex-col items-start justify-start overflow-hidden w-52 max-w-[200px] text-left text-xl text-gray-100">
                    <div className="self-stretch flex flex-col items-start justify-start pt-4 pb-0 pr-0 pl-6 gap-[1rem] text-pearl-white">
                        <div className="flex flex-row items-start justify-center gap-[1.5rem]">
                            <span className="material-symbols-outlined text-[1rem]">home</span>
                            <Link href="../.." className="lowercase self-stretch relative no-underline text-[1rem] text-pearl-white font-robotomono">home</Link>
                        </div>
                        <div className="flex flex-row items-start justify-center gap-[1.5rem]">
                            <span className="material-symbols-outlined text-[1rem] text-Purple">psychology</span>
                            <Link href="" className="lowercase self-stretch relative no-underline leading-[20px] text-[1rem] text-Purple font-robotomono">suggest me</Link>
                        </div>
                        <div className="flex flex-row items-start justify-center gap-[1.5rem]">
                            <span className="material-symbols-outlined text-[1rem]">layers</span>
                            <Link href="" className="lowercase self-stretch relative no-underline text-[1rem] text-pearl-white font-robotomono">discovery queue</Link>
                        </div>
                        <div className="flex flex-row items-start justify-center gap-[1.5rem]">
                            <span className="material-symbols-outlined text-[1rem]">local_fire_department</span>
                            <Link href="../.." className="lowercase self-stretch relative no-underline text-[1rem] text-pearl-white font-robotomono">trending</Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-center py-[25px] pr-0 pl-6 gap-[20px]">
                        <Image
                            className="w-[70px] h-[21.54px] max-w-[70px] max-h-[21.54px]"
                            alt="primevideo"
                            src={primevideo}
                            placeholder="blur"
                            blurDataURL="data:..."
                        />
                        <Image
                            className="w-[60px] h-[32.5px] max-w-[60px] max-h-[32.5px]"
                            alt="disney"
                            src={disney}
                            placeholder="blur"
                            blurDataURL="data:..."
                        />
                        <Image
                            className="w-[58px] h-[16.2px] max-w-[58px] max-h-[16.2px]"
                            alt="netflix"
                            src={netflix}
                            placeholder="blur"
                            blurDataURL="data:..."
                        />
                    </div>
                    <div className="flex flex-col items-start justify-start py-0 pr-0 pl-[25px] box-border gap-[25px] text-[0.65rem]">
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
