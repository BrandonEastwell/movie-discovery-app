import {prisma} from "../prisma";

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
    
}