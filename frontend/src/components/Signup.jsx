import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { userSignup } from '../store/userSlice';

function SignUp() {

    const [showPassword, setShowPassword] = useState(false);
    const [credentials, setCredentials] = useState({ firstName: '', lastName: '', email: '', password: '' });

    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(userSignup(credentials));
        navigate("/");
    }
    const togglePassword = () => {
        if (!showPassword) {
            setShowPassword(true);
        }
        else {
            setShowPassword(false);
        }
    }
    const isAuthenticated  = useSelector((state) => state.user.isAuthenticated)

    if (isAuthenticated)
        return <Navigate to="/" />
    return (
        <>
            <div className='container d-flex flex-column' style={{ marginTop: '4rem', width: '35rem' }}>
                <div className='text-center'><h2 className='mb-3'>Signup</h2></div>
                <div className="container border border-secondary border-2 rounded-3 p-3">
                    <form method='post' onSubmit={handleSubmit}>
                        <div className="mb-3 row row-cols-2">
                            <div className='col'>
                                <label htmlFor="firstName" className="form-label">First name</label>
                                <input type="text" className="form-control" id="firstName" aria-describedby="emailHelp" value={credentials.firstName} name='firstName' onChange={handleOnChange} required />
                            </div>
                            <div className='col'>
                                <label htmlFor="lastName" className="form-label">Last name</label>
                                <input type="text" className="form-control" id="lastName" aria-describedby="emailHelp" value={credentials.lastName} name='lastName' onChange={handleOnChange} required />
                            </div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input ref={emailRef} type="email" className="form-control" id="email" aria-describedby="emailHelp" value={credentials.email} name='email' onChange={handleOnChange} required autoComplete='email' />
                        </div>
                        <div className="mb-3">
                            <div className='d-flex justify-content-between'>
                                <label htmlFor="password" className="form-label">Choose Password</label>
                                <span id="emailHelp" className="form-text ms-1"><em>Password must have 8 or more characters.</em></span>
                            </div>
                            <input ref={passwordRef} type={`${(showPassword) ? "text" : "password"}`} className="form-control" id="password" value={credentials.password} name='password' onChange={handleOnChange} autoComplete='current-password' required />
                        </div>
                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" onClick={togglePassword} autoComplete='current-password' />
                            <label className="form-check-label" htmlFor="flexCheckDefault" style={{ fontSize: '0.95rem' }} >
                                Show Password
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary" disabled={!credentials.firstName || !credentials.lastName || !credentials.email || !credentials.password}>Create account</button>
                    </form>
                </div>
                <div className="container text-center">
                    <p>Already have one? <Link to='/login'>Login</Link></p>
                </div>
            </div>
        </>
    );
}

export default SignUp;