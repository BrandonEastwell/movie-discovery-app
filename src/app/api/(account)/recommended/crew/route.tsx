import {NextRequest, NextResponse} from "next/server";
import { PrismaClient } from '@prisma/client';
import {getMoviesByDiscoveryCrew} from "../../../../../lib/movieLists";
import {authSession} from "../../../../../lib/authenticate";
import {getPersonDetails} from "../../../../../lib/personDetails";
const prisma = new PrismaClient();

interface Person {
    name: string;
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
        if (userid != null) {
            const preferences = await prisma.userpreferences.findUnique({
                where: {userid: userid}
            });
            if (preferences != null && preferences.preferredCrew != null) {
                const preferredCrew = preferences.preferredCrew.replace(/,/g, '|');
                const preferredCrewList = preferences.preferredCrew.split(","); // Split comma-separated genres

                // Array to store retrieved person details
                const people: Person[] = [];
                for (const crewIdStr of preferredCrewList) {
                    const crewId = parseInt(crewIdStr); // Convert string to number (assuming ID is numerical)
                    if (!isNaN(crewId)) { // Check for valid ID
                        const personDetails = await getPersonDetails(crewId);
                        people.push(personDetails);
                    } else {
                        console.warn(`Ignoring invalid crew ID: ${crewIdStr}`); // Log invalid IDs
                    }
                }
                let discovery = await getMoviesByDiscoveryCrew("popularity.desc", preferredCrew);

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