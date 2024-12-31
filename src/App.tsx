import React from 'react';
import { OCConnect } from '@opencampus/ocid-connect-js';
import AppRoutes from './Components/Routes';
import { GlobalProvider } from './contexts/GlobalContext';

const App: React.FC = () => {
    const opts = {
        redirectUri: 'https://eduxx.vercel.app/redirect',
        referralCode: 'TEST123', // pass referral code to Authentication Service
    };

    return (
        <OCConnect opts={opts} sandboxMode={true}>
            <GlobalProvider>
                <div className="App">
                    <header className="App-header"></header>
                    <main>
                        <AppRoutes />
                    </main>
                </div>
            </GlobalProvider>
        </OCConnect>
    );
};

export default App;
