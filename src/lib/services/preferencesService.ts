import {prisma} from "../prisma";
import {getPersonDetails} from "../api/server/personDetails";

interface Cast {
    id: number
    count: number
}

interface Crew {
    id: number
    count: number
}

interface Genre {
    id: number
    count: number
}

export class PreferencesService {
    async setPreferences({genre, cast, crew} : {genre: Genre[], cast: Cast[], crew: Crew[]}, userid : number) {
        //sort crew and cast by count descending order
        crew.sort((a, b) => b.count - a.count);
        cast.sort((a, b) => b.count - a.count);
        genre.sort((a, b) => b.count - a.count);

        //keep only first 10 values
        crew = crew.slice(0, 5);
        cast = cast.slice(0, 5);
        genre = genre.slice(0, 5);

        const crewids: number[] = crew.map(crew => crew.id);
        const castids: number[] = cast.map(cast => cast.id);
        const genreids: number[] = genre.map(genre => genre.id);

        await prisma.userpreferences.upsert({
            where: { userid: userid },
            update: {
                preferredCast: castids.join(','),
                preferredGenre: genreids.join(','),
                preferredCrew: crewids.join(','),
            },
            create: {
                userid: userid,
                preferredCast: castids.join(','),
                preferredGenre: genreids.join(','),
                preferredCrew: crewids.join(','),
            },
        });
    }

    async getAllUserPreferenceIDs(userid: number) {
        return prisma.userpreferences.findUnique({
            where: {userid: userid}
        });
    }

    async getPeopleData(people : string[]) {
        // Array to store retrieved person names
        const members: string[] = [];
        if (people !== null) {
            for (const personId of people) {
                const membersId = parseInt(personId); // Convert string to number (assuming ID is numerical)
                if (!isNaN(membersId)) { // Check for valid ID
                    const personDetails = await getPersonDetails(membersId);
                    members.push(personDetails);
                } else {
                    console.warn(`Ignoring invalid person ID: ${personId}`); // Log invalid IDs
                }
            }
            return members;
        }
        return members;
    }

    async genreIdToString(genreIds : string[]) {
        // Create a list of genre strings
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

        const genreToStrings: string[] = [];
        for (const genre of genreIds) {
            const genreName = idToGenreNameMapping[parseInt(genre)]; // Trim leading/trailing spaces
            if (genreName) {
                genreToStrings.push(genreName); // Add genre name if valid ID found
            } else {
                console.warn(`Ignoring unknown genre: ${genre.trim()}`); // Log unknown genres
            }
        }

        return genreToStrings;

    }
}