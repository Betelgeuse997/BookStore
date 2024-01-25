import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { fetchBook } from "../services/api";
import { useAuth } from "../components/context/AuthContext";

const ShowBook = () => {
    const [book, setBook] = useState({});
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const { token } = useAuth();

    useEffect(() => {
        setLoading(true);
        const fetchBookDetails = async () => {
            try 
            {
                const result = await fetchBook(id, token);
                setBook(result.data);
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
    return (
        <div className='p-4'>
            <BackButton />
                <h1 className="text-3xl my-4">Book</h1>
                {loading ? (
                    <Spinner/>
                ) : (
                    <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Id</span>
                            <span>{book._id}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Title</span>
                            <span>{book.title}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Author</span>
                            <span>{book.author}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
                            <span>{book.publishYear}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
                            <span>{new Date(book.createdAt).toString()}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
                            <span>{new Date(book.updatedAt).toString()}</span>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default ShowBook