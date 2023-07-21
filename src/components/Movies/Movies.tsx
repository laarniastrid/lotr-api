import React, { useEffect, useState } from 'react';

import './Movies.scss';
import sadKittenImg from '../../assets/images/sad-kitten.jpg';

import { MovieDTO, MoviesDTO, MoviesUI } from '../../models/movies.model';

const Movies = () => {
    const [movies, setMovies] = useState<MoviesUI[]>([]);
    const [isError, setIsError] = useState<boolean>(false);

    const apiKey = process.env.REACT_APP_LOTR_AUTHORIZATION_KEY;

    const getMovies = async () => {
        const headers = {
            'Accept': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        };
        const baseUrl = 'https://the-one-api.dev/v2';
        const requestUrl = `${baseUrl}/movie`;

        try {
            const rawMovies = await fetch(requestUrl, { headers: headers });

            if (rawMovies.ok === false) {
                throw new Error('Request movies failed')
            }

            const moviesDTO: MoviesDTO = await rawMovies.json();
            const moviesUI: MoviesUI[] = moviesDTO.docs.map(movie => formatMovie(movie));

            setMovies(moviesUI);
        } catch (error) {
            setIsError(true);
        }
    };

    useEffect(() => {
        getMovies();
    }, []);

    const formatMovie = (movie: MovieDTO): MoviesUI => (
        {
            name: movie.name,
            score: Math.round(movie.rottenTomatoesScore),
            runtime: movie.runtimeInMinutes,
            budget: movie.budgetInMillions,
            revenue: movie.boxOfficeRevenueInMillions,
            nominations: movie.academyAwardNominations,
            wins: movie.academyAwardWins,
            id: movie._id,
        }
    );

    return (
        <div className='movies'>
            <h1 className="title">Movies</h1>

            <div className="container">
                {isError ? (
                    <div className="content">
                        <div className="error">
                            <p>
                                Sad kitten is sad because there was an error.
                            </p>

                            <p>
                                There was an error loading the content, please try again later.
                            </p>
                        </div>

                        <img src={sadKittenImg} alt="Sad kitten is sad because there was an error loading the content" className='error image' />
                    </div>
                ) : (
                    <>
                        <p className='intro'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod fuga excepturi error earum reiciendis voluptatem ipsa, eos impedit et corporis aperiam ipsam tempore soluta id vitae commodi consectetur repellat possimus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae dicta vel, esse consectetur laboriosam iure numquam tenetur blanditiis repudiandae modi labore ipsum cum ipsa hic voluptatum enim architecto et. Quibusdam?
                        </p>

                        <div className="content">
                            {movies.map(movie => (
                                <div className="content-block" key={movie.id}>
                                    <div className="movie">
                                        <div className='name'>
                                            {movie.name}
                                        </div>

                                        <div className='info'>
                                            <div className='item'>
                                                Score: {movie.score}/100
                                            </div>

                                            <div className='item'>
                                                Runtime: {movie.runtime} minutes
                                            </div>

                                            <div className='item'>
                                                Budget: ${movie.budget} million
                                            </div>

                                            <div className='item'>
                                                Revenue: ${movie.revenue} million
                                            </div>

                                            <div className='item'>
                                                Nominations: {movie.nominations}
                                            </div>

                                            <div className='item'>
                                                Award Wins: {movie.wins}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}


            </div>
        </div>
    );
};

export default Movies;
