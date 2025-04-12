const getWatchlists = async () => {
    try {
        const response = await fetch('/api/watchlists', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const data = await response.json();

        if (data.success) {
            return {success: data.success, result: data.result};
        } else {
            console.error('Action failed:', data.error);
            return {success: data.success, error: data.error};
        }
    } catch (error : any) {
        console.error('Action failed:', error);
    }
};

const createWatchlist = async (name: string, description: string) => {
    try {
        const response = await fetch('/api/watchlists', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, description }),
        });

        const data = await response.json()

        if (data.success) {
            return {success: data.success, result: data.result};
        } else {
            console.error('Action failed:', data.error);
            return {success: data.success, error: data.error};
        }
    } catch (error : any) {
        console.error('Action failed:', error.response?.data);
    }
};

const addMovieToWatchlist = async (watchlistID: string, movieID: number) => {
    try {
        const response = await fetch(`/api/watchlists/${watchlistID}/movies`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ watchlistID, movieID }),
        });

        const data = await response.json()

        if (data.success) {
            return {success: data.success, result: data.result};
        } else {
            console.error('Action failed:', data.error);
            return {success: data.success, error: data.error};
        }
    } catch (error : any) {
        console.error('Action failed:', error);
    }
};

const getWatchlistMovies = async (watchlistID: string | null) => {
    try {
        const response = await fetch(`/api/watchlists/${watchlistID}/movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ watchlistID })
        });

        const data = await response.json();

        if (data.success) {
            return {success: data.success, result: data.result};
        } else {
            console.error('Action failed:', data.error);
            return {success: data.success, error: data.error};
        }
    } catch (error: any) {
        console.error('Action failed:', error.response?.data);
    }
};

const getWatchlistIdsFromMovie = async (movieID: string) => {
    try {
        const response = await fetch(`/api/watchlists/${movieID}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ movieID })
        });

        const data = await response.json();

        if (data.success) {
            return {success: data.success, result: data.result};
        } else {
            console.error('Action failed:', data.error);
            return {success: data.success, error: data.error};
        }
    } catch (error: any) {
        console.error('Action failed:', error.response?.data);
    }
};

export {addMovieToWatchlist, getWatchlists, createWatchlist, getWatchlistMovies}