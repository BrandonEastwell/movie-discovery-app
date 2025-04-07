export interface Watchlists {
    playlistid: number;
    playlist_name: string;
    playlist_desc: string | null;
    playlistMovies: {
        movieid: number
    }[]
}