import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import { LoginCallBack, useOCAuth } from '@opencampus/ocid-connect-js';
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
import { useFirebase } from '../contexts/FirebaseContext';

const RedirectHandler: React.FC = () => {
  const { fetchAllUsers } = useFirebase();
  const { ethAddress } = useOCAuth();
  const navigate = useNavigate();
  const [redirected, setRedirected] = useState(false);

  const checkUserAndRedirect = async () => {
    try {
      if (!ethAddress || redirected) {
        console.log('EthAddress not available or already redirected:', ethAddress, redirected);
        return;
      }

      console.log('Ethereum Address:', ethAddress);

      // Fetch all users
      const users = await fetchAllUsers();
      console.log('Fetched Users:', users);

      // Find a matching user where ethAddress matches user.id
      const matchingUser = users.find(
        (user: any) => user.id?.toLowerCase() === ethAddress.toLowerCase()
      );

      if (matchingUser) {
        console.log('Matching user found:', matchingUser);
        navigate('/'); // Redirect to Home
      } else {
        console.warn('No matching user found, redirecting to CProfile');
        navigate('/CProfile'); // Redirect to CProfile
      }

      setRedirected(true);
    } catch (error) {
      console.error('Error during user check and redirection:', error);
    }
  };

  useEffect(() => {
    if (ethAddress && !redirected) {
      checkUserAndRedirect();
    }
  }, [ethAddress, redirected]);

  return null;
};

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/redirect"
          element={
            <>
              <RedirectHandler />
              <LoginCallBack
                errorCallback={() => console.error('Error during login callback')}
                successCallback={() => console.log('Login successful')}
              />
            </>
          }
        />
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
