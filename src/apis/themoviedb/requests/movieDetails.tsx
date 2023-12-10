import fetchTMDB from "../fetch/fetchTMDB";

export async function getMovieDetails({ id }:any) {
    return fetchTMDB(`movie/${id}?`, "GET")
}
