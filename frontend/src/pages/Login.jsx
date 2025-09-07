import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { login } = useContext(AuthContext);
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ok = await login(email, password);
        if (ok) navigate('/items');
        else alert("Invalid credentials");
    };

    return (
        <div className='container mt-4'>
            <div className='row justify-content-center'>
                <div className='col-md-4'>
                    <div className='card p-4'>
                        <h3 className='mb-3'>Login</h3>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label className='form-label'>Email</label>
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className='form-control' required/>
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Password</label>
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className='form-control' required/>
                            </div>
                            <button className='btn btn-primary w-100'>Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}