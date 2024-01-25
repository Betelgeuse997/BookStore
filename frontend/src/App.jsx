import React from "react"
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom'
import SignIn from "./components/auth/SignIn.jsx";
import SignUp from "./components/auth/SignUp.jsx";
import ForgotPassword from "./components/auth/ForgotPassword.jsx";
import ResetPassword from "./components/auth/ResetPassword.jsx";
import DisableGoBackButton from "./components/auth/DisableGoBackButton.jsx";
import PrivateRoutes from "./components/privateRoutes/privateRoutes.jsx";
import Home from './pages/Home.jsx';
import CreateBook from './pages/CreateBooks.jsx';
import DeleteBook from './pages/DeleteBook.jsx';
import EditBook from './pages/EditBook.jsx';
import ShowBook from './pages/ShowBook.jsx';
import { AuthProvider } from "./components/context/AuthContext.jsx";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <DisableGoBackButton/>
        <Routes>
          <Route path="/user/signIn" element={<SignIn />} />
          <Route path="/user/signUp" element={<SignUp />} />
          <Route path="/user/forgotPassword" element={<ForgotPassword />} />
          <Route path="/user/resetPassword/:token" element={<ResetPassword />} />
          <Route path='/' element = {<PrivateRoutes><Home /></PrivateRoutes>} />
          <Route path='/books/create' element = {<PrivateRoutes><CreateBook /></PrivateRoutes>} />
          <Route path='/books/delete/:id' element = {<PrivateRoutes><DeleteBook /></PrivateRoutes>} />
          <Route path='/books/details/:id' element = {<PrivateRoutes><ShowBook /></PrivateRoutes>} />
          <Route path='/books/edit/:id' element = {<PrivateRoutes><EditBook/></PrivateRoutes>} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
