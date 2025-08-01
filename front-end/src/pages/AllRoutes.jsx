// In your router file (e.g., AllRoutes.jsx)
import { Routes, Route } from 'react-router-dom';
import React from 'react';
import ChatInterface from './ChatInterface';
import Login from './Login';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Journal from './journalpages/Journal';
import ProtectedRoute from './ProtectedRoute';
import Blogs from './Blogs';
import ProfilePage from './ProfilePage';
import SignupSuccess from './SignupSuccess';
import TherapyChatPage from './Therapy'; // Make sure this path matches your file location

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path='/signup' element={<SignupForm />} />
            <Route path="/" element={<Login />} />
            <Route path="/signupsuccess" element={<SignupSuccess />} />
            <Route path='/blogs' element={<Blogs />} />
            <Route path='/therapy' element={<TherapyChatPage/>}/>
                      <Route path='/journal' element={<Journal/>}/>
                                  <Route path='/profile' element={<ProfilePage/>}/>


            <Route 
                path="/chat" 
                element={
                    <ProtectedRoute>
                        <ChatInterface />
                    </ProtectedRoute>
                } 
            />
          
        </Routes>
    );
}

export default AllRoutes;
