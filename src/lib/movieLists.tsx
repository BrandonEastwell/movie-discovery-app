import fetchTMDB from "../app/api/themoviedb/fetchTMDB";
export async function getMediaBySearch( query:string ) {
    return await fetchTMDB(`search/multi?query=${query}&include_adult=false&language=en-US&page=1`, "GET")
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
export async function getTrendingDayMovie({ query }:any) {
    return fetchTMDB(`trending/movie/day?language=en-US`, "GET")
}
export async function getTrendingWeekMovie() {
    return await fetchTMDB(`trending/movie/week?language=en-US`, "GET")
}
export async function getMoviesByDiscovery( genreParams:string ) {
    return await fetchTMDB(`discover/movie/movie?${genreParams}`, "GET")
}