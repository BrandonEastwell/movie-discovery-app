interface Movie {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
}

const updatePreferences = async () => {
    try {
        const response = await fetch('/api/update-preferences', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        });
        const updatedPreferences = await response.json();
        if (response.ok && updatedPreferences.result) {
            return updatedPreferences.result;
        } else {
            console.error('Could not update preferences')
        }
    } catch (error: any) {
        console.error('Action failed:', error.response?.data);
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