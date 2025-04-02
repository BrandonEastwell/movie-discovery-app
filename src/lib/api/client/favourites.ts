const getFavouriteMovies = async () => {
    try {
        const response = await fetch('/api/favourite', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();

        if (data.success) {
            return data.result;
        } else {
            console.error("Action failed: ", data.error)
            return { result: [] };
        }

    } catch (error) {
        console.error('Error fetching favourite movies:', error);
        return { result: [] };
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

        if (data.success) {
            console.log(data.result + " movie " + movieid + " to/from favourites");
            return {success: data.success};
        } else {
            console.error('Action failed:', data.error);
            return {success: data.success};
        }

    } catch (error: any) {
        console.error('Action failed:', error.response?.data);
        return {success: false};
    }
}

export {getFavouriteMovies, toggleFavouriteMovie}