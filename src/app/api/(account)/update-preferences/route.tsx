import {NextRequest, NextResponse} from "next/server";
import {authSession} from "../../../../lib/authenticate";
import {getMovieCredits, getMovieDetails} from "../../../../lib/movieDetails";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
    if (req.method !== 'POST') {
        return NextResponse.json({status: 405}); // Method Not Allowed
    }
    let userid: number | null = null;
    interface Movie {
        id: number;
        title: string;
        poster_path: string;
        release_date: string;
        runtime: number;
        genres: [id: number, name: string];
    }
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
        if (userid) {
            const favoriteMovies = await prisma.favouritemovies.findMany({
                where: { userid: userid }
            });

            if (!favoriteMovies) {
                return NextResponse.json({result: false}, {status: 200})
            }

            // Fetch movie details from TMDB API and extract genres for each favorite movie
            let genreIds : Genre[] = [];
            let castIds : Cast[] = [];
            let crewIds : Crew[] = [];
            for (const movieid of favoriteMovies) {
                let movieCredits = await getMovieCredits(movieid.movieid)
                if (movieCredits) {
                    // Loop through the cast array and push each cast member ID into the castIds array
                    for (const castMember of movieCredits.cast) {
                        let found = false;
                        for (let i = 0; i < castIds.length; i++) {
                            if (castIds[i].id === castMember.id) {
                                castIds[i].count++;
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            castIds.push({ id: castMember.id, count: 1 });
                        }
                    }
                    for (const crewMember of movieCredits.crew) {
                        let found = false;
                        for (let i = 0; i < crewIds.length; i++) {
                            if (crewIds[i].id === crewMember.id) {
                                crewIds[i].count++;
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            crewIds.push({ id: crewMember.id, count: 1 });
                        }
                    }
                }

                let movieDetails = await getMovieDetails(movieid.movieid)

                //const movie: Movie = movieDetails as Movie
                if (movieDetails && movieDetails.genres) {
                    for (const genre of movieDetails.genres) {
                        let found = false;
                        for (let i = 0; i < genreIds.length; i++) {
                            if (genreIds[i].id === genre.id) {
                                genreIds[i].count++;
                                found = true;
                                break;
                            }
                        }
                        if (!found) {
                            genreIds.push({id: genre.id, count: 1});
                        }
                    }
                }
            }

            //sort crew and cast by count descending order
            crewIds.sort((a, b) => b.count - a.count);
            castIds.sort((a, b) => b.count - a.count);
            genreIds.sort((a, b) => b.count - a.count);
            //keep only first 10 values
            crewIds = crewIds.slice(0, 5);
            castIds = castIds.slice(0, 5);
            genreIds = genreIds.slice(0, 5);

            const crew: number[] = crewIds.map(crew => crew.id);
            const cast: number[] = castIds.map(cast => cast.id);
            const genres: number[] = genreIds.map(genre => genre.id);

            console.log(crew)
            console.log(cast)
            console.log(genres)

            await prisma.userpreferences.upsert({
                where: { userid: userid },
                update: {
                    // Type assertion here to bypass TypeScript checking
                    preferredCast: cast.join(',') as any,
                    preferredGenre: genres.join(','),
                    preferredCrew: crew.join(','),
                },
                create: {
                    userid: userid,
                    preferredGenre: genres.join(','),
                    preferredCast: cast.join(','),
                    preferredCrew: crew.join(','),
                },
            });

            return NextResponse.json({result: true}, {status: 200})
        }
        return NextResponse.json({ error: 'User ID does not Exist' }, {status: 500});
    } catch (error) {
        console.error('Error authenticating user:', error);
        return NextResponse.json({ error: 'Error Authenticating' }, {status: 500});
    } finally {
        await prisma.$disconnect();
    }
}