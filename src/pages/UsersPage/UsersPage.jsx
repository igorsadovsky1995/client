import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './userPage.css';

function UserPage() {
    const [users, setUsers] = useState([]);
    const { eventId } = useParams();

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 3;

    useEffect(() => {
        const fetchUsers = async (page) => {
            try {
                const response = await axios.get(`https://forevent-eacbb67b7d4f.herokuapp.com/api/${eventId}?page=${page}&limit=${limit}`);
                setUsers(response.data.users || []);
                setCurrentPage(response.data.currentPage);
                setTotalPages(response.data.totalPages);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUsers(currentPage);
    }, [currentPage, eventId]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className='row'>
            <h2 className='col s12'>List of registered participants</h2>
            <div className='row'>
            {users.map(user => (
                <div className="col s12 m6 l4 castom-card" key={user._id}>
                    <div className='card'>
                        <div className='card-content text-darken-4'>
                        <p>Name : {user.name}</p>
                        <p>Email : {user.email}</p>
                        <p>Date of Birth : {formatDate(user.dateOfBirth)}</p>
                        <p>How did know : {user.heardFrom}</p>
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
                
                <Link className="btn waves-effect waves-light" to={'/'}>Back</Link>
                
            </div>
        </div>
    );
}

export default UserPage;