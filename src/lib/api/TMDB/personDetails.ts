import fetchTMDB from "./fetchTMDB";

export async function getPersonDetails(id:number) {
    return fetchTMDB(`person/${id}?language=en-US`, "GET")
}