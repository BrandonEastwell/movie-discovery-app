// components/MovieList.tsx
import React, {Suspense} from 'react';
import Link from 'next/link'

interface Movie {
    id: number;
    title: string;
    poster_path: string;
}

const TMDB_IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface MovieListProps {
    movies: Movie[] | null;
}

const SearchMovies: React.FC<MovieListProps> = ({ movies }) => {
    console.log(movies)
    if (!movies || movies.length === 0) {
        return <p>No movies found.</p>;
    }

    return (
        <ul>
            {movies.map((movie) => (
                <Suspense key={movie.id} fallback={<p>loading..</p>}>
                    <li key={movie.id}>
                        <h3>{movie.title}</h3>
                        <Link href={`/product/${movie.id}`}>
                        {movie.poster_path && (
                            <img
                                src={`${TMDB_IMAGE_BASE_URL}${movie.poster_path}`}
                                alt={`${movie.title} Poster`}
                            />
                        )}
                        </Link>
                    </li>
                </Suspense>
            ))}
        </ul>
    );
};

export default SearchMovies;