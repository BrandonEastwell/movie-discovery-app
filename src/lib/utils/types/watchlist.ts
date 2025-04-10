export interface Watchlists {
    id: number;
    watchlistName: string;
    watchlistDesc: string | null;
    watchlistMovies: {
        movieId: number
    }[]
}