import {NextRequest, NextResponse} from "next/server";
import {getMoviesByDiscoveryGenre} from "../../../../../lib/api/server/movieLists";
import {getAuthStateFromRequest} from "../../../../../lib/getAuthStateFromRequest";
import { prisma } from "../../../../../lib/prisma";

export async function GET(req: NextRequest) {
    const idToGenreNameMapping: Record<number, string> = {
        28: "Action",
        12: "Adventure",
        16: "Animation",
        35: "Comedy",
        80: "Crime",
        99: "Documentary",
        18: "Drama",
        10751: "Family",
        14: "Fantasy",
        36: "History",
        27: "Horror",
        10402: "Music",
        9648: "Mystery",
        10749: "Romance",
        878: "Science Fiction",
        10770: "TV Movie",
        53: "Thriller",
        10752: "War",
        37: "Western",
        // Add more genres as needed
    };

    try {
        const authState = getAuthStateFromRequest(req);
        if (authState.userData && authState.userData.userid) {
            const preferences = await prisma.userpreferences.findUnique({
                where: {userid: authState.userData.userid}
            });

            if (preferences != null && preferences.preferredGenre != null) {
                const preferredGenre = preferences.preferredGenre.replace(/,/g, '|');
                const preferredGenreList = preferences.preferredGenre.split(","); // Split comma-separated genres
                // Create a list of genre strings
                const genreStringList: string[] = [];
                for (const genre of preferredGenreList) {
                    const genreName = idToGenreNameMapping[parseInt(genre)]; // Trim leading/trailing spaces
                    if (genreName) {
                        genreStringList.push(genreName); // Add genre name if valid ID found
                    } else {
                        console.warn(`Ignoring unknown genre: ${genre.trim()}`); // Log unknown genres
                    }
                }

                let discovery = await getMoviesByDiscoveryGenre(preferredGenre, "popularity.desc");

                return NextResponse.json({result: true, movies: discovery.results, strings: genreStringList}, {status: 200})
            } else {
                return NextResponse.json({result: false}, {status: 200})
            }
        }
        return NextResponse.json({result: false}, {status: 200})
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Error Authenticating' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}