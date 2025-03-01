import requestError from './requestError';
const  {REACT_APP_API_KEY,REACT_APP_API_VERSION,REACT_APP_API_URL} = process.env;

const FetchTMDB = async function (endpoint:string, method: 'GET' | 'POST' | 'PUT' | 'DELETE') {
    //console.log(`${REACT_APP_API_URL}/${REACT_APP_API_VERSION}/${endpoint}`)
    const response = await fetch(`${REACT_APP_API_URL}/${REACT_APP_API_VERSION}/${endpoint}`, {
        method,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWNjNDg2NmM2OTg2ZWM2YTQ1NmJkYWI0ODlhMGQ0ZSIsInN1YiI6IjY1NGFhNjgwMzkxYjljMDBjNjE0NGMxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gH8R0OKAE7rQ1HVH7X5xTfNgHPa44u3ofntZyox_f3I'
        },
    })
    if (response.ok) return response.json();
    throw new requestError(response.statusText, response.status, response)
}

export default FetchTMDB;