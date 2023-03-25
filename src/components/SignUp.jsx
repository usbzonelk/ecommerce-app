import React from 'react'
import { FaUserAlt, FaKey } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'

const SignUp = () => {
    return (
        <section className="signup row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
                <div className="card text-black">
                    <div className="card-body p-md-4">
                        <div className="row justify-content-center">
                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4">Sign up</p>

                                <form className="mx-1 mx-md-4">
                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <FaUserAlt className='me-3' />
                                        <div className="form-outline flex-fill mb-0">
                                            <input type="text" id="fullname" className="form-control" placeholder='Full Name' />
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <MdEmail className='me-3' />
                                        <div className="form-outline flex-fill mb-0">
                                            <input type="email" id="email" className="form-control" placeholder='Email' />
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <RiLockPasswordFill className='me-3' />
                                        <div className="form-outline flex-fill mb-0">
                                            <input type="password" id="password" className="form-control" placeholder='Password' />
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <FaKey className='me-3' />
                                        <div className="form-outline flex-fill mb-0">
                                            <input type="password" id="password-repeat" className="form-control" placeholder='Repeat your password' />
                                        </div>
                                    </div>

                                    <div className="form-check d-flex justify-content-center mb-4">
                                        <input className="form-check-input me-3" type="checkbox" value="" id="form2Example3c" />
                                        <label className="form-check-label" for="form2Example3">
                                            I agree all statements in <a href="#" className='text-decoration-none'>Terms of service</a>
                                        </label>
                                    </div>

                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <button type="button" className="btn btn-primary btn-lg">Register</button>
                                    </div>
                                </form>
                            </div>

                            <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                <img src="https://static.vecteezy.com/system/resources/previews/007/278/547/original/work-at-home-concept-illustration-freelance-man-working-on-computer-at-her-house-isolated-on-white-background-online-study-education-vector.jpg"
                                    className="img-fluid" alt="Sample image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp
import React from 'react'
import { FaUserAlt, FaKey } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md'
import { RiLockPasswordFill } from 'react-icons/ri'

const SignUp = () => {
    return (
        <section className="signup row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
                <div className="card text-black">
                    <div className="card-body p-md-4">
                        <div className="row justify-content-center">
                            <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                <p className="text-center h1 fw-bold mb-4 mx-1 mx-md-4">Sign up</p>

                                <form className="mx-1 mx-md-4">
                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <FaUserAlt className='me-3' />
                                        <div className="form-outline flex-fill mb-0">
                                            <input type="text" id="fullname" className="form-control" placeholder='Full Name' />
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <MdEmail className='me-3' />
                                        <div className="form-outline flex-fill mb-0">
                                            <input type="email" id="email" className="form-control" placeholder='Email' />
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <RiLockPasswordFill className='me-3' />
                                        <div className="form-outline flex-fill mb-0">
                                            <input type="password" id="password" className="form-control" placeholder='Password' />
                                        </div>
                                    </div>

                                    <div className="d-flex flex-row align-items-center mb-4">
                                        <FaKey className='me-3' />
                                        <div className="form-outline flex-fill mb-0">
                                            <input type="password" id="password-repeat" className="form-control" placeholder='Retype your password' />
                                        </div>
                                    </div>

                                    <div className="form-check d-flex justify-content-center mb-4">
                                        <input className="form-check-input me-3" type="checkbox" value="" id="form2Example3c" />
                                        <label className="form-check-label" for="form2Example3">
                                            I agree all statements in <a href="#" className='text-decoration-none'>Terms of service</a>
                                        </label>
                                    </div>

                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <button type="button" className="btn btn-primary btn-lg">Register</button>
                                    </div>

                                    Already Have An Account?<br/><br/>
                                    <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                        <button type="button" className="btn btn-primary btn-lg">Login</button>
                                    </div>
                                </form>
                            </div>

                            <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                                <img src="https://static.vecteezy.com/system/resources/previews/007/278/547/original/work-at-home-concept-illustration-freelance-man-working-on-computer-at-her-house-isolated-on-white-background-online-study-education-vector.jpg"
                                    className="img-fluid" alt="Sample image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp
