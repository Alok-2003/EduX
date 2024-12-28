import React from 'react';
import { OCConnect } from '@opencampus/ocid-connect-js';
import AppRoutes from './Components/Routes';

const App: React.FC = () => {
    const opts = {
        redirectUri: 'http://localhost:5173/redirect',
        referralCode: 'TEST123', // pass referral code to Authentication Service
    };

    return (
        <OCConnect opts={opts} sandboxMode={true}>
            <div className="App">
                <header className="App-header"></header>
                <main>
                    <AppRoutes />
                </main>
            </div>
        </OCConnect>
    );
};

export default App;