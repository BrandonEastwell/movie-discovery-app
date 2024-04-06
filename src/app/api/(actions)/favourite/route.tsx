import { NextRequest, NextResponse } from 'next/server';
import { authSession } from "../../../../lib/auth-session";
import { PrismaClient } from '@prisma/client';
import {cookies} from "next/headers";
const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method !== 'POST') {
        return NextResponse.json({status: 405}); // Method Not Allowed
    }
    try {
        const body = await req.json();
        const movieid = body.movieid;
        const token = cookies().get('token')?.value
        if (token) {
            //add or remove movie id to favourite database process
            const userid = authSession(token);
            if (userid != null) {
                const existingFavorite = await prisma.favouritemovies.findFirst({
                    where: {
                        userid: userid,
                        movieid: movieid,
                    },
                });
                // remove the movie from user's favourites
                if (existingFavorite) {
                    await prisma.favouritemovies.delete({
                        where: {
                            favouriteid: existingFavorite.favouriteid,
                        },
                    })
                    return NextResponse.json({ result: "favourite removed" }, {status: 200});
                } else {
                    // Add the movie to user's favorites
                    await prisma.favouritemovies.create({
                        data: {
                            userid: userid,
                            movieid: movieid,
                        },
                    });
                    return NextResponse.json({ result: "favourite added" }, {status: 200});
                }
            } else {
                return NextResponse.json({ error: 'Error Authenticating' }, {status: 500});
            }
        }
        return res;
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
    try {
        const body = await req.json();
        const movieid = body.movieid;
        const token = cookies().get('token')?.value
        if (token) {
            const userid = authSession(token);
            if (userid != null) {
                const existingFavorite = await prisma.favouritemovies.findFirst({
                    where: {
                        userid: userid,
                        movieid: movieid,
                    },
                });

                if (existingFavorite) {
                    return NextResponse.json({result: true}, {status: 200})
                } else {
                    return NextResponse.json({result: false}, {status: 200})
                }
            }
        }
        return NextResponse.json({result: false}, {status: 200})
    } catch (error) {
        console.error('Error authenticating user:', error);
        return NextResponse.json({ error: 'Error Authenticating' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}