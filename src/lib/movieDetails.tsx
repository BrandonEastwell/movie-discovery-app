import fetchTMDB from "../app/api/themoviedb/fetchTMDB";

export async function getMovieDetails(id:number) {
    console.log(id)
    return fetchTMDB(`movie/${id}`, "GET")
}
