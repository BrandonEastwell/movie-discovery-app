import React from "react";
import "../../app/styles/globals.css"
import Link from 'next/link'
import Image from 'next/image'
import netflix from '../../images/netflix.svg'
import disney from '../../images/disney.svg'
import primevideo from '../../images/primevideo.svg'

function UserNavigation() {
        return (
                <div className="fixed flex flex-col items-start justify-start overflow-hidden w-52 max-w-[200px] h-screen text-left text-xl text-gray-100 font-robotomono">
                    <div className="self-stretch flex flex-col items-start justify-start pt-4 pb-0 pr-0 pl-6 gap-[10px]">
                        <div className="flex flex-row items-start justify-center gap-[1.5rem]">
                            <span className="material-symbols-outlined w-4 h-4 max-w-[14px] max-h-[14px]">home</span>
                            <Link href="../.." className="lowercase self-stretch relative font-semibold no-underline text-[1rem]">home</Link>
                        </div>
                        <div className="flex flex-row items-start justify-center gap-[1.5rem]">
                            <span className="material-symbols-outlined w-4 h-4 max-w-[14px] max-h-[14px]">psychology</span>
                            <Link href="" className="lowercase self-stretch relative leading-[20px] font-semibold text-[1rem]">suggest me</Link>
                        </div>
                        <div className="flex flex-row items-start justify-center gap-[1.5rem]">
                            <span className="material-symbols-outlined w-4 h-4 max-w-[14px] max-h-[14px]">layers</span>
                            <Link href="" className="lowercase self-stretch relative font-semibold no-underline text-[1rem]">discovery queue</Link>
                        </div>
                        <div className="flex flex-row items-start justify-center gap-[1.5rem]">
                            <span className="material-symbols-outlined w-4 h-4 max-w-[14px] max-h-[14px]">local_fire_department</span>
                            <Link href="../.." className="lowercase self-stretch relative font-semibold no-underline text-[1rem]">trending</Link>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-center py-[15px] pr-0 pl-6 gap-[20px]">
                        <Image
                            className="w-[70px] h-[21.54px] max-w-[70px] max-h-[21.54px]"
                            alt="primevideo"
                            src={primevideo}
                            placeholder="blur"
                            blurDataURL="data:..."
                        />
                        <Image
                            className="w-[60px] h-[32.5px] max-w-[60px] max-h-[16.2px]"
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
                    <div className="flex flex-col items-start justify-start py-0 pr-0 pl-[25px] box-border gap-[25px] text-sm">
                        <div className="self-stretch flex flex-col items-start justify-start gap-[7px]">
                            <div className="self-stretch relative text-base font-semibold text-silver">RECENTLY VIEWED</div>
                            <div className="relative lowercase font-semibold">oppenheimer</div>
                            <div className="relative lowercase font-semibold">BARBIE</div>
                            <div className="relative lowercase font-semibold">PRISONERS</div>
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-start gap-[7px]">
                            <div className="self-stretch relative text-base font-semibold text-silver">BY CATEGORIES</div>
                            <div className="self-stretch relative lowercase font-semibold">TOP WATCHED</div>
                            <div className="self-stretch relative lowercase font-semibold">NEW RELEASE</div>
                            <div className="self-stretch relative lowercase font-semibold">SIMILAR TO</div>
                            <div className="self-stretch relative lowercase font-semibold">NETFLIX ONLY</div>
                        </div>
                        <div className="self-stretch flex flex-col items-start justify-start gap-[7px]">
                            <div className="relative text-base font-semibold text-silver">BY GENRE</div>
                            <div className="relative lowercase font-semibold">ACTION</div>
                            <div className="relative lowercase font-semibold">ADVENTURE</div>
                            <div className="relative lowercase font-semibold">THRILLER</div>
                            <div className="relative lowercase font-semibold">COMEDY</div>
                        </div>
                    </div>
                </div>
        );
}
export default UserNavigation;
