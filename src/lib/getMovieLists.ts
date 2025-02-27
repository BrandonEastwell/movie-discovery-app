import {getPopular, getTopRated, getTrendingWeekMovie, getUpcoming} from "./api/server/movieLists";

export default async function fetchMovieData() {
    const trending = await getTrendingWeekMovie()
    const topRated = await getTopRated()
    const popular = await getPopular()
    const upcoming = await getUpcoming()

    return {
        trending,
        topRated,
        popular,
        upcoming
    }
}