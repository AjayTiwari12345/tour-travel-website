import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import FlightResultCard from '../components/FlightResultCard';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const [flights, setFlights] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const from = searchParams.get('from') || '';
    const to = searchParams.get('to') || '';
    const date = searchParams.get('date') || '';
    const guests = parseInt(searchParams.get('guests')) || 1;

    useEffect(() => {
        setIsLoading(true);
        // Fetch flights based on URL params
        fetch(`/api/search-flights?from=${from}&to=${to}&date=${date}`)
            .then(res => res.json())
            .then(data => {
                setFlights(data);
                setIsLoading(false);
            })
            .catch(err => {
                console.error("Error fetching flights:", err);
                setFlights([]);
                setIsLoading(false);
            });
    }, [from, to, date]);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Flight Results</h1>
                <p className="text-gray-500">
                    {from ? `${from} to ${to}` : `Flights to ${to}`} • {date || 'Any Date'} • {guests} Traveler(s)
                </p>
            </div>

            {isLoading ? (
                <div className="text-center py-20">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-xl text-gray-500">Finding the best deals for you...</p>
                </div>
            ) : flights.length > 0 ? (
                <div className="flex flex-col gap-6">
                    {flights.map(flight => (
                        <FlightResultCard key={flight.id} flight={flight} travelers={guests} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                    <p className="text-xl text-gray-600 font-semibold">No flights found.</p>
                    <p className="text-gray-400 mt-2">Try changing your dates or airports.</p>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
