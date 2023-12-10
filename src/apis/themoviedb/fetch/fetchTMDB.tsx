const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWNjNDg2NmM2OTg2ZWM2YTQ1NmJkYWI0ODlhMGQ0ZSIsInN1YiI6IjY1NGFhNjgwMzkxYjljMDBjNjE0NGMxZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gH8R0OKAE7rQ1HVH7X5xTfNgHPa44u3ofntZyox_f3I'
    }
};

fetch('https://api.themoviedb.org/3/authentication', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));