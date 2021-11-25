import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import flixerApi from '../api/flixerApi';
import { setLists } from '../store/slices/listsSlice';
import store from '../store/store';
import { validateEmail } from '../util/validators';
import LoadingSpinner from '../components/LoadingSpinner';
import Modal from '../components/Modal';

import './Lists.css';

const Lists = () => {
    const lists = useSelector(state => state.lists);
    const [listForm, setListForm] = useState({ name: '', partnerEmail: '' });
    const [listCreationOpen, setListCreationOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { name, partnerEmail } = listForm;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setListForm({ ...listForm, [name]: value });
    };

    const validFields = () => {
        const setValidationError = (errorMessage) => {
            setError(errorMessage);
            return false;
        };

        setError(null);
        if (!name) return setValidationError('Please provide a name for your list');
        if (!partnerEmail) return setValidationError('Please provide an email with whom you want to share this list with');
        if (!validateEmail(partnerEmail)) setValidationError('Please provide a valid email for your friend');
        return true;
    };

    const createList = async () => {
        if (validFields()) {
            setLoading(true);
            try {
                setListCreationOpen(false);
                const response = await flixerApi.post('/lists', { name, partnerEmail });
                store.dispatch(setLists(response.data));
                setListForm({ name: '', partnerEmail: '' });
            } catch (err) {
                console.error(err);
                alert(err.response.data.error);
            }
            setLoading(false);
        }
    };

    const deleteList = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await flixerApi.delete('/lists', { data: { id }});
            store.dispatch(setLists(response.data));
        } catch (err) {
            console.error(err);
            alert(err.response.data.error);
        }
    };

    const renderLists = () => {
        return lists.map((list) => {
            const { _id, name, usernames } = list;
            return (
                <div className="list-display" key={_id} onClick={() => navigate(`/lists/${_id}`)}>
                    <div className="list-top">
                        <h3>{name}</h3>
                        <button onClick={(e) => deleteList(e, _id)}><i className="bx bxs-trash" /></button>
                    </div>
                    <p className="usernames">Users: {usernames.join(', ')}</p>
                </div>
            );
        });
    };

    return (
        <div className="lists-screen">
            <div className="safe-area">
                <div className="screen-top">
                    <h1><span>My</span> Lists</h1>
                    <button onClick={() => setListCreationOpen(true)}>+ Create list</button>
                </div>
                <div className="lists-container">
                    {loading || lists.length === 0
                        ?   loading
                            ?   <LoadingSpinner centered />
                            :   'You have no lists yet, create one!'
                        :   renderLists()
                    }
                </div>
            </div>
            <Modal active={listCreationOpen} onDismiss={() => setListCreationOpen(false)}>
                <div className="list-creation" onClick={(e) => e.stopPropagation()}>
                    <h1>Create a list</h1>
                    <div className="list-creation-input">
                        <i className="bx bx-list-ul" />
                        <input name="name" type="email" placeholder="List name" value={name} onChange={handleInputChange} />
                    </div>
                    <div className="list-creation-input">
                        <i className="bx bxs-envelope" />
                        <input name="partnerEmail" type="email" placeholder="Friend email" value={partnerEmail} onChange={handleInputChange} />
                    </div>
                    <div className="options-container">
                        <p className="error-message">{error ?? ' '}</p>
                        <button onClick={createList}>Create</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Lists;