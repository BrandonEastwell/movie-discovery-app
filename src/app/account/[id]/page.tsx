import "../../styles/globals.css"
import React from "react";
import { prisma } from "../../../lib/services/prisma";

export default async function Page({ params }: { params: Promise<{ id: string }> })  {
    const { id } = await params;

    const favourites= await prisma.favouriteMovies.count({
        where: {
            userId: parseInt(id)
        }
    });

    const watchlists= await prisma.watchlist.count({
        where: {
            userId: parseInt(id)
        }
    });

    const accountDetails = await prisma.user.findFirst({
        where: {
            id: parseInt(id)
        },
        select: {
            createdAt: true,
            username: true
        }
    });

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const month = monthNames[accountDetails?.createdAt.getMonth() || 0];

    const formattedDate = `Member since ${accountDetails?.createdAt.getDate()} ${month} ${accountDetails?.createdAt?.getFullYear()}`;

    return (
        <div className="w-full h-100 flex flex-col justify-start overflow-auto no-scrollbar">
            <div className="flex flex-row flex-nowrap justify-start place-items-end mt-4 gap-2">
                <span className="text-7xl font-vt323 text-pearl-white font-medium uppercase">
                    {accountDetails?.username}
                </span>
                <span className="text-sm mb-2 text-gray-100 opacity-75 lowercase font-iconsolata">
                    {formattedDate}
                </span>
            </div>
            <div className="flex flex-row gap-8 mt-6">
                <div className="flex flex-col overflow-hidden">
                    <p className="flex items-center text-3xl font-vt323 text-pearl-white m-0 font-medium">
                        FAVOURITES
                    </p>
                    <p className="text-center text-6xl m-0 font-vt323 text-Purple font-bold">
                        {favourites}
                    </p>
                </div>
                <div className="flex flex-col overflow-hidden">
                    <p className="flex items-center text-3xl font-vt323 text-pearl-white m-0 font-medium uppercase">
                        WATCHLISTS
                    </p>
                    <p className="text-center text-6xl m-0 font-vt323 text-Purple font-bold">
                        {watchlists}
                    </p>
                </div>
            </div>

        </div>

    )
}
