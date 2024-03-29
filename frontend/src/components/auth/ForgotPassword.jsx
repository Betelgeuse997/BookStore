import React, { useState } from 'react';
import { Card, Form, Button, Image, Alert } from 'react-bootstrap';
// import image from '../../images/reset.svg';
import { forgotPassword } from '../../services/api';
import { useForgotPasswordFormState } from './authState';

const ForgotPassword = () => {
    const { forgotPasswordFormState, SetForgotPasswordFormState, handleInputChange } = useForgotPasswordFormState();
    const [message, setMessage] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (forgotPasswordFormState.errorMessage === '') {
            try {
                setMessage('loading....');
                const result = await forgotPassword(forgotPasswordFormState.email);

                if (result.status === 200) {
                    setMessage(result.message);
                } else {
                    setMessage(result.message);
                }

                SetForgotPasswordFormState({
                    email: '',
                    errorMessage: '',
                });

            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className='mt-4 d-flex flex-wrap justify-content-center '>
            <Card className='p-3 w-25'>
                {/* <Image src={image} rounded style={{ display: 'block', margin: '0 auto', width: 75, height: 75, borderRadius: '50%', padding: '10px' }} /> */}
                {message && (
                    <Alert className='text-center' variant='info'>
                        {message}
                    </Alert>
                )}
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto' onSubmit={handleSubmit}>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Email address</label>
                        <input 
                            required 
                            type='email' 
                            placeholder='Enter email address' 
                            name='email' 
                            onChange={handleInputChange}
                            value={forgotPasswordFormState.email} 
                            isInvalid={!!forgotPasswordFormState.errorMessage} />
                        {forgotPasswordFormState.errorMessage &&
                            <Form.Control.Feedback type='invalid'>
                                {forgotPasswordFormState.errorMessage}
                            </Form.Control.Feedback>
                        }
                    </div>
                    {/* <Form.Group className='mb-2' controlId='formGroupEmail' placeholder='Email address'>
                        <Form.Label>Email address</Form.Label>
                        <Form.Control name='email' required type='email' value={forgotPasswordFormState.email} placeholder='Enter email'
                            onChange={handleInputChange} isInvalid={!!forgotPasswordFormState.errorMessage}
                            onFocus={() => setMessage('')} />
                        {forgotPasswordFormState.errorMessage &&
                            <Form.Control.Feedback type='invalid'>
                                {forgotPasswordFormState.errorMessage}
                            </Form.Control.Feedback>
                        }
                    </Form.Group> */}
                    <button className='w-100' variant='outline-dark' onClick={handleSubmit} type='submit'>Submit</button>
                    <div className='mt-2  d-flex justify-content-center'>
                        <span>Please check your email, for password reset link to reset password.</span>  &nbsp;
                        To  &nbsp;
                        <a className='fw-bold text-dark text-decoration-none' href='/user/signIn'>Sign in /</a> &nbsp;
                        <a className='fw-bold text-dark text-decoration-none' href='/user/signUp'>Sign up</a>
                    </div>
                </div>
            </Card>
        </div >
    )
}

export default ForgotPassword;