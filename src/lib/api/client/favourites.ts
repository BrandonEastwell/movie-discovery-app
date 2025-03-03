const fetchFavouriteMovies = async () => {
    try {
        const response = await fetch('/api/favourite', {
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

const toggleFavouriteMovie = async (movieid : number) => {
    try {
        const response = await fetch('/api/favourite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({movieid}),
        })

        const data = await response.json();

        if (response.ok) {
            console.log(data.result + " movie " + movieid + " to/from favourites");
            return {success: true};
        } else {
            console.error('Action failed:', data.error);
            // redirect user to login page
            return {success: false};
        }
    } catch (error: any) {
        console.error('Action failed:', error.response?.data);
        return {success: false};
    }
}

export {fetchFavouriteMovies, toggleFavouriteMovie}