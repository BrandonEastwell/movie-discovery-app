import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import {authSession} from "../../../../../lib/authenticate";
const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method !== 'POST') {
        return NextResponse.json({status: 405}); // Method Not Allowed
    }
    let userid: number | null = null;
    try {
        const response = authSession(req, res); // Await the authentication function
        if (response.ok) {
            // If authentication is successful, extract userid and username from data
            const data = await response.json(); // Await the JSON response from the authentication function
            userid = data.userid;
        } else {
            // If authentication fails, handle the error
            return NextResponse.json({ error: 'Error Authenticating' }, {status: 500});
        }

        const body = await req.json();
        const name : string = body.name;
        const desc : string = body.desc;

        if (userid != null) {
            const existingPlaylist = await prisma.userplaylist.findFirst({
                where: {
                    userid: userid,
                    playlist_name: name,
                },
            });
            if (existingPlaylist) {
                return NextResponse.json({ message: "playlist already exists" }, {status: 500});
            } else {
                if (name != null) {
                    await prisma.userplaylist.create({
                        data: {
                            userid: userid,
                            playlist_name: name,
                            playlist_desc: desc
                        },
                    });
                    return NextResponse.json({ message: "playlist created" }, {status: 200});
                } else {
                    return NextResponse.json({ message: "playlist name not provided" }, {status: 500});
                }
            }
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        return NextResponse.json({ error: 'Error Authenticating' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

export async function GET(req: NextRequest, res: NextResponse) {
    if (req.method !== 'GET') {
        return NextResponse.json({status: 405}); // Method Not Allowed
    }
    let userid: number | null = null;
    try {
        const response = authSession(req, res); // Await the authentication function
        if (response.ok) {
            // If authentication is successful, extract userid and username from data
            const data = await response.json(); // Await the JSON response from the authentication function
            userid = data.userid;
        } else {
            // If authentication fails, handle the error
            return NextResponse.json({ error: 'Error Authenticating' }, {status: 500});
        }

        //add or remove movie id to favourite database process
        if (userid != null) {
            const playlists = await prisma.userplaylist.findMany({
                where: {
                    userid: userid
                },
            });

            if (playlists) {
                return NextResponse.json({ result: playlists }, {status: 200});
            } else {
                return NextResponse.json({ result: null }, {status: 200});
            }
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        return NextResponse.json({ error: 'Error Authenticating' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}