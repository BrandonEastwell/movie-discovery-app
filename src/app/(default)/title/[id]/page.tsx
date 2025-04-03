import React from "react";
import Link from "next/link";
import {getMovieDetails, getMovieVideos, getMovieWatchProviders} from "../../../../lib/api/server/movieDetails";
import LocalStorage from "../../../../components/client/LocalStorage";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    runtime: number;
    genres: [Genre];
    popularity: number;
    budget: number;
    backdrop_path: string;
    overview: string;
}

interface Genre {
    id: number, name: string
}

interface WatchProviderInfo {
    link?: string;
    flatrate?: WatchProviderDetails[];
    rent?: WatchProviderDetails[];
    buy?: WatchProviderDetails[];
}

interface WatchProviderDetails {
    logo_path?: string;
    provider_id: number;
    provider_name: string;
    display_priority?: number;
}

interface Trailer {
    id: string;
    key: string;
    site: string;
    size?: number;
}

interface VideosResponse {
    results: Trailer[];
}

interface Providers {
    results: {
        [countryCode: string]: WatchProviderInfo | undefined;
    };
}

function getOfficialTrailers(data: { results: any[] }): Trailer[] {
    const trailers: Trailer[] = [];
    data.results.forEach((video) => {
        if (video.type === "Trailer" && video.official === true) {
            trailers.push({
                id: video.id,
                key: video.key,
                site: video.site,
                size: video.size,
            });
        }
    });
    return trailers;
}

export default async function Page({ params }: { params: Promise<{ id: number }> }) {
    const movie: Movie = await getMovieDetails((await params).id);
    const providers: Providers = await getMovieWatchProviders((await params).id);
    const videos: VideosResponse = await getMovieVideos((await params).id);
    const trailers: Trailer[] = getOfficialTrailers(videos);
    const youtubeId = trailers[0].id;
    let showVideo = false;
    const gbProvider = providers.results["GB"];

    return (
        <div className="main-content flex col-span-1 col-start-2 row-start-3 z-0 overflow-auto no-scrollbar mr-4">
            <LocalStorage movie={movie} />
            <div className="w-full h-100 flex flex-col justify-start overflow-auto no-scrollbar">
                <b className="flex items-center text-[4rem] font-vt323 text-pearl-white mt-4 font-medium uppercase">
                    {movie.title}
                </b>
                <div className="flex flex-row flex-nowrap justify-start">
                    {movie.genres.map((genre) => (
                        <p key={genre.id}
                           className="text-[0.75rem] text-gray-100 opacity-75 mt-2 mb-2 mr-5 lowercase font-roboto-mono">
                            {genre.name}
                        </p>
                    ))}
                </div>
                <div className="video-container w-full">
                    {movie.poster_path
                        && (
                            <img className="w-full dark:shadow-gray-800 object-cover object-center overflow-hidden"
                                 src={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
                                 alt={`${movie?.title} Poster`}
                            />
                        )}
                    {showVideo && (
                        <iframe
                            width="100%"
                            src={`https://www.youtube.com/embed/${youtubeId}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube video"
                            className="w-full h-auto"
                        />
                    )}
                </div>
                <div className="flex flex-row flex-nowrap mt-2 justify-between font-roboto-mono font-medium uppercase text-[1rem]">
                    <div className="flex flex-col">
                        <div className="flex flex-row flex-nowrap justify-between">
                            <p className="text-pearl-white text-[1.5rem] m-0">where to watch</p>
                        </div>
                        <div className="flex flex-row flex-wrap justify-start">
                            <div className="flex flex-col mr-4">
                                {gbProvider?.flatrate && (
                                    <p className="text-[0.75rem] text-gray-100 opacity-75 mt-2 mb-2 mr-5 lowercase font-roboto-mono">stream</p>
                                )}
                                <div className="flex flex-row">
                                    {gbProvider && gbProvider.flatrate?.map((provider) => (
                                        <div key={provider.provider_id} className="mr-4">
                                            {provider.logo_path && (
                                                <Link href={``} className="cursor-pointer">
                                                    <img className="dark:shadow-gray-800 object-cover object-center overflow-hidden rounded"
                                                        src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
                                                        alt={`${provider.provider_name} Logo`}
                                                        width={50}
                                                        height={50}
                                                    />
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                {gbProvider?.rent && (
                                    <p className="text-[0.75rem] text-gray-100 opacity-75 mt-2 mb-2 mr-5 lowercase font-roboto-mono">buy/rent - digital</p>
                                )}
                                <div className="flex flex-row">
                                    {gbProvider && gbProvider.rent?.map((provider) => (
                                        <div key={provider.provider_id} className="mr-4">
                                            {provider.logo_path && (
                                                <Link href={``} className="cursor-pointer">
                                                    <img className="dark:shadow-gray-800 object-cover object-center overflow-hidden rounded"
                                                        src={`https://image.tmdb.org/t/p/w500${provider.logo_path}`}
                                                        alt={`${provider.provider_name} Logo`}
                                                        width={50}
                                                        height={50}
                                                    />
                                                </Link>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="flex flex-row flex-nowrap mt-2 justify-between font-roboto-mono font-medium uppercase text-[1rem]">
                    <div className="flex flex-col w-[45%]">
                        <div className="flex flex-row flex-nowrap justify-between border-b border-gray-100">
                            <p className="text-pearl-white text-[1.5rem]">Details</p>
                        </div>
                        <div className="flex flex-row flex-nowrap justify-between">
                            <p className="text-gray-100 opacity-75">Release Date</p>
                            <p className="text-pearl-white">{movie.release_date}</p>
                        </div>
                        <div className="flex flex-row flex-nowrap justify-between">
                            <p className="text-gray-100 opacity-75">Duration</p>
                            <p className="text-pearl-white">{movie.runtime} minutes</p>
                        </div>
                        <div className="flex flex-row flex-nowrap justify-between">
                            <p className="text-gray-100 opacity-75">Budget</p>
                            <p className="text-pearl-white">
                                {movie.budget ? (movie.budget / 1000000).toFixed(0) + ' Million' : '-'}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col w-[45%]">
                        <div className="flex flex-row flex-nowrap justify-between">
                            <p className="text-pearl-white text-[1.5rem]">overview</p>
                        </div>
                        <div className="flex flex-row flex-nowrap justify-between lowercase">
                            <p className="text-pearl-white">{movie.overview}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}