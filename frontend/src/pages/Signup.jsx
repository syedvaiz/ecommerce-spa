import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Signup () {
    const { signup } = useContext(AuthContext);
    const [ name, setName ] = useState('');
    const [ email, setEmail ]  = useState('');
    const [ password, setPassword ] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const ok = await signup(name, email, password);
        if (ok) navigate('/items');
        else alert("Singup Failed");
    };
    return (
        <div className='container mt-4'>
            <div className='row justify-content-center'>
                <div className='col-md-5'>
                    <div className='card p-4'>
                        <h3 className='mb-3'>Create account</h3>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label className='form-label'>Name</label>
                                <input value={name} onChange={e => setName(e.target.value)} className='form-control' required />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Email</label>
                                <input type='email' value={email} onChange={e => setEmail(e.target.value)} className='form-control' required />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Password</label>
                                <input type='password' value={password} onChange={e => setPassword(e.target.value)} className='form-control' required />
                            </div>
                            <button className='btn btn-success w-100'>Signup</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}