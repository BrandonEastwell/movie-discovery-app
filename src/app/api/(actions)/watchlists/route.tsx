import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "../../../../lib/services/prisma";
import {AuthService} from "../../../../lib/services/authService";
import WatchlistService from "../../../../lib/services/watchlistService";

export async function GET(req: NextRequest) {
    try {
        const {isLoggedIn, userData} = await AuthService.getAuthStateFromRequestHeader(req);

        if (isLoggedIn && userData?.userid) {
            // Get all user playlists
            const watchlists = await WatchlistService.getAllWatchlistsByUserId(userData.userid);

            return NextResponse.json({success: true, result: watchlists }, {status: 200});
        } else {
            // If authentication fails, handle the error
            return NextResponse.json({success: false, error: 'Error Authenticating' }, {status: 400});
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

export async function POST(req: NextRequest) {
    try {
        const {isLoggedIn, userData} = await AuthService.getAuthStateFromRequestHeader(req);

        if (isLoggedIn && userData?.userid) {

            const body = await req.json();
            const name : string = body.name;
            const desc : string = body.desc;

            const existingPlaylist = await prisma.watchlist.findFirst({
                where: {
                    userId: userData.userid,
                    watchlistName: name,
                },
            });

            if (existingPlaylist) {
                return NextResponse.json({ success: false, error: "watchlist already exists" }, {status: 400});
            } else {
                if (name != null) {
                    const watchlist = await prisma.watchlist.create({
                        data: {
                            userId: userData.userid,
                            watchlistName: name,
                            watchlistDesc: desc
                        },
                    });
                    return NextResponse.json({ success: true, result: watchlist }, {status: 200});
                } else {
                    return NextResponse.json({ success: false, error: "watchlist name not provided" }, {status: 400});
                }
            }

        } else {
            return NextResponse.json({ success: false, error: 'Error Authenticating' }, {status: 400});
        }
    } catch (error) {
        console.error('Error: ', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}