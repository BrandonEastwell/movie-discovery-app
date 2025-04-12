"use server"
import React, {ComponentType, SVGProps} from "react";
import "../../app/globals.css"
import Netflix from '../../assets/netflix.svg'
import Disney from '../../assets/disney.svg'
import PrimeVideo from '../../assets/primevideo.svg'
import NavButton from "../buttons/NavButton";
import RecentlyViewed from "../RecentlyViewed";

async function UserNavigation() {
    const StreamService = ({Logo} : {Logo: ComponentType<SVGProps<SVGSVGElement>>}) => {
        return (
            <div className="cursor-pointer bg-[#282828]/40 border-[#132C4F]/[0.04] rounded-xl p-1 px-2.5">
                <Logo className="max-w-[70px] max-h-[35px]" />
            </div>
        )
    }

    /*
      <NavButton params={{name: "Suggest me", symbol: "psychology", href: ""}} />
      <NavButton params={{name: "Discovery queue", symbol: "layers", href: ""}} />
      <NavButton params={{name: "Trending", symbol: "local_fire_department", href: "../.."}} />
    */

    return (
        <div className="min-w-[200px] max-w-[200px] gap-6 flex flex-col place-items-start font-semibold text-gray-100">
            <nav className="grid grid-cols-1 grid-rows-4 place-items-start font-semibold gap-1">
                <NavButton params={{name: "Home", symbol: "home", href: "../.."}} />
                <NavButton params={{name: "Suggest me", symbol: "psychology", href: ""}} />
                <NavButton params={{name: "Discovery queue", symbol: "layers", href: ""}} />
                <NavButton params={{name: "Trending", symbol: "local_fire_department", href: "../.."}} />
            </nav>
            <div className="flex flex-row flex-wrap items-start gap-3">
                <StreamService Logo={PrimeVideo} />
                <StreamService Logo={Disney} />
                <StreamService Logo={Netflix} />
            </div>
            <div className="flex flex-col w-full place-items-start gap-3 text-[0.65rem]">
                <RecentlyViewed />
            </div>
        </div>
    );
}

export default UserNavigation;
