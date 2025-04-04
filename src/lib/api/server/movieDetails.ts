import fetchTMDB from "./fetchTMDB";

export async function getMovieDetails(id:number) {
    return fetchTMDB(`movie/${id}`, "GET")
}

export async function getMovieCredits(id:number) {
    return fetchTMDB(`movie/${id}/credits`, "GET")
}

export async function getMovieWatchProviders(id:number) {
    return fetchTMDB(`movie/${id}/watch/providers`, "GET")
}

export async function getMovieVideos(id:number) {
    return fetchTMDB(`movie/${id}/videos?language=en-US`, "GET")
}