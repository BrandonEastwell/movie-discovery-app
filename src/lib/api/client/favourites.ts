const fetchFavouriteMovies = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/favourite', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error('Action failed:', errorData);
        }

        const data = await response.json();
        return data.result;

    } catch (error) {
        console.error('Error fetching favourite movies:', error);
    }
};

export {fetchFavouriteMovies}