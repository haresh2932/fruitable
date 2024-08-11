import { Formik, ErrorMessage, Form, Field } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import { object, string } from 'yup';


function UserLogin(props) {
    const [field, setField] = useState("login");

    const userSchema = useMemo(() => object().shape({
        email: string().required("Email is required"),
        password: field !== "forget" ? string().required('Password is required').min(6, 'password must at least 6 characters') : null,
        name: field === "register" ? string().required('Name is required') : null,
        role: field === "register" ? string().required('Role is required') : null
    }), [field])

    const initialValues = useMemo(() => ({
        email: "",
        password: "",
        name: "",
        role: "",
    }), []);


    const handleSubmit = (values) => {
        console.log(values);
    }
    return (
        <div>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Login</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Shop</li>
                </ol>
            </div>
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <div className="d-none d-lg-flex col-lg-4 col-xl-6 align-items-center justify-content-center bg-primary p-5">
                        <div className="p-5 w-75">
                            <h1 className="text-white mb-4">Welcome To Fruitable</h1>
                            <h4 className="text-white mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
                                lacus et eros commodo dapibus.
                            </h4>
                            <img
                                src="img/login.jpg"
                                className="img-fluid w-100 mb-4 p-4"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="col-lg-8 col-xl-6">
                        <div className="position-relative overflow-hidden">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-12 col-md-10 col-lg-8 col-xl-6">
                                        <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                                            <div className="d-flex align-items-center mb-3">
                                                <h3 className="font-weight-semi-bold">{field == 'register' ? 'Register' : 'Login'}</h3>
                                            </div>

                                            <Formik
                                                initialValues={initialValues}
                                                validationSchema={userSchema}
                                                onSubmit={handleSubmit}
                                            >
                                                {() => (
                                                    <Form>
                                                        <div className="form-group">
                                                            <Field
                                                                name="email"
                                                                type="email"
                                                                placeholder='Enter Email'
                                                                className="form-control bg-light border-0 p-2 my-2"
                                                            />
                                                            <ErrorMessage name="email" component="div" className='error'/>
                                                        </div>
                                                        {field !== "forget" && (
                                                            <div>
                                                                <Field
                                                                    name="password"
                                                                    type="password"
                                                                    placeholder='Enter Password'
                                                                    className="form-control bg-light border-0 p-2 my-2"
                                                                />
                                                                <ErrorMessage name="password" component="div" className='error'/>
                                                            </div>
                                                        )}

                                                        {field === "register" && (
                                                            <>
                                                                <div>
                                                                    <Field
                                                                        name="name"
                                                                        type="text"
                                                                        placeholder='Enter Your Name'
                                                                        className="form-control bg-light border-0 p-2 my-2"
                                                                    />
                                                                    <ErrorMessage name="name" component="div"  className='error'/>
                                                                </div>

                                                                <div>
                                                                    <Field
                                                                        name="role"
                                                                        type="text"
                                                                        placeholder='Enter Your Role'
                                                                        className="form-control bg-light border-0 p-2 my-2"
                                                                    />
                                                                    <ErrorMessage name="role" component="div" className='error'/>
                                                                </div>
                                                            </>
                                                        )}
                                                        <br />
                                                        <button
                                                            type="submit"
                                                            className="btn btn-primary btn-block border-0 py-2"
                                                        >
                                                            Submit
                                                        </button>
                                                    </Form>
                                                )}
                                            </Formik>
                                            <div className="d-flex align-items-center my-3">
                                                { field !== 'register'?
                                                    <p className="mb-0">
                                                        <a onClick={() => setField('forget')} className="text-primary">
                                                            Forgete Password?
                                                        </a>
                                                    </p>
                                                    :
                                                    null
                                                }
                                            </div>
                                            <div className="d-flex align-items-center my-3">
                                                {field === 'login' ?
                                                    <p className="mb-0">
                                                        Have not Account ?{' '}
                                                        <a onClick={() => setField('register')} className="text-primary">
                                                            Register
                                                        </a>
                                                    </p>
                                                    :
                                                    <p className="mb-0">
                                                        Already have account ?{' '}
                                                        <a onClick={() => setField('login')} className="text-primary">
                                                            Login
                                                        </a>
                                                    </p>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default UserLogin;