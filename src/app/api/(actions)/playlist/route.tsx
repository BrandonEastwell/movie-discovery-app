import { NextRequest, NextResponse } from 'next/server';
import { authSession } from "../../../../lib/auth-session";
import { PrismaClient } from '@prisma/client';
import {cookies} from "next/headers";
const prisma = new PrismaClient();

export async function createUserPlaylist(req: NextRequest, res: NextResponse) {
    if (req.method !== 'POST') {
        return NextResponse.json({status: 405}); // Method Not Allowed
    }
    try {
        const body = await req.json();
        const name : string = body.name;
        const desc : string = body.desc;

        const token = cookies().get('token')?.value
        if (token) {
            //add or remove movie id to favourite database process
            const userid = authSession(token);
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
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        return NextResponse.json({ error: 'Error Authenticating' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}

export async function addMovieToPlaylist(req: NextRequest, res: NextResponse) {
    if (req.method !== 'addMovieToPlaylist') {
        return NextResponse.json({status: 405}); // Method Not Allowed
    }
    try {
        const body = await req.json();
        const playlistid = body.playlistid;
        const movieid = body.movieid;
        //add or remove movie id to favourite database process
        if (playlistid != null) {
            const existingMovie = await prisma.playlistmovies.findFirst({
                where: {
                    playlistid: playlistid,
                    movieid: movieid,
                },
            });
            if (existingMovie) {
                await prisma.playlistmovies.delete({
                    where: {
                        id: existingMovie.id
                    }
                })
                return NextResponse.json({ message: "movie removed from playlist" }, {status: 200});
            } else {
                const movies = await prisma.playlistmovies.findMany({
                    where: {
                        playlistid: playlistid
                    }
                })
                let position = movies.length
                await prisma.playlistmovies.create({
                    data: {
                        playlistid: playlistid,
                        position: position++,
                        movieid: movieid,
                    }
                })
                return NextResponse.json({ message: "movie added to playlist" }, {status: 200});
            }
        }
    } catch (error) {
        console.error('Error authenticating user:', error);
        return NextResponse.json({ error: 'Error Authenticating' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}