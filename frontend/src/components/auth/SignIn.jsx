import React, { useState } from 'react';
import { Card, Form, Button, Image, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
// import image from '../../images/signIn.svg';
import { useAuth } from '../context/AuthContext';
import { getUser } from '../../services/api';

const SignIn = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState();

    const navigate = useNavigate();

    const { login } = useAuth();

    const inputValidation = () => {
        const errors = {};
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(email)) {
            errors.email = 'Invalid email address';
        }
        if (password.trim().length !== password.length) {
            errors.password = 'Password Should not contain whitespace';
        }
        setErrors(errors); 
        return Object.keys(errors).length === 0;
    }

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (inputValidation()) {
            const result = await getUser({ email, password }); 
            if (result.status === 201) {
                setMessage(result.data.message);
            } else if (result.status === 202) {
                setMessage(result.data.message);
            } else if (result.status === 200) {
                setMessage(result.data.message);
                login(result.data.token, result.data.userId);

                setPassword('');
                setEmail('');
                try {
                    navigate('/');
                } catch (err) {
                    console.log(err);
                }
            }
        }
    }

    const handleInputFocus = () => setMessage('');

    return (
        <div className = 'p-4'>
            <Card className='p-3 w-25'>
                {/* <Image src={image} rounded style={{ display: 'block', margin: '0 auto', width: 80, height: 80, borderRadius: '50%', padding: '10px' }} /> */}
                {message && (
                    <Alert className='text-center' variant='danger'>
                        {message}
                    </Alert>
                )}
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto' onSubmit={handleSubmit} onFocus={handleInputFocus}>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Email address</label>
                        <input 
                            type='email' 
                            placeholder='Enter email'
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            isInvalid={!!errors.email}
                            className='border-2 border-gray-500 px-4 py-2 w-full' />
                        {errors.email &&
                            <Form.Control.Feedback type='invalid'>
                                {errors.email}
                            </Form.Control.Feedback>
                        }
                    </div>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Password</label>
                        <input 
                            type='password' 
                            placeholder='Password'
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            isInvalid={!!errors.password}
                            className='border-2 border-gray-500 px-4 py-2 w-full' />
                        {errors.password &&
                            <Form.Control.Feedback type='invalid'>
                                {errors.password}
                            </Form.Control.Feedback>
                        }
                    </div>
                    <button className='p-2 bg-sky-300 m-8' onClick={handleSubmit} type='submit'>Submit</button>
                    <div className=' d-flex justify-content-center mt-2'>
                        <span className=''> Don't have an account?</span> &nbsp;
                        <a className='fw-bold text-dark text-decoration-none' href='/user/signUp'>Sign up</a>
                    </div>
                    <div className=' d-flex justify-content-center mt-2'>
                        <span className=''>Forgot Password? </span> &nbsp;
                        <a className='fw-bold text-dark text-decoration-none' href='/user/forgotPassword'>Reset</a>
                    </div>
                </div>
            </Card>
        </div >
    )
}

export default SignIn;