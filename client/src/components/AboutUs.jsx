import { ShieldCheck, Users, Globe } from 'lucide-react';

const AboutUs = () => {
    return (
        <section className="py-20 bg-white" id="about">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Us?</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        We don't just book trips; we craft unforgettable experiences. With 24/7 support and guaranteed best prices, your journey is safe with us.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Trust Card 1 */}
                    <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-2xl hover:shadow-xl transition duration-300">
                        <div className="bg-blue-600 p-4 rounded-full text-white mb-6">
                            <ShieldCheck size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">100% Secure Booking</h3>
                        <p className="text-gray-600">
                            Your data and payments are protected with industry-standard encryption. Book with confidence.
                        </p>
                    </div>

                    {/* Trust Card 2 */}
                    <a href="#contact" className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-2xl hover:shadow-xl transition duration-300 cursor-pointer block">
                        <div className="bg-blue-600 p-4 rounded-full text-white mb-6">
                            <Users size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Support</h3>
                        <p className="text-gray-600">
                            Stuck somewhere? Our dedicated team is just a call away, anytime, anywhere in the world.
                        </p>
                    </a>

                    {/* Trust Card 3 */}
                    <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-2xl hover:shadow-xl transition duration-300">
                        <div className="bg-blue-600 p-4 rounded-full text-white mb-6">
                            <Globe size={40} />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Global Network</h3>
                        <p className="text-gray-600">
                            Access to over 500+ airlines and 1 million+ hotels worldwide at unbeatable rates.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
