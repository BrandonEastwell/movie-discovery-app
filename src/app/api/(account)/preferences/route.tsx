import {NextRequest, NextResponse} from "next/server";
import { PrismaClient } from '@prisma/client';
import {cookies} from "next/headers";
import {authSession} from "../../../../lib/auth-session";
import {getMovieDetails} from "../../../../lib/movieDetails";
import {getMoviesByDiscovery} from "../../../../lib/movieLists";

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
    interface Movie {
        id: number;
        title: string;
        poster_path: string;
        release_date: string;
        runtime: number;
        genres: [id: number, name: string];
    }
    if (req.method !== 'GET') {
        return NextResponse.json({status: 405}); // Method Not Allowed
    }
    try {
        const body = await req.json();
        const userid = body.userid;
        if (userid) {
            const favoriteMovies = await prisma.favouritemovies.findMany({
                where: { userid: userid },
                select: { movieid: true }, // Select only movie IDs
            });

            // Fetch movie details from TMDB API and extract genres for each favorite movie
            const genres = new Map<string, number>();
            for (const { movieid } of favoriteMovies) {
                let movieDetails = await getMovieDetails(movieid)
                //const movie: Movie = movieDetails as Movie
                if (movieDetails && movieDetails.genres) {
                    for (const genre of movieDetails.genres) {
                        genres.set(genre, (genres.get(genre) || 0) + 1);
                    }
                }
            }

            // Check if any genre has multiple occurrences
            const hasMultipleOccurrences = [...genres.values()].some(count => count > 1);

            // Filter out genres with only one occurrence if there are genres with multiple occurrences
            const filteredGenres = hasMultipleOccurrences
                ? [...genres.entries()].filter(([, count]) => count > 1)
                : [...genres.entries()];

            // Sort genres by the number of occurrences in descending order
            const sortedGenres = [...filteredGenres.entries()].sort((a, b) => {
                // Cast the values to numbers before performing the subtraction
                return Number(b[1]) - Number(a[1]);
            });

            // Extract sorted genres
            const preferredGenres = sortedGenres.map(([genre]) => genre);

            await prisma.userpreferences.upsert({
                where: { userid: userid },
                update: { preferredgenre: preferredGenres.join(',') },
                create: { userid: userid, preferredgenre: preferredGenres.join(',') },
            });
        }
        return NextResponse.json({result: false}, {status: 200})
    } catch (error) {
        console.error('Error authenticating user:', error);
        return NextResponse.json({ error: 'Error Authenticating' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}
export async function GET(req: NextRequest, res: NextResponse) {
    const genreNameToIdMapping: Record<string, number> = {
        "Action": 28,
        "Adventure": 12,
        "Animation": 16,
        "Comedy": 35,
        "Crime": 80,
        "Documentary": 99,
        "Drama": 18,
        "Family": 10751,
        "Fantasy": 14,
        "History": 36,
        "Horror": 27,
        "Music": 10402,
        "Mystery": 9648,
        "Romance": 10749,
        "Science Fiction": 878,
        "TV Movie": 10770,
        "Thriller": 53,
        "War": 10752,
        "Western": 37,
        // Add more genres as needed
    };
    try {
        const token = cookies().get('token')?.value
        if (token) {
            const userid = authSession(token);
            if (userid != null) {
                const genres = await prisma.userpreferences.findUnique({
                    where: {userid: userid},
                    select: {preferredgenre: true},
                });
                if (genres == null) {
                    return NextResponse.json({result: false}, {status: 200})
                } else {
                    const preferredGenres = genres.preferredgenre ? genres.preferredgenre.split(',') : [];
                    const genreIds = preferredGenres.map((genreName) => {
                        // Assuming you have a mapping of genre names to genre IDs
                        return genreNameToIdMapping[genreName];
                    });
                    const genreIdsString = genreIds.join(',');
                    let discovery = await getMoviesByDiscovery(genreIdsString);
                    return NextResponse.json({result: true, data: discovery.results}, {status: 200})
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
export async function generatePreferences(req: NextRequest, res: NextResponse) {
    try {
        const token = cookies().get('token')?.value
        if (token) {
            const userid = authSession(token);
            if (userid != null) {

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