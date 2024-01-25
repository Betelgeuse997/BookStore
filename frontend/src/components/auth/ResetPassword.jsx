import React, { useState } from 'react';
import { Card, Form, Button, Image, Alert } from 'react-bootstrap';
// import image from '../../images/signIn.svg';
import { useParams } from 'react-router-dom';
import { useResetPasswordFormState } from './authState';
import { resetPassword } from '../../services/api'; 

const ResetPassword = () => {

    const { token } = useParams();
    const [message, setMessage] = useState('');
    const { resetPasswordFormState, setResetPasswordFormState, handleInputChange } = useResetPasswordFormState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (Object.values(resetPasswordFormState.errorMessage).every((error) => error === '')) {
            try {
                const result = await resetPassword(resetPasswordFormState.password, token);

                setResetPasswordFormState({
                    password: "",
                    confirmPassword: "",
                    errorMessage: {
                        password: "",
                        confirmPassword: "",
                    },
                });
                if (result.status === 200) {
                    setMessage(result.data.msg);
                } else if (result.status === 202) {
                    setMessage(result.data.msg);
                } else if (result.status === 201) {
                    setMessage(result.data.msg);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className='mt-3 d-flex justify-content-center '>
            <Card className='p-3 w-25'>
                {/* <Image src={image} rounded style={{ display: 'block', margin: '0 auto', width: 80, height: 80, borderRadius: '50%', padding: '10px' }} /> */}
                {message && (
                    <Alert className='text-center' variant="info">
                        {message}
                    </Alert>
                )}
                <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto' onSubmit={handleSubmit}>
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Password</label>
                        <input 
                            type='password' 
                            placeholder='New Password'
                            value={resetPasswordFormState.password} 
                            onChange={handleInputChange} 
                            isInvalid={!!resetPasswordFormState.errorMessage.password}
                            className='border-2 border-gray-500 px-4 py-2 w-full' />
                        {resetPasswordFormState.errorMessage.password &&
                            <Form.Control.Feedback type='invalid'>
                                {resetPasswordFormState.errorMessage.password}
                            </Form.Control.Feedback>
                        }
                    </div>
                    {/* <Form.Group className='mb-3' controlId='formGroupPassword'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control required type='password' placeholder='New Password' name='password'
                            value={resetPasswordFormState.password} onChange={handleInputChange}
                            isInvalid={!!resetPasswordFormState.errorMessage.password} />
                        {resetPasswordFormState.errorMessage.password &&
                            <Form.Control.Feedback type='invalid'>
                                {resetPasswordFormState.errorMessage.password}
                            </Form.Control.Feedback>
                        }
                    </Form.Group> */}
                    <div className='my-4'>
                        <label className='text-xl mr-4 text-gray-500'>Confirm Password</label>
                        <input 
                            required 
                            type='password' 
                            placeholder='Confirm Password' 
                            value={resetPasswordFormState.confirmPassword}
                            name='confirmPassword' 
                            onChange={handleInputChange} 
                            isInvalid={!!resetPasswordFormState.errorMessage.confirmPassword} />
                        {!!resetPasswordFormState.errorMessage.confirmPassword &&
                            <Form.Control.Feedback type='invalid'>
                                {!!resetPasswordFormState.errorMessage.confirmPassword}
                            </Form.Control.Feedback>
                        }
                    </div>
                    {/* <Form.Group className='mb-3' controlId='formGroupConfirmPassword'>
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control required type='password' placeholder='Confirm Password' name='confirmPassword'
                            value={resetPasswordFormState.confirmPassword} onChange={handleInputChange}
                            isInvalid={!!resetPasswordFormState.errorMessage.confirmPassword} />
                        {resetPasswordFormState.errorMessage.confirmPassword &&
                            <Form.Control.Feedback type='invalid'>
                                {resetPasswordFormState.errorMessage.confirmPassword}
                            </Form.Control.Feedback>
                        }
                    </Form.Group> */}
                    <button className='w-100' variant='outline-dark' type='submit'>Submit</button>
                    <div className='mt-2  d-flex justify-content-center'>
                        <a className='fw-bold text-dark text-decoration-none' href='/user/signIn'>Sign in here</a>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default ResetPassword;