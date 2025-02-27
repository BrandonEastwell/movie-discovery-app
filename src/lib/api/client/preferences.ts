interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
}

const updatePreferences = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/update-preferences', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });
        const updatedPreferences = await response.json();
        if (response.ok && updatedPreferences.result) {
            console.log(updatedPreferences.result);
            return updatedPreferences.result;
        }
    } catch (error: any) {
        console.error('Action failed:', error.response?.data);
    }
}

const fetchUserRecommendedGenre = async () => {
    try {
        const genre = await fetchRecommendedMovies('http://localhost:3000/api/recommended/genre');
        return {genre: genre[0], genreNames: genre[1]};
    } catch (error) {
        console.error('Action failed:', error);
    }
}

const fetchUserRecommendedCrew = async () => {
    try {
        const crew = await fetchRecommendedMovies('http://localhost:3000/api/recommended/crew');
        return {cast: crew[0], castMembers: crew[1]};
    } catch (error) {
        console.error('Action failed:', error);
    }
}

const fetchUserRecommendedCast = async () => {
    try {
        const cast = await fetchRecommendedMovies('http://localhost:3000/api/recommended/cast');
        return {cast: cast[0], castMembers: cast[1]};
    } catch (error) {
        console.error('Action failed:', error);
    }
}

const fetchRecommendedMovies = async (url: string): Promise<[Movie[], any[]]> => {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        const data = await response.json();
        if (response.ok && data.result) {
            return [data.movies, data.strings];
        } else {
            throw new Error('Failed to fetch recommended movies');
        }
    } catch (error: any) {
        console.error('Action failed:', error.response?.data);
        throw new Error('Failed to fetch recommended movies');
    }
};