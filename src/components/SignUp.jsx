import React from 'react';
import { FaUserAlt, FaKey } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import Axios from '../api/Api';

const SignUp = () => {
    const nav = useNavigate();

    const formik = useFormik({
        initialValues: {
            fullname: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        validationSchema: Yup.object({
            fullname: Yup.string()
                .required("Name is required"),
            email: Yup.string()
                .required("Email is required")
                .email("Invalid Email Address"),
            password: Yup.string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters or more.")
                .max(16, "Password must be 16 charactres or less."),
            confirmPassword: Yup.string()
                .required("Password is required")
                .min(8, "Password must be at least 8 characters or more.")
                .max(16, "Password must be 16 charactres or less.")
        }),
        onSubmit: (values) => {
            Axios.post('/user-signup', {
                fullname: values.fullname,
                email: values.email,
                password: values.password
            });
            nav('/');
        }
    });

    return (
        <section className="signup row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">

                <div className="card-body p-md-4">
                    <div className="row justify-content-center">
                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                            <p className="text-center h2 fw-bold mb-4 mx-1 mx-md-4">Registration</p>

                            <form onSubmit={formik.handleSubmit} className="mx-1 mx-md-4">
                                <div className="error-message">{formik.touched.fullname && formik.errors.fullname ? formik.errors.fullname : ""}</div>
                                <div className="d-flex flex-row align-items-center mb-4">
                                    <FaUserAlt className='me-3' />
                                    <div className="form-outline flex-fill mb-0">
                                        <input
                                            type="text"
                                            id="fullname"
                                            className="form-control"
                                            placeholder='Full Name'
                                            value={formik.values.fullname}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                </div>

                                <div className="error-message">{formik.touched.email && formik.errors.email ? formik.errors.email : ""}</div>
                                <div className="d-flex flex-row align-items-center mb-4">
                                    <MdEmail className='me-3' />
                                    <div className="form-outline flex-fill mb-0">
                                        <input
                                            type="email"
                                            id="email"
                                            className="form-control"
                                            placeholder='Email'
                                            value={formik.values.email}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                </div>

                                <div className="error-message">{formik.touched.password && formik.errors.password ? formik.errors.password : ""}</div>
                                <div className="d-flex flex-row align-items-center mb-4">
                                    <RiLockPasswordFill className='me-3' />
                                    <div className="form-outline flex-fill mb-0">
                                        <input
                                            type="password"
                                            id="password"
                                            className="form-control"
                                            placeholder='Password'
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                </div>

                                <div className="error-message">{formik.touched.confirmPassword && formik.errors.confirmPassword ? formik.errors.confirmPassword : ""}</div>
                                <div className="d-flex flex-row align-items-center mb-4">
                                    <FaKey className='me-3' />
                                    <div className="form-outline flex-fill mb-0">
                                        <input
                                            type="password"
                                            id="confirmPassword"
                                            className="form-control"
                                            placeholder='Retype your password'
                                            value={formik.values.confirmPassword}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                    </div>
                                </div>

                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                    <button type="submit" className="btn-signup">Register</button>
                                </div>

                                <br />
                                Already Have An Account? &nbsp;
                                <Link to="/login">Sign in</Link>
                            </form>
                        </div>

                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                            <img src="https://static.vecteezy.com/system/resources/previews/007/278/547/original/work-at-home-concept-illustration-freelance-man-working-on-computer-at-her-house-isolated-on-white-background-online-study-education-vector.jpg"
                                className="img-fluid" alt="Sample image" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignUp
