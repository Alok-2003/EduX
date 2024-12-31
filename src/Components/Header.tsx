import { LoginButton, useOCAuth } from '@opencampus/ocid-connect-js';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../contexts/GlobalContext';
import { useState, useEffect } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { Menu, X } from 'lucide-react';

export default function Header() {
    const { authState, ethAddress, OCId } = useOCAuth();
    const { setEthAddress } = useGlobalContext();
    const [role, setRole] = useState<string | null>(null);
    const [menuOpen, setMenuOpen] = useState(false); // State to toggle mobile menu

    useEffect(() => {
        if (ethAddress) {
            setEthAddress(ethAddress); // Store ethAddress globally
        }
    }, [ethAddress, setEthAddress]);

    const { fetchAllUsers } = useFirebase();
    useEffect(() => {
        const fetchUserRole = async () => {
            try {
                if (ethAddress) {
                    const users = await fetchAllUsers();
                    if (!users || users.length === 0) {
                        return;
                    }
                    const matchedUser = users.find(
                        (user: any) => user.id?.toLowerCase() === ethAddress.toLowerCase()
                    );
                    if (matchedUser) {
                        setRole(matchedUser.role);
                    }
                }
            } catch (error) {
                console.error("Error fetching user role:", error);
            }
        };
        fetchUserRole();
    }, [ethAddress, fetchAllUsers]);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <header className="bg-dark text-white py-4 px-4 sm:px-6 lg:px-8">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <div className="text-2xl font-bold text-primary-light">EduX</div>
                </Link>

                {/* Mobile menu button */}
                <button
                    className="md:hidden text-primary-light"
                    onClick={toggleMenu}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-10">
                    <Link to="/" className="hover:text-primary-light px-3 py-2 rounded-md transition-colors duration-200">Home</Link>
                    <Link to="/learn" className="hover:text-primary-light px-3 py-2 rounded-md transition-colors duration-200">Learn</Link>
                    {role !== 'enterprise' && (
                        <Link to="/jobs" className="hover:text-primary-light px-3 py-2 rounded-md transition-colors duration-200">Jobs</Link>
                    )}
                    {role !== 'developer' && (
                        <Link to="/enterprise" className="hover:text-primary-light px-3 py-2 rounded-md transition-colors duration-200">Enterprise</Link>
                    )}
                    <Link to={'https://edux.gitbook.io/edux-docs'} className="hover:text-primary-light px-3 py-2 rounded-md transition-colors duration-200">Docs</Link>
                </nav>

                {/* Mobile Navigation */}
                {menuOpen && (
                    <nav className="absolute top-16 left-0 w-full bg-dark text-center py-4 md:hidden">
                        <Link to="/" className="block hover:text-primary-light px-3 py-2 rounded-md transition-colors duration-200" onClick={toggleMenu}>Home</Link>
                        <Link to="/learn" className="block hover:text-primary-light px-3 py-2 rounded-md transition-colors duration-200" onClick={toggleMenu}>Learn</Link>
                        {role !== 'enterprise' && (
                            <Link to="/jobs" className="block hover:text-primary-light px-3 py-2 rounded-md transition-colors duration-200" onClick={toggleMenu}>Jobs</Link>
                        )}
                        {role !== 'developer' && (
                            <Link to="/enterprise" className="block hover:text-primary-light px-3 py-2 rounded-md transition-colors duration-200" onClick={toggleMenu}>Enterprise</Link>
                        )}
                        <Link to={'https://edux.gitbook.io/edux-docs'} className="block hover:text-primary-light px-3 py-2 rounded-md transition-colors duration-200" onClick={toggleMenu}>Docs</Link>
                    </nav>
                )}

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
