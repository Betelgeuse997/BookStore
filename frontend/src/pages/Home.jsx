import React, {useEffect, useState } from "react";
import Spinner from '../components/Spinner.jsx';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from "../components/BooksTable.jsx";
import BooksCard from "../components/BooksCard.jsx";
import { getBooks } from "../services/api.js";
import { useAuth } from "../components/context/AuthContext.jsx";

const Home = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showType, setShowType] = useState('table');
    const { logout, token } =  useAuth();
    useEffect(() => {
        setLoading(true);
        const getBookDetails = async () => {
            try 
            {
                const result = await getBooks(token);
                setBooks(result.data.data);
                setLoading(false);
            }
            catch (error)
            {
                setLoading(false);
                alert('Please check the console');
                console.log(error);
            }
        }
        getBookDetails();
    }, []);

    const handleLogout = () => {
        logout();
       
      };

    return (
        <div className = 'p-4'>
            <div align="right" >
                <button className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'onClick={handleLogout}>Logout</button>
            </div>
            <div className='flex justify-center items-center gap-x-4'>
                <button
                    className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                    onClick={() => setShowType('table')}>
                        Table
                </button>
                <button
                    className='bg-sky-300 hover:bg-sky-600 px-4 py-1 rounded-lg'
                    onClick={() => setShowType('card')}>
                        Card
                </button>
            </div>
            <div className="flex justify-between items-center">
                <h1 className = 'text-3xl my-8'>Books List</h1>
                <Link to='/books/create'>
                   <MdOutlineAddBox className='text-sky-800 text-4xl' /> 
                </Link>
            </div>
            {loading ? <Spinner /> : showType === 'table' ? (<BooksTable books={books} />) : (<BooksCard books={books} />) }
        </div>
    )
}

export default Home;