import { NextRequest, NextResponse } from 'next/server';
import { prisma } from "../../../../../lib/services/prisma";
import {AuthService} from "../../../../../lib/services/authService";

export async function POST(req: NextRequest) {
    try {
        const {isLoggedIn, userData} = await AuthService.getAuthStateFromRequestHeader(req);

        if (isLoggedIn && userData?.userid) {

            const body = await req.json();
            const name : string = body.name;
            const desc : string = body.desc;

            const existingPlaylist = await prisma.userplaylist.findFirst({
                where: {
                    userid: userData.userid,
                    playlist_name: name,
                },
            });

            if (existingPlaylist) {
                return NextResponse.json({ success: false, error: "playlist already exists" }, {status: 400});
            } else {
                if (name != null) {
                    await prisma.userplaylist.create({
                        data: {
                            userid: userData.userid,
                            playlist_name: name,
                            playlist_desc: desc
                        },
                    });
                    return NextResponse.json({ success: true, result: "playlist created" }, {status: 200});
                } else {
                    return NextResponse.json({ success: false, error: "playlist name not provided" }, {status: 400});
                }
            }

        } else {
            return NextResponse.json({ success: false, error: 'Error Authenticating' }, {status: 400});
        }
    } catch (error) {
        console.error('Error: ', error);
        return NextResponse.json({ success: false, error: error }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET(req: NextRequest) {
    try {
        const {isLoggedIn, userData} = await AuthService.getAuthStateFromRequestHeader(req);

        if (isLoggedIn && userData?.userid) {
            //add or remove movie id to favourite database process
            const playlists = await prisma.userplaylist.findMany({
                where: {
                    userid: userData.userid
                },
            });

            return NextResponse.json({success: true, result: playlists }, {status: 200});
        } else {
            // If authentication fails, handle the error
            return NextResponse.json({success: false, error: 'Error Authenticating' }, {status: 400});
        }
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ success: false, error: error }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}