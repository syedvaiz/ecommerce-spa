import React, { useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const doLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className = "navbar navbar-expand-lg navbar-dark bg-dark mb-4">
            <div className = "container">
                <Link className='navbar-brand' to="/">E-Shop</Link>
                <button className='navbar-toggler' type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id="navMenu">
                    <ul className='navbar-nav ms-auto'>
                        {token ? (
                            <>
                                <li className='nav-item'><Link className='nav-link' to='/items'>Products</Link></li>
                                <li className='nav-item'><Link className='nav-link' to='/cart'>Cart</Link></li>
                                <li className='nav-item'><button className="btn btn-outline-light ms-2" onClick={doLogout}>Logout</button></li>
                            </>
                        ) : (
                            <>
                                <li className='nav-item'><Link className='nav-link' to='/signup'>Signup</Link></li>
                                <li className='nav-item'><Link className='nav-link' to='/login'>Login</Link></li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}