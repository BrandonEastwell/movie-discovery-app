const getPlaylists = async () => {
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

const addPlaylist = async (event : any) => {
    event.stopPropagation();
    const values = event.currentTarget.value;
    const [playlistid, movieid] = values.split(',');

    try {
        const response = await fetch('/api/watchlist-movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ playlistid, movieid }),
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

export {addPlaylist, getPlaylists}