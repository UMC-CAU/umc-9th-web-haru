import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import type { MovieDetails, Credits, Cast } from "../types/movie"; 
import { LoadingSpinner } from "../components/LoadingSpinner"; 

const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";
const API_KEY = import.meta.env.VITE_TMDB_KEY;


export default function MovieDetailPage() {
    const { movieId } = useParams<{ movieId: string }>();

    const [details, setDetails] = useState<MovieDetails | null>(null);
    const [credits, setCredits] = useState<Credits | null>(null);
    
    const [isPending, setIsPending] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        if (!movieId) return;

        const fetchDetails = async () => {
            setIsPending(true);
            setIsError(false);

            try {
                const detailsPromise = axios.get<MovieDetails>(
                    `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
                    { headers: { Authorization: `Bearer ${API_KEY}` } }
                );


                const creditsPromise = axios.get<Credits>(
                    `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
                    { headers: { Authorization: `Bearer ${API_KEY}` } }
                );

                const [detailsResponse, creditsResponse] = await Promise.all([
                    detailsPromise, creditsPromise
                ]);

                setDetails(detailsResponse.data);
                setCredits(creditsResponse.data);

            } catch (error) {
                console.error("Failed to fetch movie data:", error);
                setIsError(true);
            } finally {
                setIsPending(false);
            }
        };

        fetchDetails();
    }, [movieId]);

    
    if (isPending) {
        return (
             <div className="flex justify-center items-center h-screen-1/2 p-20">
                <LoadingSpinner />
             </div>
        );
    }

    if (isError || !details) {
        return (
            <div className="p-10 text-center bg-red-100 text-red-700 rounded-lg m-10 shadow-lg">
                <h2 className="text-2xl font-bold mb-2">Failed to load movie information</h2>
                <p>Please Try Again Shortyly (ID: {movieId})</p>
            </div>
        );
    }
    

    const director = credits?.crew.find(c => c.job === 'Director'); 
    const mainCast = credits?.cast.filter(c => c.profile_path).slice(0, 5) || [];

    const backdropUrl = details.backdrop_path 
        ? `${TMDB_IMAGE_BASE_URL}original${details.backdrop_path}` 
        : '';
        
    const posterUrl = details.poster_path
        ? `${TMDB_IMAGE_BASE_URL}w500${details.poster_path}`
        : 'https://via.placeholder.com/500x750?text=No+Poster';

    return (
        <div 
            className="relative min-h-screen bg-gray-900 text-white pb-12"
            style={{ 
                backgroundImage: backdropUrl ? `url(${backdropUrl})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="absolute inset-0 bg-black bg-opacity-75"></div>
            
            <div className="relative container mx-auto p-8 pt-12">
                <div className="flex flex-col md:flex-row gap-10">
                    
                    <div className="w-full md:w-1/3 flex-shrink-0">
                        <img 
                            src={posterUrl}
                            alt={details.title}
                            className="rounded-lg shadow-2xl w-full max-w-sm md:max-w-none transform hover:scale-[1.02] transition duration-300"
                        />
                    </div>

                    <div className="w-full md:w-2/3">
                        <h1 className="text-5xl font-extrabold mb-1">{details.title}</h1>
                        {details.tagline && (
                            <p className="text-xl italic text-gray-400 mb-6 border-b border-gray-700 pb-4">
                                "{details.tagline}"
                            </p>
                        )}

                        <div className="flex items-center space-x-6 text-lg mb-8">
                            <span className="flex items-center bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-bold">
                                ⭐ {details.vote_average.toFixed(1)}
                            </span>
                            <span className="text-gray-300">
                                ⏳ {details.runtime ? `${details.runtime}분` : 'N/A'}
                            </span>
                            <span className="text-gray-300">
                                {details.genres.map(g => g.name).join(' • ')}
                            </span>
                        </div>

                        <h2 className="text-2xl font-bold mb-3 mt-6">Summary</h2>
                        <p className="text-gray-300 leading-relaxed text-base mb-10">{details.overview}</p>

                        <div className="border-t border-gray-700 pt-6">
                            {director && (
                                <div className="text-xl mb-6">
                                    <span className="font-bold text-indigo-300 mr-2">Director:</span>
                                    <span className="font-medium">{director.name}</span>
                                </div>
                            )}

                            <h3 className="text-xl font-semibold mt-4 mb-4">Main Actor</h3>
                            <div className="flex flex-wrap gap-6">
                                {mainCast.map(actor => (
                                    <CastCard key={actor.id} actor={actor} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface CastCardProps {
    actor: Cast;
}
const CastCard: React.FC<CastCardProps> = ({ actor }) => {
    const profilePath = actor.profile_path 
        ? `${TMDB_IMAGE_BASE_URL}w200${actor.profile_path}` 
        : 'https://via.placeholder.com/80?text=No+Pic';

    return (
        <div className="text-center w-24">
            <img 
                src={profilePath}
                alt={actor.name}
                className="w-24 h-24 object-cover rounded-full mx-auto border-2 border-gray-600 hover:border-indigo-400 transition duration-300"
            />
            <p className="text-sm mt-2 font-medium truncate">{actor.name}</p>
            <p className="text-xs text-gray-400 truncate">({actor.character})</p>
        </div>
    );
};