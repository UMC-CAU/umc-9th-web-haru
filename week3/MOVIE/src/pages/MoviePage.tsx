import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import type { Movie, MovieResponse } from "../types/movie";
import axios from "axios";

export default function MoviePage() {
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect (() => {
        const fetchMovies = async () => {
            const {data} = await axios.get<MovieResponse> (
                'https://api.themoviedb.org/3/movie/popular?language=en-US&page=2', 
                {
                    headers: {
                        Authorization: `Bearer ${import.meta.env.VITE_TMDB_KEY}`, 
                    },
                }
            );
            console.log(data);

            setMovies(data.results);
        };

        fetchMovies();
     }, []);

    return (
        <div className="p-10 grid gap-4 gird-cols-2 sn:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {movies.map((movie) : React.ReactElement => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
};