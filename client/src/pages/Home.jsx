import { useState, useEffect, useRef } from 'react';
import { API_BASE_URL } from '../config';
import Hero from '../components/Hero';
import DestinationCard from '../components/DestinationCard';
import AboutUs from '../components/AboutUs';
import FlightResultCard from '../components/FlightResultCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Home = () => {
    const [destinations, setDestinations] = useState([]);
    const [flightResults, setFlightResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoadingFlights, setIsLoadingFlights] = useState(false);
    const [guestCount, setGuestCount] = useState(1);
    const [isPaused, setIsPaused] = useState(false); // New state to pause scroll

    const scrollRef = useRef(null);
    const resultsRef = useRef(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}/destinations`)
            .then(res => res.json())
            .then(data => setDestinations(data))
            .catch(err => console.error("Error fetching destinations:", err));
    }, []);

    useEffect(() => {
        // Auto-scroll logic (Slower: 5000ms)
        const interval = setInterval(() => {
            if (scrollRef.current && !isPaused) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
                // If reached end, reset to 0, else scroll right
                if (scrollLeft + clientWidth >= scrollWidth - 10) {
                    scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
                }
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [isPaused]);

    const handleSearch = (to, from, date, guests) => {
        setIsSearching(true);
        setIsLoadingFlights(true);
        setGuestCount(guests || 1);
        setFlightResults([]);

        // Scroll to results immediately
        if (resultsRef.current) {
            setTimeout(() => {
                resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }

        fetch(`${API_BASE_URL}/search-flights?from=${from}&to=${to}&date=${date}`)
            .then(res => res.json())
            .then(data => {
                setFlightResults(data);
                setIsLoadingFlights(false);
            })
            .catch(err => {
                console.error("Error fetching flights:", err);
                setIsLoadingFlights(false);
            });
    };

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 350; // Card width + gap
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="flex-grow">
            <Hero onSearch={handleSearch} />

            {/* Search Results Section */}
            {isSearching && (
                <div ref={resultsRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Flight Results</h2>
                        <p className="text-gray-500">Best deals found for you</p>
                    </div>

                    {isLoadingFlights ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                            <p className="text-xl text-gray-500">Searching for available flights...</p>
                        </div>
                    ) : flightResults.length > 0 ? (
                        <div className="flex flex-col gap-6">
                            {flightResults.map((flight) => (
                                <FlightResultCard key={flight.id} flight={flight} travelers={guestCount} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
                            <p className="text-xl text-gray-600 font-semibold">No flights found.</p>
                            <p className="text-gray-400 mt-2">Try changing your search criteria.</p>
                        </div>
                    )}
                </div>
            )}

            <AboutUs />

            {/* Popular Destinations - Horizontal Scroll */}
            <section id="destinations" className="py-16 bg-gray-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900">Popular Destinations</h2>
                        <p className="text-gray-500 mt-2">Handpicked destinations for your next adventure</p>
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => scroll('left')} className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100"><ChevronLeft size={24} /></button>
                        <button onClick={() => scroll('right')} className="p-2 rounded-full bg-white shadow-md hover:bg-gray-100"><ChevronRight size={24} /></button>
                    </div>
                </div>

                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    // Pause on hover
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    {destinations.map((dest) => (
                        <div key={dest.id} className="min-w-[350px] snap-center">
                            <DestinationCard
                                title={dest.title}
                                location={dest.location}
                                image={dest.image}
                                rating={dest.rating}
                                // Reverted to Inline Search: Show Flight Options first
                                onCheckFlight={() => handleSearch(dest.title, '', '', 1)}
                            />
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
