import fetchTMDB from "../fetch/fetchTMDB";

export async function getMovieDetails(id:number) {
    console.log(id)
    return fetchTMDB(`movie/${id}`, "GET")
}
