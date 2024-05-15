import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './eventPage.css'
const EventBoard = () => {
    const [events, setEvents] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 3; 

    useEffect(() => {
        fetchEvents(currentPage);
    }, [currentPage]);

    const fetchEvents = async (page) => {
        try {
            const response = await axios.get(`https://forevent-eacbb67b7d4f.herokuapp.com/api/events/all?page=${page}&limit=${limit}`);
            setEvents(response.data.events);
            setCurrentPage(response.data.currentPage);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className='row'>
            <h1 className='col s12'>Events</h1>
            <div className='row my-card-container'>
                {events.map(event => (
                    <div className='col s12 m6 l4 ' key={event._id}>
                        <div className='card smell'>
                            <div className='card-content'>
                                <span className='card-title'>{event.title}</span>
                                <p>{event.description}</p>
                                <span className='event-info'>Event date : {formatDate(event.eventDate)}</span>
                                <span className='event-info'>Оrganizer : {event.organizer}</span>
                            </div>
                            <div className="card-action">
                                <Link to={`/registration/${event._id}`}>Registration</Link>
                                <Link to={`/users/${event._id}`}>View</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='col s12'>
                {
                    totalPages > 1 ? <div className='castom-pagination'>
                    { 
                    Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index}
                            onClick={() => handlePageChange(index + 1)}
                            disabled={currentPage === index + 1}
                        >
                            {index + 1}
                        </button>
                    ))
                    }
                    </div>:''
                }
            </div>
        </div>
    );
};

export default EventBoard;