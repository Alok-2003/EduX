import { LoginButton, useOCAuth } from '@opencampus/ocid-connect-js';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { authState, ocAuth, OCId, ethAddress } = useOCAuth();
    const navigate = useNavigate();

    const handleLogout = useCallback(async () => {
        if (ocAuth) {
            await ocAuth.logout('https://eduxx.vercel.app/');  // Logout URL
            setTimeout(() => {
                navigate('/');  // Redirect to home page after logout
            }, 500); // Adjust the delay time (500ms) if needed
        }
    }, [ocAuth, navigate]);
    

    return (
        <div className="flex flex-col items-center justify-center  bg-gray-50">
            <div className="bg-white shadow-md rounded-xl  w-full max-w-7xl mt-6">
                <h1 className="text-2xl font-bold text-center text-gray-800 my-4">
                    Profile
                </h1>
                <div className="text-center">
                    {!authState || !authState.isAuthenticated ? (
                        <div className="flex justify-center mb-4">
                            <LoginButton />
                        </div>
                    ) : (
                        <div>
                            <h4 className="text-lg font-semibold text-gray-700 mb-2">
                                User Info
                            </h4>
                            <div className="bg-gray-100 rounded-lg p-4 text-left text-sm text-gray-600 mx-6 space-y-2">
                                <p>
                                    <span className="font-medium text-gray-800">OCId:</span>{' '}
                                    <span className="break-words">{OCId}</span>
                                </p>
                                <p>
                                    <span className="font-medium text-gray-800">Ethereum Address:</span>{' '}
                                    <span className="break-words">{ethAddress}</span>
                                </p>
                                <p>
                                    <span className="font-medium text-gray-800">State Parameter:</span>{' '}
                                    <span className="break-words">{ocAuth?.getStateParameter()}</span>
                                </p>
                                <div>
                                    <span className="font-medium text-gray-800">Auth State:</span>
                                    <div className="overflow-x-auto bg-gray-50 p-2 rounded-md">
                                        <pre className="text-left whitespace-pre-wrap break-words">
                                            {JSON.stringify(authState, null, 2)}
                                        </pre>
                                    </div>
                                </div>

                            </div>
                            <button
                                onClick={handleLogout}
                                className="my-4 px-4 py-2 bg-red-500 text-white font-medium rounded-md hover:bg-red-600 transition duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
