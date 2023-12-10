import React from "react";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
interface MovieListProps {
    movies: Movie[] | null;
}
const TrendingMovies: React.FC<MovieListProps> = ({ movies }) => {
    if (!movies || movies.length === 0) {
        return <p>No movies found.</p>;
    }
    return (
        <div className="top-[0px] left-[0px] flex flex-col items-start justify-start gap-[15px] text-left text-4rem text-pearl-white font-montserrat">
            <b className="relative flex items-center w-[1294px] h-[73px] shrink-0 [text-shadow:0px_0px_9px_rgba(217,_217,_217,_0.5)]">
                Most popular movies based on trending genres
            </b>
            <div className="w-full flex flex-row items-start justify-start gap-[20px]">
                {movies.map((movie) => (
                    <div key={movie.id}>
                        {movie.poster_path && (
                            <div className="relative bg-gainsboro w-80 h-44">
                                <img className="w-full h-full dark:shadow-gray-800 object-contain"
                                    src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                                    alt={`${movie.title} Poster`}
                                />
                            </div>
                        )}
                    </div>
                ))}
                <div className="relative bg-gainsboro w-80 h-[170px]" />
                <div className="relative bg-gainsboro w-80 h-[170px]" />
                <div className="relative bg-gainsboro w-80 h-[170px]" />
                <div className="relative bg-gainsboro w-80 h-[170px]" />
                <div className="relative bg-gainsboro w-80 h-[170px]" />
            </div>
        </div>
    );
};

export default TrendingMovies;
