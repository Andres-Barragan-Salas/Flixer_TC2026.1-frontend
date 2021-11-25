import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import flixerApi from '../api/flixerApi';
import { setLists } from '../store/slices/listsSlice';
import store from '../store/store';
import { validateEmail } from '../util/validators';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';

import './ListDetail.css';

const ListDetail = (params) => {
    const { id } = useParams();
    const { name, usernames } = useSelector(state => state.lists.find(list => (list._id === id)));
    const [movies, setMovies] = useState(null);
    const [addUserOpen, setAddUserOpen] = useState(false);
    const [partnerEmail, setPartnerEmail] = useState('');
    const [error, setError] = useState(null);

    const fetchMoviesAsync = async () => {
        try {
            const response = await flixerApi.get(`/movieList/${id}`);
            setMovies(response.data);
        } catch (err) {
            console.error(err);
            alert(err.response.data.error);
        }
    };

    useEffect(() => {
        fetchMoviesAsync();
    }, [id]);

    const validFields = () => {
        const setValidationError = (errorMessage) => {
            setError(errorMessage);
            return false;
        };

        setError(null);
        if (!partnerEmail) return setValidationError('Please provide an email with whom you want to share this list with');
        if (!validateEmail(partnerEmail)) setValidationError('Please provide a valid email for your friend');
        return true;
    };

    const addUser = async () => {
        if (validFields()) {
            try {
                setAddUserOpen(false);
                setMovies(null);
                const response = await flixerApi.put('/lists', { id, partnerEmail });
                store.dispatch(setLists(response.data));
                setPartnerEmail('');
                fetchMoviesAsync();
            } catch (err) {
                console.error(err);
                alert(err.response.data.error);
            }
        }
    }

    const renderMovies = () => {
        return movies.map((movie) => {
            const { _id, title, genre, overview, release_date, vote_average, poster_path } = movie;
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
                    </div>
                </div>
            );
        });
    };

    if (!movies) {
        return  <LoadingSpinner centered />;
    }

    return (
        <div className="details-screen">
            <div className="safe-area">
                <div className="horizontal-container">
                    <h1>{name}<span>{usernames.join(', ')}</span></h1>
                    <button onClick={() => setAddUserOpen(true)}>+ Add user</button>
                </div>
                <div className="movies-container">
                    {renderMovies()}
                </div>
            </div>
            <Modal active={addUserOpen} onDismiss={() => setAddUserOpen(false)}>
                <div className="user-addition" onClick={(e) => e.stopPropagation()}>
                    <h1>Add a friend to list</h1>
                    <div className="user-addition-input">
                        <i className="bx bxs-envelope" />
                        <input type="email" placeholder="Friend email" value={partnerEmail} onChange={(e) => setPartnerEmail(e.target.value)} />
                    </div>
                    <div className="options-container">
                        <p className="error-message">{error ?? ' '}</p>
                        <button onClick={addUser}>Add</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ListDetail;