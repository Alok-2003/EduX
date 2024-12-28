import { Link } from 'react-router-dom';
import { useState } from 'react';
import Mark from '../assets/Mark.svg';

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

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
                </nav>
                <div className="relative z-50">
                    <button
                        onClick={toggleDropdown}
                        className="bg-white flex gap-2 text-black px-3 py-2 rounded-full"
                    >
                        <img src={Mark} className="logo" alt="Edu logo" />
                        Connect Walllet
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg">
                            <Link
                                to="/connect"
                                className=" px-4 py-2 flex gap-2 text-center text-black hover:bg-gray-100 rounded-md"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                        <img src={Mark} className="logo" alt="Edu logo" />

                                Connect OCID
                            </Link>
                            <Link
                                to="/login"
                                className="block px-4 text-center py-2 text-black hover:bg-gray-100 rounded-md"
                                onClick={() => setIsDropdownOpen(false)}
                            >
                                Login
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
