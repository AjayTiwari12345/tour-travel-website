import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer id="contact" className="bg-gray-900 text-white pt-12 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <h2 className="text-2xl font-bold text-blue-400 mb-4">TRIPNESTCO LTD</h2>
                        <p className="text-gray-400 text-sm">
                            Making your travel dreams come true with the best deals and seamless booking experiences.
                        </p>
                    </div>

                    {/* Our Services */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Our Services</h3>
                        <ul className="space-y-2 text-gray-400 text-sm">
                            <li><a href="#" className="hover:text-white transition">Flight Bookings</a></li>
                            <li><a href="#" className="hover:text-white transition">Hotel Reservations</a></li>
                            <li><a href="#" className="hover:text-white transition">Holiday Packages</a></li>
                            <li><a href="#" className="hover:text-white transition">Visa Assistance</a></li>
                        </ul>
                        <p className="mt-4 text-sm text-gray-400">
                            To avail these services, please contact us via email or phone.
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3 text-gray-400 text-sm">
                            <li className="flex items-start gap-2">
                                <MapPin size={16} className="text-blue-400 mt-1 shrink-0" />
                                <span>110/20/14 Street No. 30, An Nhon Ward, Ho Chi Minh City, Vietnam</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Phone size={16} className="text-blue-400" />
                                <span>+84 356 511 864</span>
                            </li>
                            <li className="flex items-center gap-2">
                                <Mail size={16} className="text-blue-400" />
                                <span>TripNestcoltd@gmail.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
                        <p className="text-gray-400 text-sm mb-4">Subscribe for travel updates and exclusive offers.</p>
                        <div className="flex bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
                            <input
                                type="email"
                                placeholder="Your email"
                                className="bg-transparent px-4 py-2 text-sm text-white focus:outline-none w-full"
                            />
                            <button className="bg-blue-600 px-4 text-white hover:bg-blue-700 transition">
                                Go
                            </button>
                        </div>
                        <div className="flex gap-4 mt-6">
                            <a href="#" className="text-gray-400 hover:text-white transition"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition"><Instagram size={20} /></a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500 text-sm">
                    &copy; {new Date().getFullYear()} Travellio. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
