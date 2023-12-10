import fetchTMDB from "../fetch/fetchTMDB";

export async function getMediaBySearch({ query }:any) {
    return fetchTMDB(`search/multi?query=${query}&include_adult=false&language=en-US&page=1`, "GET")
}
export async function getPopular({ query }:any) {
    return fetchTMDB(`movie/popular?language=en-US&page=1`, "GET")
}
export async function getTopRated({ query }:any) {
    return fetchTMDB(`movie/top_rated?language=en-US&page=1`, "GET")
}
export async function getUpcoming({ query }:any) {
    return fetchTMDB(`movie/upcoming?language=en-US&page=1`, "GET")
}
export async function getTheatres({ query }:any) {
    return fetchTMDB(`movie/now_playing`, "GET")
}
