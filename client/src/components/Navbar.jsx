import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="text-2xl font-bold text-blue-600 cursor-pointer">TRIPNESTCO LTD</Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/" className="hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium text-gray-700">Home</Link>
                            <a href="/#destinations" className="hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium text-gray-700">Flights</a>
                            <a href="/#about" className="hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium text-gray-700">About</a>
                            <a href="/#contact" className="hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium text-gray-700">Contact</a>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white pb-4">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" onClick={() => setIsOpen(false)} className="hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium text-gray-700">Home</Link>
                        <a href="/#destinations" onClick={() => setIsOpen(false)} className="hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium text-gray-700">Flights</a>
                        <a href="/#about" onClick={() => setIsOpen(false)} className="hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium text-gray-700">About</a>
                        <a href="/#contact" onClick={() => setIsOpen(false)} className="hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium text-gray-700">Contact</a>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
