import "../../styles/globals.css"
import React from "react";
import {PrismaClient} from "@prisma/client";
import Link from "next/link";

export async function Page({ params }: { params: { id: string } }) {
    const prisma = new PrismaClient();
    const { id } = params;
    const favouriteMovies= await prisma.favouritemovies.findMany({
        where: {
            userid: parseInt(id)
        },
    });

    const watchlistMovies= await prisma.userplaylist.findMany({
        where: {
            userid: parseInt(id)
        },
    });

    const accountDetails = await prisma.accounts.findFirst({
        where: {
            userid: parseInt(id)
        },
    });

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const month = monthNames[accountDetails?.createdat?.getMonth() || 0]; // Use 0 as fallback if getMonth() returns undefined

    const formattedDate = `Member since ${accountDetails?.createdat?.getDate()} ${month} ${accountDetails?.createdat?.getFullYear()}`;



    return (
        <div className="w-full h-100 flex flex-col justify-start overflow-auto no-scrollbar">
            <div className="flex flex-row flex-nowrap justify-start mt-4">
                <b className="flex items-center text-[4rem] font-vt323 text-pearl-white mt-4 font-medium uppercase">
                    {accountDetails?.username}
                </b>
                <p className="text-[0.75rem] text-gray-100 opacity-75 uppercase font-roboto-mono ml-4 mt-auto">
                    {formattedDate}
                </p>
            </div>
            <div className="flex w-full h-full flex-row gap-[3rem] mt-6 overflow-hidden">
                <div className="flex flex-col">
                    <p className="flex items-center text-[2rem] font-vt323 text-pearl-white m-0 font-medium uppercase">
                        FAVOURITES
                    </p>
                    <p className="flex text-[5rem] m-0 font-vt323 text-Purple font-semibold uppercase mx-auto">
                        {favouriteMovies.length}
                    </p>
                </div>
                <Link href={`/account/${id}/favourites`} className="text-[0.75rem] text-gray-100 opacity-75 lowercase font-roboto-mono no-underline">GO TO FAVOURITES</Link>
            </div>
            <div className="flex w-full h-full flex-row gap-[3rem] mt-6 justify-start overflow-hidden">
                <div className="flex flex-col">
                    <p className="flex items-center text-[2rem] font-vt323 text-pearl-white m-0 font-medium uppercase">
                        WATCHLISTS
                    </p>
                    <p className="flex text-[5rem] m-0 font-vt323 text-Purple font-semibold uppercase mx-auto">
                        {watchlistMovies.length}
                    </p>
                </div>
            </div>
        </div>

    )
}

export default Page
