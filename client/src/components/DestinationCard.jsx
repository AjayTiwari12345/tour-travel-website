import { MapPin, Star } from 'lucide-react';

const DestinationCard = ({ image, title, location, price, rating }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
            <div className="relative h-48 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&q=80"; // Fallback generic travel image
                    }}
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 text-xs font-bold text-gray-800">
                    <Star size={12} className="text-yellow-500 fill-yellow-500" />
                    {rating}
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-start justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                        <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                            <MapPin size={14} />
                            {location}
                        </div>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex-1">
                        {/* Price Removed */}
                    </div>
                    <button
                        onClick={() => window.open(`https://www.makemytrip.com/search?q=${title}`, '_blank')}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition w-full"
                    >
                        Check Flights
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DestinationCard;
