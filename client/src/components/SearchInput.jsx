import { useState, useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

const SearchInput = ({ label, icon, value, onChange, placeholder, airportsData }) => {
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => {
        // Handle clicking outside to close dropdown
        const handleClickOutside = (event) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleInputChange = (e) => {
        const query = e.target.value;
        onChange(query);

        if (!query) {
            setSuggestions([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        let matches = [];

        // 1. Check if query matches a Country Name exactly or partially
        Object.keys(airportsData).forEach(country => {
            if (country.toLowerCase().includes(lowerQuery)) {
                // If matches country, add ALL its airports
                matches = [...matches, ...airportsData[country]];
            } else {
                // 2. Check individual airports
                const countryAirports = airportsData[country];
                const airportMatches = countryAirports.filter(airport =>
                    airport.toLowerCase().includes(lowerQuery)
                );
                matches = [...matches, ...airportMatches];
            }
        });

        // Remove duplicates and limit results
        const uniqueMatches = [...new Set(matches)].slice(0, 10);
        setSuggestions(uniqueMatches);
        setShowSuggestions(true);
    };

    const handleSelect = (airport) => {
        onChange(airport);
        setShowSuggestions(false);
    };

    return (
        <div className="flex items-center gap-3 border-b lg:border-b-0 lg:border-r border-gray-200 pb-2 lg:pb-0 lg:pr-4 w-full lg:w-1/4 relative" ref={wrapperRef}>
            {icon}
            <div className="flex flex-col text-left w-full relative">
                <label className="text-xs text-gray-500 font-bold uppercase tracking-wider">{label}</label>
                <input
                    type="text"
                    placeholder={placeholder}
                    className="outline-none font-semibold text-gray-900 placeholder-gray-400 w-full"
                    value={value}
                    onChange={handleInputChange}
                    onFocus={() => { if (value) setShowSuggestions(true); }}
                />

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-xl rounded-xl z-50 max-h-60 overflow-y-auto mt-2 border border-gray-100">
                        {suggestions.map((suggestion, index) => (
                            <div
                                key={index}
                                className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm font-medium text-gray-700 flex items-center gap-2"
                                onClick={() => handleSelect(suggestion)}
                            >
                                <MapPin size={14} className="text-gray-400" />
                                {suggestion}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchInput;
