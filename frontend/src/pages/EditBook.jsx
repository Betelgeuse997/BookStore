import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { editBook } from "../services/api";
import { fetchBook } from "../services/api";
import { useAuth } from "../components/context/AuthContext";

const EditBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishYear, setPublishYear] = useState('');
    const [loading, setLoading] = useState(false);
    const { token } = useAuth();
    const navigate = useNavigate();
    const {id} = useParams();
    useEffect(() => {
        setLoading(true);
        const fetchBookDetails = async () => {
            try 
            {
                const result = await fetchBook(id, token);
                setAuthor(result.data.author);
                setPublishYear(result.data.publishYear)
                setTitle(result.data.title)
                setLoading(false);    
            }
            catch (error)
            {
                setLoading(false);
                alert('Please check the console');
                console.log(error);
            }

        } 
        fetchBookDetails();
    }, [])
    const handleEditBook = async () => {
        const data = {
            title,
            author,
            publishYear,
        };
        setLoading(true);
        try
        {
            await editBook(id, data, token);
            setLoading(false);
            navigate('/');
        }
        catch (error)
        {   
            setLoading(false);
            alert('An error happened. Please check console');
            console.log(error);
        }
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Edit Book</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Title</label>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Author</label>
                    <input
                        type='text'
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
                    <input
                        type='number'
                        value={publishYear}
                        onChange={(e) => setPublishYear(e.target.value)}
                        className='border-2 border-gray-500 px-4 py-2 w-full'
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default EditBook