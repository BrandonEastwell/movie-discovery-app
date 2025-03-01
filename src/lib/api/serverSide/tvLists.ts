import fetchTMDB from "../themoviedb/fetchTMDB";

export async function getTrendingDayTV({ query }:any) {
    return fetchTMDB(`trending/tv/day?language=en-US`, "GET")
}
export async function getTrendingWeekTV({ query }:any) {
    return fetchTMDB(`trending/tv/week?language=en-US`, "GET")
}
export async function getPopularTV({ query }:any) {
    return fetchTMDB(`tv/popular?language=en-US&page=1`, "GET")
}
export async function getTopRatedTV({ query }:any) {
    return fetchTMDB(`tv/top_rated?language=en-US&page=1`, "GET")
}
export async function getAiringTV({ query }:any) {
    return fetchTMDB(`tv/on_the_air?language=en-US&page=1`, "GET")
}