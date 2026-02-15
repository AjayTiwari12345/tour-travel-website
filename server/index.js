const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock Database Data
const destinations = [
    {
        id: 1,
        title: "Pyramids of Giza",
        location: "Egypt",
        image: "https://images.unsplash.com/photo-1599551322055-6b550543e479?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "45,000",
        rating: 4.8,
        code: "CAI"
    },
    {
        id: 2,
        title: "Taj Mahal, Agra",
        location: "India",
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "5,000",
        rating: 4.8,
        code: "AGR"
    },
    {
        id: 3,
        title: "Colosseum, Rome",
        location: "Italy",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "55,000",
        rating: 4.8,
        code: "FCO"
    },
    {
        id: 4,
        title: "Phi Phi Islands",
        location: "Thailand",
        image: "https://images.unsplash.com/photo-1537956965359-7573183d1f57?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "25,999",
        rating: 4.7,
        code: "HKT"
    },
    {
        id: 5,
        title: "Burj Khalifa, Dubai",
        location: "UAE",
        image: "https://images.unsplash.com/photo-1582929047218-36484e036e08?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "18,000",
        rating: 4.8,
        code: "DXB"
    },
    {
        id: 6,
        title: "Statue of Liberty, NYC",
        location: "USA",
        image: "https://images.unsplash.com/photo-1605130284535-11dd9eedc58a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "95,000",
        rating: 4.9,
        code: "JFK"
    },
    {
        id: 7,
        title: "Mount Fuji",
        location: "Japan",
        image: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "70,000",
        rating: 4.8,
        code: "NRT"
    },
    {
        id: 8,
        title: "Swiss Alps, Zurich",
        location: "Switzerland",
        image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "1,20,000",
        rating: 4.9,
        code: "ZRH"
    }
];

// Flight Data Constants
const AIRPORTS = {
    // Asia
    "India": ["New Delhi (DEL)", "Mumbai (BOM)", "Bengaluru (BLR)", "Chennai (MAA)", "Kolkata (CCU)", "Hyderabad (HYD)", "Pune (PNQ)", "Goa (GOI)", "Jaipur (JAI)"],
    "Thailand": ["Bangkok (BKK)", "Phuket (HKT)", "Chiang Mai (CNX)", "Krabi (KBV)"],
    "Vietnam": ["Hanoi (HAN)", "Ho Chi Minh City (SGN)", "Da Nang (DAD)", "Nha Trang (CXR)"],
    "Singapore": ["Singapore (SIN)"],
    "Malaysia": ["Kuala Lumpur (KUL)", "Penang (PEN)", "Langkawi (LGK)"],
    "Indonesia": ["Jakarta (CGK)", "Bali (DPS)", "Surabaya (SUB)"],
    "Bali": ["Denpasar (DPS)"],
    "Japan": ["Tokyo (HND)", "Tokyo (NRT)", "Osaka (KIX)", "Kyoto (ITM)"],
    "South Korea": ["Seoul (ICN)", "Busan (PUS)"],
    "China": ["Beijing (PEK)", "Shanghai (PVG)", "Guangzhou (CAN)", "Shenzhen (SZX)"],
    "Hong Kong": ["Hong Kong (HKG)"],
    "Sri Lanka": ["Colombo (CMB)"],
    "Nepal": ["Kathmandu (KTM)"],
    "Maldives": ["Male (MLE)"],

    // Middle East
    "Dubai": ["Dubai (DXB)"],
    "UAE": ["Dubai (DXB)", "Abu Dhabi (AUH)", "Sharjah (SHJ)"],
    "Saudi Arabia": ["Riyadh (RUH)", "Jeddah (JED)"],
    "Qatar": ["Doha (DOH)"],
    "Turkey": ["Istanbul (IST)", "Antalya (AYT)"],
    "Israel": ["Tel Aviv (TLV)"],

    // Europe
    "United Kingdom": ["London (LHR)", "London (LGW)", "Manchester (MAN)", "Edinburgh (EDI)"],
    "UK": ["London (LHR)", "London (LGW)", "Manchester (MAN)"],
    "France": ["Paris (CDG)", "Paris (ORY)", "Nice (NCE)", "Lyon (LYS)"],
    "Germany": ["Frankfurt (FRA)", "Munich (MUC)", "Berlin (BER)", "Hamburg (HAM)"],
    "Italy": ["Rome (FCO)", "Milan (MXP)", "Venice (VCE)", "Florence (FLR)"],
    "Spain": ["Madrid (MAD)", "Barcelona (BCN)", "Ibiza (IBZ)"],
    "Switzerland": ["Zurich (ZRH)", "Geneva (GVA)"],
    "Netherlands": ["Amsterdam (AMS)"],
    "Russia": ["Moscow (SVO)", "St. Petersburg (LED)"],

    // North America
    "USA": ["New York (JFK)", "Los Angeles (LAX)", "San Francisco (SFO)", "Chicago (ORD)", "Miami (MIA)", "Las Vegas (LAS)", "Washington (IAD)"],
    "United States": ["New York (JFK)", "Las Vegas (LAS)", "Los Angeles (LAX)"],
    "Canada": ["Toronto (YYZ)", "Vancouver (YVR)", "Montreal (YUL)", "Calgary (YYC)"],
    "Mexico": ["Mexico City (MEX)", "Cancun (CUN)"],

    // Australia & Oceania
    "Australia": ["Sydney (SYD)", "Melbourne (MEL)", "Brisbane (BNE)", "Perth (PER)"],
    "New Zealand": ["Auckland (AKL)", "Wellington (WLG)"],

    // South America
    "Brazil": ["Sao Paulo (GRU)", "Rio de Janeiro (GIG)"],
    "Argentina": ["Buenos Aires (EZE)"],

    // Africa
    "South Africa": ["Johannesburg (JNB)", "Cape Town (CPT)"],
    "Egypt": ["Cairo (CAI)", "Sharm El Sheikh (SSH)"],
    "Kenya": ["Nairobi (NBO)"],
    "Morocco": ["Casablanca (CMN)", "Marrakech (RAK)"]
};

// Mock Flight Data Generator
const generateFlights = (from, to, date) => {
    let targetDestinations = [to];

    // Check if 'to' matches a country in our specific list, otherwise treat as city
    // Simple case-insensitive check
    const countryKey = Object.keys(AIRPORTS).find(k => k.toLowerCase() === to.toLowerCase());
    if (countryKey) {
        targetDestinations = AIRPORTS[countryKey];
    }

    const airlines = [
        { name: "IndiGo", logo: "https://logo.clearbit.com/goindigo.in", basePrice: 5000 },
        { name: "Air India", logo: "https://logo.clearbit.com/airindia.com", basePrice: 6000 },
        { name: "Vistara", logo: "https://logo.clearbit.com/airvistara.com", basePrice: 7000 },
        { name: "SpiceJet", logo: "https://logo.clearbit.com/spicejet.com", basePrice: 4500 },
        { name: "Emirates", logo: "https://logo.clearbit.com/emirates.com", basePrice: 25000 },
        { name: "Thai Airways", logo: "https://logo.clearbit.com/thaiairways.com", basePrice: 15000 },
        { name: "Singapore Airlines", logo: "https://logo.clearbit.com/singaporeair.com", basePrice: 28000 },
        { name: "Qatar Airways", logo: "https://logo.clearbit.com/qatarairways.com", basePrice: 26000 }
    ];

    let results = [];
    let idCounter = 1;

    // Generate flights for EACH target destination (e.g. if User searched India, generate for DEL, BOM, etc.)
    targetDestinations.forEach(dest => {
        // Pick 3-5 random airlines for this route
        const numFlights = Math.floor(Math.random() * 3) + 3;

        for (let i = 0; i < numFlights; i++) {
            const airline = airlines[Math.floor(Math.random() * airlines.length)];

            // Generate Random Time
            const startHour = Math.floor(Math.random() * 24);
            const startMin = Math.floor(Math.random() * 60);
            // Realistic Duration Logic
            let durationHour = 2; // Default
            if (["USA", "United States", "New York (JFK)", "Los Angeles (LAX)", "San Francisco (SFO)", "Chicago (ORD)"].some(k => dest.includes(k))) durationHour = 15 + Math.floor(Math.random() * 5);
            else if (["London", "UK", "United Kingdom", "Paris", "France", "Germany", "Europe", "Amsterdam"].some(k => dest.includes(k))) durationHour = 8 + Math.floor(Math.random() * 3);
            else if (["Australia", "Sydney", "Melbourne"].some(k => dest.includes(k))) durationHour = 12 + Math.floor(Math.random() * 4);
            else if (["Dubai", "UAE", "Qatar", "Saudi Arabia"].some(k => dest.includes(k))) durationHour = 3 + Math.floor(Math.random() * 2);
            else if (["Thailand", "Vietnam", "Singapore", "Malaysia", "Bali", "Indonesia"].some(k => dest.includes(k))) durationHour = 4 + Math.floor(Math.random() * 3);
            else if (["India"].some(k => dest.includes(k))) durationHour = 1 + Math.floor(Math.random() * 2); // Domestic

            const depTime = `${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')}`;
            const duration = `${durationHour}h ${Math.floor(Math.random() * 60)}m`;

            // Random Price Variance
            const finalPrice = airline.basePrice + Math.floor(Math.random() * 5000);

            // Dynamic Booking Link Generation
            let bookingLink = "";
            const flightDate = date || new Date().toISOString().split('T')[0];
            const origin = from ? from.split('(')[1].replace(')', '') : 'DEL';
            const destination = dest.split('(')[1].replace(')', '');

            switch (airline.name) {
                case "IndiGo":
                    bookingLink = `https://www.goindigo.in/booking/flight-select.html?from=${origin}&to=${destination}&date=${flightDate}`;
                    break;
                case "Air India":
                    bookingLink = `https://www.airindia.com/`;
                    break;
                case "Vistara":
                    bookingLink = `https://www.airvistara.com/in/en`;
                    break;
                case "SpiceJet":
                    bookingLink = `https://www.spicejet.com/`;
                    break;
                case "Emirates":
                    bookingLink = `https://www.emirates.com/in/english/book/`;
                    break;
                case "Thai Airways":
                    bookingLink = `https://www.thaiairways.com/`;
                    break;
                case "Singapore Airlines":
                    bookingLink = `https://www.singaporeair.com/`;
                    break;
                case "Qatar Airways":
                    bookingLink = `https://www.qatarairways.com/`;
                    break;
                default:
                    bookingLink = `https://www.makemytrip.com/flight/search?itinerary=${origin}-${destination}-${flightDate}&tripType=O&paxType=A-1_C-0_I-0&intl=false&cabinClass=E`;
            }

            results.push({
                id: idCounter++,
                airline: airline.name,
                logo: airline.logo,
                from: from || "New Delhi (DEL)",
                to: dest, // Specific airport
                date: flightDate,
                departure: depTime,
                arrival: `+${durationHour}h`, // Simplified arrival display
                duration: duration,
                price: finalPrice,
                link: bookingLink
            });
        }
    });

    return results;
};

// API to get destinations (Static for Home Page)
app.get('/api/destinations', (req, res) => {
    res.json(destinations);
});

// API to get all supported airports
app.get('/api/airports', (req, res) => {
    res.json(AIRPORTS);
});

// API to search flights
app.get('/api/search-flights', (req, res) => {
    const { from, to, date } = req.query;
    // Default to 'India' if nothing provided for demo purposes, or handle empty handleSearch
    const searchQuery = to || "India";
    const flights = generateFlights(from, searchQuery, date);
    res.json(flights);
});

// Serve Static Frontend (Production)
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log("Press Ctrl+C to stop the server");
});

server.on('error', (err) => {
    console.error("Server Error:", err);
});
