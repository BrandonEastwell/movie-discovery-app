import fetchTMDB from "../themoviedb/fetchTMDB";

export async function getMediaBySearch( query:string ) {
    return await fetchTMDB(`search/movie?query=${query}&include_adult=false&language=en-US&page=1`, "GET")
}
export async function getPopular() {
    return await fetchTMDB(`movie/popular?language=en-US&page=1`, "GET")
}
export async function getTopRated() {
    return await fetchTMDB(`movie/top_rated?language=en-US&page=1`, "GET")
}
export async function getUpcoming() {
    return await fetchTMDB(`movie/upcoming?language=en-US&page=1`, "GET")
}
export async function getTheatres({ query }:any) {
    return await fetchTMDB(`movie/now_playing`, "GET")
}
export async function getTrendingDayMovie({ query }:any) {
    return await fetchTMDB(`trending/movie/day?language=en-US`, "GET")
}
export async function getTrendingWeekMovie() {
    return await fetchTMDB(`trending/movie/week?language=en-US`, "GET")
}
export async function getMoviesByDiscoveryGenre( genreParams:string, sortby:string) {
    return await fetchTMDB(`discover/movie?language=en-US&page=1&sort_by=${sortby}&with_genres=${genreParams}`, "GET")
}
export async function getMoviesByDiscoveryCrew( sortby:string,  crew:string) {
    return await fetchTMDB(`discover/movie?language=en-US&page=1&sort_by=${sortby}&with_crew=${crew}`, "GET")
}
export async function getMoviesByDiscoveryCast( sortby:string, cast:string) {
    return await fetchTMDB(`discover/movie?language=en-US&page=1&sort_by=${sortby}&with_cast=${cast}`, "GET")
}