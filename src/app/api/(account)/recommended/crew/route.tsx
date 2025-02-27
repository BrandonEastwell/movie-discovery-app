import {NextRequest, NextResponse} from "next/server";
import {getMoviesByDiscoveryCrew} from "../../../../../lib/api/server/movieLists";
import {getAuthStateFromRequest} from "../../../../../lib/getAuthStateFromRequest";
import {getPersonDetails} from "../../../../../lib/api/server/personDetails";
import { prisma } from "../../../../../lib/prisma";

interface Person {
    name: string;
}

export async function GET(req: NextRequest) {
    try {
        const authState = getAuthStateFromRequest(req);
        if (authState.userData && authState.userData.userid) {
            const preferences = await prisma.userpreferences.findUnique({
                where: {userid: authState.userData.userid}
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