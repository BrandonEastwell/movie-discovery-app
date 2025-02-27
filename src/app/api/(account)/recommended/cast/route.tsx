import {NextRequest, NextResponse} from "next/server";
import { prisma } from "../../../../../lib/prisma";
import {getMoviesByDiscoveryCast} from "../../../../../lib/api/server/movieLists";
import {getAuthStateFromRequest} from "../../../../../lib/getAuthStateFromRequest";
import {getPersonDetails} from "../../../../../lib/api/server/personDetails";

interface Person {
    name: string;
}

export async function GET(req: NextRequest) {
    if (req.method !== 'GET') {
        return NextResponse.json({status: 405}); // Method Not Allowed
    }

    let userid: number | null = null;
    try {
        const response = getAuthStateFromRequest(req); // Await the authentication function
        if (response.ok) {
            // If authentication is successful, extract userid and username from data
            const data = await response.json(); // Await the JSON response from the authentication function
            userid = data.userid;
        } else {
            // If authentication fails, handle the error
            return NextResponse.json({ error: 'Error Authenticating' }, {status: 500});
        }
        if (userid != null) {
            const preferences = await prisma.userpreferences.findUnique({
                where: {userid: userid}
            });
            if (preferences != null && preferences.preferredCast != null) {
                const preferredCast = preferences.preferredCast.replace(/,/g, '|');
                const preferredCastList = preferences.preferredCast.split(","); // Split comma-separated genres

                // Array to store retrieved person details
                const people: Person[] = [];
                for (const castIdStr of preferredCastList) {
                    const castId = parseInt(castIdStr); // Convert string to number (assuming ID is numerical)
                    if (!isNaN(castId)) { // Check for valid ID
                        const personDetails = await getPersonDetails(castId);
                        people.push(personDetails);
                    } else {
                        console.warn(`Ignoring invalid crew ID: ${castIdStr}`); // Log invalid IDs
                    }
                }
                let discovery = await getMoviesByDiscoveryCast("popularity.desc", preferredCast);
                console.log(discovery)
                return NextResponse.json({result: true, movies: discovery.results, strings: people}, {status: 200})
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