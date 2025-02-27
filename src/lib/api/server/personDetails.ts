import fetchTMDB from "../../../app/api/themoviedb/fetchTMDB";

export async function getPersonDetails(id:number) {
    return fetchTMDB(`person/${id}?language=en-US`, "GET")
}