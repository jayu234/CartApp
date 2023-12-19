import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { loadUser, userLogin } from '../store/userSlice';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {success} = useSelector((state)=>state.user.login);
    const { isAuthenticated } = useSelector((state) => state.user);

    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userLogin(credentials));
        if(success){
            dispatch(loadUser());
        }
    }

    const togglePassword = () => {
        if (!showPassword) {
            setShowPassword(true);
        }
        else {
            setShowPassword(false);
        }
    }
    if(isAuthenticated){
        return <Navigate to="/" />
    }
    return (
        <div className='container d-flex flex-column' style={{ marginTop: '4rem', width: '26rem' }}>
            <div className='text-center'><h2 className='mb-3'>Login</h2></div>
            <div className="container border border-secondary border-2 rounded-3 p-3">
                <form method='post' onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={credentials.email} name='email' onChange={handleOnChange} required autoComplete='email' />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type={`${(showPassword) ? "text" : "password"}`} className="form-control" id="password" value={credentials.password} name='password' onChange={handleOnChange} required autoComplete='current-password' />
                    </div>
                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={togglePassword} autoComplete='current-password' />
                        <label className="form-check-label" htmlFor="flexCheckDefault" style={{ fontSize: '0.95rem' }} >
                            Show Password
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={!credentials.email || !credentials.password}>Login</button>
                </form>
            </div>
            <div className="container text-center">
                <p>Don't have any account? <Link to='/signup'>Create one</Link></p>
            </div>
        </div>
    )
}

export default Login