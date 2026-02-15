import { Search, MapPin, Calendar, Users, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import SearchInput from './SearchInput';

const Hero = ({ onSearch }) => {
    const [fromLocation, setFromLocation] = useState('');
    const [toLocation, setToLocation] = useState('');
    const [date, setDate] = useState('');
    const [airportsData, setAirportsData] = useState({});

    useEffect(() => {
        // Fetch airports data for autocomplete
        fetch('/api/airports')
            .then(res => res.json())
            .then(data => setAirportsData(data))
            .catch(err => console.error("Error loading airports:", err));
    }, []);

    const [showGuestPopup, setShowGuestPopup] = useState(false);
    const [guests, setGuests] = useState({
        adults: 2,
        children: 0,
        seniors: 0,
        handicapped: 0
    });

    const updateGuest = (type, operation) => {
        setGuests(prev => {
            const newVal = operation === 'inc' ? prev[type] + 1 : prev[type] - 1;
            return { ...prev, [type]: Math.max(0, newVal) };
        });
    };

    const getTotalGuests = () => {
        return guests.adults + guests.children + guests.seniors + guests.handicapped;
    };

    return (
        <div className="relative h-[700px] flex items-center justify-center">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')" }}
            >
                <div className="absolute inset-0 bg-black opacity-40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4 w-full max-w-6xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                    Explore the World with Us
                </h1>
                <p className="text-lg md:text-xl mb-8 drop-shadow-md">
                    Find the best deals on flights, hotels, and holiday packages.
                </p>

                {/* Advanced Search Bar */}
                <div className="bg-white p-6 rounded-xl shadow-2xl flex flex-col lg:flex-row gap-4 items-center text-gray-800">

                    {/* From Input with Autocomplete */}
                    <SearchInput
                        label="From"
                        icon={<MapPin className="text-blue-600" />}
                        value={fromLocation}
                        onChange={setFromLocation}
                        placeholder="Origin City or Country"
                        airportsData={airportsData}
                    />

                    {/* To Input with Autocomplete */}
                    <SearchInput
                        label="To"
                        icon={<MapPin className="text-red-500" />}
                        value={toLocation}
                        onChange={setToLocation}
                        placeholder="Destination City or Country"
                        airportsData={airportsData}
                    />

                    {/* Date */}
                    <div className="flex items-center gap-3 border-b lg:border-b-0 lg:border-r border-gray-200 pb-2 lg:pb-0 lg:pr-4 w-full lg:w-1/5">
                        <Calendar className="text-blue-600" />
                        <div className="flex flex-col text-left w-full">
                            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Departure</label>
                            <input
                                type="date"
                                className="outline-none font-semibold text-gray-900 w-full"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Guests Dropdown */}
                    <div className="relative flex items-center gap-3 pb-2 lg:pb-0 w-full lg:w-1/4 cursor-pointer" onClick={() => setShowGuestPopup(!showGuestPopup)}>
                        <Users className="text-blue-600" />
                        <div className="flex flex-col text-left w-full relative">
                            <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">Travelers</label>
                            <div className="flex items-center justify-between font-semibold text-gray-900">
                                <span>{getTotalGuests()} Guests</span>
                                <ChevronDown size={16} className={`transition-transform ${showGuestPopup ? 'rotate-180' : ''}`} />
                            </div>
                        </div>

                        {/* Guest Selection Popup */}
                        {showGuestPopup && (
                            <div
                                className="absolute top-16 right-0 bg-white shadow-xl rounded-xl p-4 w-72 z-50 border border-gray-100"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {['Adults', 'Children', 'Seniors', 'Handicapped'].map((type) => (
                                    <div key={type} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0">
                                        <span className="font-medium text-gray-700">{type}</span>
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => updateGuest(type.toLowerCase(), 'dec')}
                                                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200"
                                            >-</button>
                                            <span className="w-4 text-center font-bold">{guests[type.toLowerCase()]}</span>
                                            <button
                                                onClick={() => updateGuest(type.toLowerCase(), 'inc')}
                                                className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 hover:bg-blue-200"
                                            >+</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => onSearch(toLocation, fromLocation, date, getTotalGuests())}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold transition flex items-center gap-2 shadow-lg w-full lg:w-auto justify-center"
                    >
                        <Search size={22} />
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Hero;
