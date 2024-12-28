import { LoginButton, useOCAuth } from '@opencampus/ocid-connect-js';
import { Link } from 'react-router-dom';

export default function Header() {
    const { authState, OCId } = useOCAuth();

    return (
        <header className="bg-dark text-white py-4 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <div className="text-2xl font-bold text-primary-light">EduX</div>
                </Link>
                <nav className="hidden md:flex space-x-10">
                    <Link to="/" className="hover:text-primary-light px-3 py-2 rounded-md transition-colors duration-200">Home</Link>
                    <Link to="/learn" className="hover:text-primary-light px-3 py-2 rounded-md transition-colors duration-200">Learn</Link>
                    <Link to="/jobs" className="hover:text-primary-light px-3 py-2 rounded-md transition-colors duration-200">Jobs</Link>
                    <Link to="/enterprise" className="hover:text-primary-light px-3 py-2 rounded-md transition-colors duration-200">Enterprise</Link>
                    <Link to={'https://edux.gitbook.io/edux-docs'} className="hover:text-primary-light px-3 py-2 rounded-md transition-colors duration-200">Docs</Link>
                </nav>
                <div className="relative z-50">
                    {!authState || !authState.isAuthenticated ? (
                        <LoginButton />
                    ) : (
                        <div className="text-sm text-primary-light">
                            <Link to="/profile" className="hover:text-primary-light px-3 py-2 rounded-md transition-colors duration-200">{OCId}</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
