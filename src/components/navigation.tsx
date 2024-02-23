import React from "react";
import "../app/styles/globals.css"
import Link from 'next/link'
import Image from 'next/image'
import netflix from '../images/netflix.svg'
import disney from '../images/disney.svg'
import primevideo from '../images/primevideo.svg'


function Navigation() {
        return (
            <div className="fixed overflow-hidden overflow-y-auto w-64 h-screen text-left text-xl text-gray-100 font-montserrat">
                <div className="top-[0px] left-[0px] w-64 flex flex-col items-start justify-start pt-4 px-0 pb-0 box-border gap-[24px]">
                    <div className="self-stretch flex flex-row items-center justify-start pt-4 pb-0 pr-0 pl-6 gap-[10px]">
                        <div className="flex flex-col items-start justify-start gap-[24px]">
                            <span className="material-symbols-outlined relative w-9 h-9">home</span>
                            <span className="material-symbols-outlined relative w-9 h-9">psychology</span>
                            <span className="material-symbols-outlined relative w-9 h-9">layers</span>
                            <span className="material-symbols-outlined relative w-9 h-9">play_arrow</span>
                            <span className="material-symbols-outlined relative w-9 h-9">local_fire_department</span>
                        </div>
                        <div className="w-44 flex flex-col items-start justify-start gap-[25px]">
                            <Link href="../" className="self-stretch relative font-semibold no-underline">Home</Link>
                            <Link  href="" className="self-stretch relative leading-[20px] font-semibold [background:linear-gradient(180deg,_#8a72d0,_#5f43b2)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] no-underline">Suggest Me</Link >
                            <Link  href="" className="self-stretch relative font-semibold no-underline">Discovery Queue</Link >
                            <Link  href="../" className="self-stretch relative font-semibold no-underline">Movies & TV</Link >
                            <Link  href="../" className="self-stretch relative font-semibold no-underline">Trending</Link >
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-center py-[15px] pr-0 pl-6 gap-[20px]">
                        <Image
                            className="relative w-[82px] h-[25.2px]"
                            alt="primevideo"
                            src={primevideo}
                            placeholder="blur"
                            blurDataURL="data:..."
                        />
                        <Image
                            className="relative w-[75px] h-[40.6px]"
                            alt="disney"
                            src={disney}
                            placeholder="blur"
                            blurDataURL="data:..."
                        />
                        <Image
                            className="relative w-[68px] h-[19px] overflow-hidden shrink-0"
                            alt="netflix"
                            src={netflix}
                            placeholder="blur"
                            blurDataURL="data:..."
                        />
                    </div>
                    <div className="w-[159px] flex flex-col items-start justify-start py-0 pr-0 pl-[25px] box-border gap-[25px] text-sm">
                        <div className="self-stretch flex flex-col items-start justify-start gap-[7px]">
                            <div className="self-stretch relative text-base font-semibold text-silver">
                                RECENTLY VIEWED
                            </div>
                            <div className="relative lowercase font-semibold inline-block w-[119px]">
                                oppenheimer
                            </div>
                            <div className="relative lowercase font-semibold">BARBIE</div>
                            <div className="relative lowercase font-semibold">PRISONERS</div>
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-start gap-[7px]">
                            <div className="self-stretch relative text-base font-semibold text-silver">
                                BY CATEGORIES
                            </div>
                            <div className="self-stretch relative lowercase font-semibold">
                                TOP WATCHED
                            </div>
                            <div className="self-stretch relative lowercase font-semibold">
                                NEW RELEASE
                            </div>
                            <div className="self-stretch relative lowercase font-semibold">
                                SIMILAR TO
                            </div>
                            <div className="self-stretch relative lowercase font-semibold">
                                NETFLIX ONLY
                            </div>
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-start gap-[7px]">
                            <div className="relative text-base font-semibold text-silver">
                                BY GENRE
                            </div>
                            <div className="relative lowercase font-semibold">ACTION</div>
                            <div className="relative lowercase font-semibold">ADVENTURE</div>
                            <div className="relative lowercase font-semibold">THRILLER</div>
                            <div className="relative lowercase font-semibold">COMEDY</div>
                        </div>
                    </div>
                </div>
            </div>
        );
}
export default Navigation;
