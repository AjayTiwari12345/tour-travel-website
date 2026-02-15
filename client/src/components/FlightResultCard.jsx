import { Plane, ArrowRight } from 'lucide-react';
import { useState } from 'react';

const FlightResultCard = ({ flight, travelers = 1 }) => {
    const [imageError, setImageError] = useState(false);

    return (
        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition flex flex-col md:flex-row items-center justify-between gap-6 border border-gray-100">
            {/* Airline Info */}
            <div className="flex items-center gap-4 w-full md:w-1/4">
                {imageError ? (
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-xs text-center p-1">
                        {flight.airline}
                    </div>
                ) : (
                    <img
                        src={flight.logo}
                        alt={flight.airline}
                        className="w-12 h-12 object-contain"
                        onError={() => setImageError(true)}
                    />
                )}

                <div>
                    <h3 className="font-bold text-gray-900">{flight.airline}</h3>
                    <p className="text-xs text-gray-500">Flight-{flight.id}</p>
                </div>
            </div>

            {/* Flight Details */}
            <div className="flex items-center justify-center gap-6 w-full md:w-2/4">
                <div className="text-center">
                    <p className="text-xl font-bold text-gray-900">{flight.departure}</p>
                    <p className="text-sm font-semibold text-gray-500">{flight.from}</p>
                </div>

                <div className="flex flex-col items-center">
                    <p className="text-xs text-gray-400">{flight.duration}</p>
                    <div className="flex items-center text-gray-300">
                        <div className="w-12 h-[1px] bg-gray-300"></div>
                        <Plane size={16} className="mx-2 text-blue-500" />
                        <div className="w-12 h-[1px] bg-gray-300"></div>
                    </div>
                    <p className="text-xs text-green-600 font-medium">Non-stop</p>
                </div>

                <div className="text-center">
                    <p className="text-xl font-bold text-gray-900">{flight.arrival}</p>
                    <p className="text-sm font-semibold text-gray-500">{flight.to}</p>
                </div>
            </div>

            {/* Price & Action */}
            <div className="flex flex-col items-center md:items-end gap-2 w-full md:w-1/4">
                <div className="text-right">
                    <p className="text-2xl font-bold text-blue-600">₹{(flight.price * travelers).toLocaleString()}</p>
                    <p className="text-xs text-gray-400">Total for {travelers} traveler{travelers > 1 ? 's' : ''}</p>
                </div>
                <button
                    onClick={() => window.open(flight.link, '_blank')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold transition flex items-center gap-2"
                >
                    Book Now <ArrowRight size={16} />
                </button>
            </div>
        </div>
    );
};

export default FlightResultCard;
