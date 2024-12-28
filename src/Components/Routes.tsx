import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginCallBack } from '@opencampus/ocid-connect-js';
import Home from '../pages/Home';
import Learn from '../pages/Learn';
import Jobs from '../pages/Jobs';
import Enterprise from '../pages/Enterprise';
import Header from './Header';
import Profile from '../pages/Profile';
import Quest from './Quest';
import Read from '../pages/Read';
import CProfile from '../pages/CProfile';
import Test from '../pages/Test';

const AppRoutes: React.FC = () => {
    const onLoginSuccess = () => {
        window.location.href = '/CProfile'; // Navigate programmatically using window.location
    };

    const onLoginError = () => {
        console.error('Error during login callback');
    };

    return (
        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/redirect" element={
                    <LoginCallBack
                        errorCallback={onLoginError}
                        successCallback={onLoginSuccess}
                    />
                } />
                <Route path="/learn" element={<Learn />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/enterprise" element={<Enterprise />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/quest" element={<Quest />} />
                <Route path="/read" element={<Read />} />
                <Route path="/CProfile" element={<CProfile />} />
                <Route path="/test" element={<Test />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
