import {prisma} from "./prisma";
import {getPersonDetails} from "../api/TMDB/personDetails";
import {getMoviesByDiscoveryCast, getMoviesByDiscoveryCrew, getMoviesByDiscoveryGenre} from "../api/TMDB/movieLists";
import {MoviesService} from "./moviesService";

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

interface Person {
    name: string;
}

export class PreferencesService {
    static async setPreferences({genre, cast, crew} : {genre: Genre[], cast: Cast[], crew: Crew[]}, userid : number) {
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

        await prisma.preferences.upsert({
            where: { userId: userid },
            update: {
                cast: castids.join(','),
                genres: genreids.join(','),
                crew: crewids.join(','),
            },
            create: {
                userId: userid,
                cast: castids.join(','),
                genres: genreids.join(','),
                crew: crewids.join(','),
            },
        });
    }

    static async updateAllPreferences(userid: number, favouriteMovies : number[]) {
        if (favouriteMovies.length < 5) {
            throw new Error('Action Failed: Not enough data to generate preferences')
        }

        const moviesData = await MoviesService.getDetailsFromMovies(favouriteMovies);

        await PreferencesService.setPreferences({genre: moviesData.genreIds, crew: moviesData.crewIds, cast: moviesData.castIds}, userid);
    }

    static async getAllUserPreferenceIDs(userid: number) {
        return prisma.preferences.findUnique({
            where: {userId: userid}
        });
    }

    static async getPeopleData(people : string[]) {
        // Array to store retrieved person names
        const members: Person[] = [];
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

    static async genreIdToString(genreIds : string[]) {
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

    static async getListOfAllPreferences(userid: number) {
        const preferences = await this.getAllUserPreferenceIDs(userid);

        if (preferences && preferences.crew && preferences.genres && preferences.cast) {
            const preferredCrew = preferences.crew.replace(/,/g, '|');
            const preferredCrewList = preferences.crew.split(",");

            const preferredCast = preferences.cast.replace(/,/g, '|');
            const preferredCastList = preferences.cast.split(",");

            const preferredGenre = preferences.genres.replace(/,/g, '|');
            const preferredGenreList = preferences.genres.split(",");

            const preferredMoviesByGenre = await getMoviesByDiscoveryGenre("popularity.desc", preferredGenre);
            const preferredMoviesByCast = await getMoviesByDiscoveryCast("popularity.desc", preferredCast);
            const preferredMoviesByCrew = await getMoviesByDiscoveryCrew("popularity.desc", preferredCrew);
            const genreNames = await this.genreIdToString(preferredGenreList);
            const crewMembers = await this.getPeopleData(preferredCrewList);
            const castMembers = await this.getPeopleData(preferredCastList);


            return {
                preferredMoviesByGenre: preferredMoviesByGenre.results,
                preferredMoviesByCrew: preferredMoviesByCrew.results,
                preferredMoviesByCast: preferredMoviesByCast.results,
                crewMembers: crewMembers,
                castMembers: castMembers,
                genreNames: genreNames
            }
        }
        return null
    }
}