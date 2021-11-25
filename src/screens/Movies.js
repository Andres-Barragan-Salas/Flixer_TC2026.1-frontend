import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import flixerApi from '../api/flixerApi';
import { setUser } from '../store/slices/userSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import store from '../store/store';

import './Movies.css';

const Movies = () => {
    const movies = useSelector(state => state.movies);
    const { likedMovies, unlikedMovies } = useSelector(state => state.user);
    const [loading, setLoading] = useState(false);

    const likeMovie = async (id, like) => {
        setLoading(true);
        try {
            let response;
            if (like) {
                await flixerApi.delete('/user/movie/unlike', { data: { id }});
                response = await flixerApi.post('/user/movie/like', { id });
            } else {
                response = await flixerApi.delete('/user/movie/like', { data: { id }});
            }
            store.dispatch(setUser(response.data));
        } catch (err) {
            console.error(err);
            alert(err.response.data.error);
        }
        setLoading(false);
    };

    const unlikeMovie = async (id, unlike) => {
        setLoading(true);
        try {
            let response;
            if (unlike) {
                await flixerApi.delete('/user/movie/like', { data: { id }});
                response = await flixerApi.post('/user/movie/unlike', { id });
            } else {
                response = await flixerApi.delete('/user/movie/unlike', { data: { id }});
            }
            store.dispatch(setUser(response.data));
        } catch (err) {
            console.error(err);
            alert(err.response.data.error);
        }
        setLoading(false);
    };

    const renderMovies = () => {
        return movies.map((movie) => {
            const { _id, title, genre, overview, release_date, vote_average, poster_path } = movie;
            const liked = likedMovies?.includes(_id);
            const unliked = unlikedMovies?.includes(_id);
            return (
                <div className="movie-display" key={_id}>
                    <div className="movie-image">
                        <img src={poster_path} alt={title}/>
                        <label>{genre}</label>
                    </div>
                    <div className="info-container">
                        <div className="movie-info">
                            <div className="movie-top">
                                <h2>{title}</h2>
                                <div className="average"><i className='bx bx-star' /> {vote_average}</div>
                            </div>
                            <label>{release_date.substring(0,4)}</label>
                            <p>{overview}</p>
                        </div>
                        <div className="options-container">
                            <button disabled={loading} onClick={() => unlikeMovie(_id, !unliked)}>{!loading ? <i className={`bx bx${unliked ? 's' : ''}-dislike`} /> : <LoadingSpinner small colored />}</button>
                            <button disabled={loading} onClick={() => likeMovie(_id, !liked)}>{!loading ? <i className={`bx bx${liked ? 's' : ''}-like`} /> : <LoadingSpinner small />}</button>
                        </div>
                    </div>
                </div>
            );
        });
    };

    return (
        <div className="movies-screen">
            <div className="safe-area">
                <h1>Featured <span>Movies</span></h1>
                <div className="movies-container">
                    {renderMovies()}
                </div>
            </div>
        </div>
    );
};

export default Movies;