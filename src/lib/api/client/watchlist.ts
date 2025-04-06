const getWatchlist = async () => {
    try {
        const response = await fetch('/api/watchlist', {
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

const addWatchlist = async (watchlistID: string, movieID: string) => {
    try {
        const response = await fetch('/api/watchlist-movies', {
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

const createWatchlist = async (name: string, description: string) => {
    try {
        const response = await fetch('/api/watchlist', {
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

const getWatchlistMovies = async (playlistid: string | null) => {
    try {
        const response = await fetch(`/api/watchlist-movies`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ playlistid })
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

export {addWatchlist, getWatchlist, createWatchlist, getWatchlistMovies}