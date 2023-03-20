import React, { useContext, useState } from 'react'
import { AuthContext } from '../utils/Context'
import { useNavigate, Link } from 'react-router-dom';
import Axios from '../api/Api';

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const nav = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email !== null && password !== null) {
            Axios.post('/user-login', {
                userEmail: email,
                userPassword: password
            })
                .then(res => {
                    setAuth(res.data);
                    nav('/dashboard');
                });
        }
    };

    return (
        <div className="login vh-100 container py-5 h-100">
            <div className="row d-flex align-items-center justify-content-center h-100">     
                <div className="col-md-8 col-lg-7 col-xl-6">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                        className="img-fluid" alt="Phone" />
                </div>

                <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
                    <p className="h2 bold mb-5 mx-md-1">Login</p>
                    
                    <form>
                        <div className="form-outline mb-4">
                            <input type="email" id="email" className="form-control form-control-lg"
                                placeholder='Email or username' onChange={handleEmailChange} />

                        </div>

                        <div className="form-outline mb-4">
                            <input type="password" id="password" className="form-control form-control-lg"
                                placeholder='Password' onChange={handlePasswordChange} />

                        </div>

                        <div className="d-flex justify-content-around align-items-center mb-4">

                            <div className="form-check">
                                <input className="form-check-input" type="checkbox" value="" id="form1Example3" />
                                <label htmlFor="Remember me!">Remember Me</label>
                            </div>
                            <a href="#!" className='forgot-password-btn'>Forgot password?</a>
                        </div>

                        <button type="submit" className="btn-login" onClick={handleSubmit}>Sign in</button>
                        <hr />
                        Don't You Have An Account? &nbsp;
                        <Link to="/signup">Create an account</Link>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
