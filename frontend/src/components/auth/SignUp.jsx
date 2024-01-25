import React, { useState } from 'react'
import { Card, Form, Button, Image, Alert } from 'react-bootstrap';
// import image from '../../images/signUp.svg';
import { useSignUpFormState } from './authState.js';
import { createUser } from '../../services/api';

const SignUp = () => {
    const { signUpFormState, setSignUpFormState, handleInputChange } = useSignUpFormState();
    const [message, setMessage] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(signUpFormState.errors).every((error) => error === '')) {
            setMessage("Loading....");
            const result = await createUser(
                { name: signUpFormState.name, email: signUpFormState.email, password: signUpFormState.password });

            setSignUpFormState({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                errors: {}
            });

            setMessage(result.data.message);
        }
    }

    const handleInputFocus = () => setMessage('');

    return (
        <div className = 'p-4'>
            <Card className='p-3 w-25'>
                {/* <Image src={image} rounded style={{ display: 'block', margin: '0 auto', width: 75, height: 75, borderRadius: '50%', padding: '10px' }} /> */}
                {message && (
                    <Alert className='text-center p-1' variant='info'>
                        {message}
                    </Alert>
                )}
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto' onSubmit={handleSubmit} onFocus={handleInputFocus}>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Name</label>
                        <input 
                            required
                            type='text' 
                            placeholder='Enter Name' 
                            name='name'
                            value={signUpFormState.name} 
                            onChange={handleInputChange} 
                            isInvalid={!!signUpFormState.errors.name} 
                            className='border-2 border-gray-500 px-4 py-2 w-full'/>
                        {signUpFormState.errors.name &&
                            <Form.Control.Feedback type='invalid'>
                                {signUpFormState.errors.name}
                            </Form.Control.Feedback>
                        }
                    </div>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Email address</label>
                        <input 
                            required 
                            type='email' 
                            placeholder='Enter email address' 
                            name='email' 
                            onChange={handleInputChange}
                            value={signUpFormState.email} 
                            isInvalid={!!signUpFormState.errors.email}
                            className='border-2 border-gray-500 px-4 py-2 w-full' />
                        {signUpFormState.errors.email &&
                            <Form.Control.Feedback type='invalid'>
                                {signUpFormState.errors.email}
                            </Form.Control.Feedback>
                        }
                    </div>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>New Password</label>
                        <input 
                            required 
                            type='password' 
                            placeholder='New Password' 
                            name='password'
                            value={signUpFormState.password} 
                            onChange={handleInputChange} 
                            isInvalid={!!signUpFormState.errors.password} 
                            className='border-2 border-gray-500 px-4 py-2 w-full'/>
                        {signUpFormState.errors.password &&
                            <Form.Control.Feedback type='invalid'>
                                {signUpFormState.errors.password}
                            </Form.Control.Feedback>
                        }
                    </div>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Confirm Password</label>
                        <input 
                            required 
                            type='password' 
                            placeholder='Confirm Password' 
                            value={signUpFormState.confirmPassword}
                            name='confirmPassword' 
                            onChange={handleInputChange} 
                            isInvalid={!!signUpFormState.errors.confirmPassword}
                            className='border-2 border-gray-500 px-4 py-2 w-full' />
                        {signUpFormState.errors.confirmPassword &&
                            <Form.Control.Feedback type='invalid'>
                                {signUpFormState.errors.confirmPassword}
                            </Form.Control.Feedback>
                        }
                    </div>
                    <button className='p-2 bg-sky-300 m-8' onClick={handleSubmit} type='submit'>Submit</button>
                    <div className='d-flex justify-content-center mt-2'>
                        <span> Already have an account? </span> &nbsp;
                        <a className='fw-bold text-dark text-decoration-none' href='/user/signIn'>Sign In</a>
                    </div>
                </div>
            </Card>
        </div >
    )
}

export default SignUp;