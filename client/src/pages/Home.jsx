// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import api from '../utils/axios';
// import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaRegClock, FaTicketAlt, FaShieldAlt } from 'react-icons/fa';

// const Home = () => {
//     const [events, setEvents] = useState([]);
//     const [search, setSearch] = useState('');
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const timeoutId = setTimeout(() => {
//             fetchEvents();
//         }, 400); // 400ms debounce
//         return () => clearTimeout(timeoutId);
//     }, [search]);

//     const fetchEvents = async () => {
//         try {
//             const { data } = await api.get(`/events?search=${search}`);
//             setEvents(data);
//         } catch (error) {
//             console.error('Error fetching events:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="min-h-screen bg-linear-to-b from-zinc-50 via-white to-zinc-100">
//             {/* Hero Section */}
//             <div className="relative overflow-hidden rounded-4xl bg-zinc-950 text-white mb-16 shadow-[0_20px_80px_-20px_rgba(0,0,0,0.45)]">
//                 <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=3000&auto=format&fit=crop')] bg-cover bg-center"></div>
//                 <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent"></div>
//                 <div className="relative p-10 md:p-20 text-center flex flex-col items-center z-10">
//                     <span className="bg-white/20 text-white backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase mb-6 border border-white/20">Welcome to Eventora</span>
//                     <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[0.95]">
//                         Find Your Next <br /><span className="text-transparent bg-clip-text bg-linear-to-r from-gray-200 to-gray-500">Unforgettable</span> Experience
//                     </h1>
//                     <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light mt-10 leading-relaxed">
//                         Discover the best tech conferences, late-night music festivals, and hands-on workshops happening directly in your area. Secure your spot today.
//                     </p>

//                     <div className="relative w-full max-w-2xl">
//                         <FaSearch className="absolute left-6 text-gray-500 text-xl group-focus-within:text-black transition-colors" />
//                         <input
//                             type="text"
//                             placeholder="Search events by title..."
//                             className="w-full rounded-2xl border border-white/20 bg-white/95 backdrop-blur-xl px-16 py-5 text-zinc-900 text-lg shadow-xl outline-none transition-all focus:ring-4 focus:ring-zinc-300/30"
//                             value={search}
//                             onChange={(e) => setSearch(e.target.value)}
//                         />
//                     </div>
//                 </div>
//             </div>

//             {/* Why Choose Us / Features row */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 px-4">
//                 <div className="rounded-3xl border border-zinc-200/60 bg-white/80 backdrop-blur-sm p-8 shadow-lg shadow-zinc-200/40">
//                     <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-md shadow-gray-200/50 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300">
//                         <FaRegClock />
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-3">Fast Booking</h3>
//                     <p className="text-gray-500 text-sm leading-relaxed">Secure your tickets instantly with our fast streamlined booking infrastructure built for speed.</p>
//                 </div>
//                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
//                     <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-md shadow-gray-200/50">
//                         <FaTicketAlt />
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-3">Seamless Access</h3>
//                     <p className="text-gray-500 text-sm leading-relaxed">Download tickets instantly or manage them right from your personal dashboard with easily.</p>
//                 </div>
//                 <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1 transition duration-300">
//                     <div className="w-16 h-16 bg-gray-900 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-md shadow-gray-200/50">
//                         <FaShieldAlt />
//                     </div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Platform</h3>
//                     <p className="text-gray-500 text-sm leading-relaxed">All transactions and registrations are bounded by cutting-edge security and 2FA OTP tech.</p>
//                 </div>
//             </div>

//             <div className="flex items-center justify-between mb-8 px-2 border-b border-gray-200 pb-4">
//                 <h2 className="text-4xl font-bold tracking-tight text-zinc-900">Upcoming Events</h2>
//                 <div className="text-gray-500 font-medium">{events.length} results found</div>
//             </div>

//             {loading ? (
//                 <div className="text-center py-20 text-xl font-semibold text-gray-600">Loading events...</div>
//             ) : events.length === 0 ? (
//                 <div className="text-center py-20 text-xl text-gray-500">No events found matching your search.</div>
//             ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//                     {events.map(event => (
//                         <div key={event._id} className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
//                             <div className="h-48 bg-gray-200 overflow-hidden relative">
//                                 {event.image ? (
//                                     <img src={event.image} alt={event.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
//                                 ) : (
//                                     <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-600 font-bold text-2xl">
//                                         {event.category || 'Event'}
//                                     </div>
//                                 )}
//                                 <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-xl border border-white/30 shadow-lg px-3 py-1 rounded-full text-sm font-bold shadow-sm">
//                                     {event.ticketPrice === 0 ? <span className="text-green-600">FREE</span> : <span className="text-gray-900">₹{event.ticketPrice}</span>}
//                                 </div>
//                             </div>
//                             <div className="p-6 grow flex flex-col">
//                                 <div className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">{event.category}</div>
//                                 <h2 className="text-xl font-bold text-gray-800 mb-3">{event.title}</h2>
//                                 <div className="flex flex-col gap-2 mb-4 text-gray-600 text-sm">
//                                     <div className="flex items-center gap-2">
//                                         <FaCalendarAlt className="text-gray-400" />
//                                         <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         <FaMapMarkerAlt className="text-gray-400" />
//                                         <span>{event.location}</span>
//                                     </div>
//                                 </div>
//                                 <div className="mt-auto">
//                                     <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
//                                         <div className="bg-gray-700 h-2 rounded-full" style={{ width: `${(event.availableSeats / event.totalSeats) * 100}%` }}></div>
//                                     </div>
//                                     <p className="text-xs text-gray-500 mb-4">{event.availableSeats} of {event.totalSeats} seats remaining</p>
//                                     <Link to={`/events/${event._id}`} className="block w-full rounded-xl bg-zinc-900 py-3 text-center font-medium text-white transition-all hover:bg-black hover:shadow-lg">
//                                         View Details
//                                     </Link>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* Footer Section */}
//             <footer className="mt-auto pt-16 pb-8 border-t border-gray-200 text-center">
//                 <div className="flex justify-center items-center gap-2 mb-4">
//                     <FaTicketAlt className="text-gray-800 text-2xl" />
//                     <span className="text-xl font-bold text-gray-900">Eventora</span>
//                 </div>
//                 <p className="text-gray-500 text-sm mb-6 max-w-md mx-auto">
//                     The simplest, most dynamic way to manage, discover, and host world-class events in your local city. Let's make memories together.
//                 </p>
//                 <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">
//                     &copy; {new Date().getFullYear()} Eventora Platform. All rights reserved.
//                 </div>
//             </footer>
//         </div>
//     );
// };

// export default Home;



import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/axios';
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaRegClock, FaTicketAlt, FaShieldAlt } from 'react-icons/fa';


const Home = () => {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchEvents();
        }, 400); // 400ms debounce
        return () => clearTimeout(timeoutId);
    }, [search]);

    const fetchEvents = async () => {
        try {
            const { data } = await api.get(`/events?search=${search}`);
            setEvents(data);
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F6F3EE]">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Manrope:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
                .font-display { font-family: 'Fraunces', serif; font-optical-sizing: auto; }
                .font-body { font-family: 'Manrope', sans-serif; }
                .font-mono { font-family: 'Space Mono', monospace; }

                /* Ticket punch-hole notches at the perforation seam of each event card */
                .ticket-notch-left::before,
                .ticket-notch-right::after {
                    content: '';
                    position: absolute;
                    width: 22px;
                    height: 22px;
                    background: #F6F3EE;
                    border-radius: 9999px;
                    top: var(--seam-y, 208px);
                    transform: translateY(-50%);
                    z-index: 10;
                }
                .ticket-notch-left::before { left: -11px; }
                .ticket-notch-right::after { right: -11px; }

                .stamp-rotate { transform: rotate(-8deg); }
            `}</style>

            <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">

                {/* Hero / Marquee */}
                <div className="relative overflow-hidden rounded-4xl bg-[#211224] text-white mb-14 shadow-[0_30px_90px_-30px_rgba(33,18,36,0.55)]">
                    <div className="absolute inset-0 opacity-30 bg-[url('https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=3000&auto=format&fit=crop')] bg-cover bg-center"></div>
                    <div className="absolute inset-0 bg-linear-to-t from-[#211224] via-[#211224]/85 to-[#211224]/20"></div>

                    {/* marquee corner ticket tab */}
                    <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10 font-mono text-[11px] tracking-[0.2em] text-[#F0A93E] border border-[#F0A93E]/40 rounded-full px-3 py-1 uppercase">
                        Admit One
                    </div>

                    <div className="relative px-8 py-16 md:py-24 text-center flex flex-col items-center z-10">
                        <span className="text-[#F0A93E] font-mono text-xs tracking-[0.3em] uppercase mb-6">
                            Now Showing &nbsp;·&nbsp; Eventora
                        </span>
                        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-[0.95]">
                            Find Your Next
                            <br />
                            <span className="italic text-[#F0A93E]">Unforgettable</span> Night
                        </h1>
                        <p className="font-body text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light mt-8 leading-relaxed">
                            Tech conferences, late-night festivals, and hands-on workshops happening
                            near you — reserve your seat before the house sells out.
                        </p>

                        <div className="relative w-full max-w-2xl">
                            <FaSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-[#211224]/40 text-lg" />
                            <input
                                type="text"
                                placeholder="Search events by title…"
                                className="font-body w-full rounded-full border-2 border-[#F0A93E]/30 bg-white px-16 py-5 text-[#241E22] text-lg shadow-xl outline-none transition-all focus:border-[#F0A93E] focus:ring-4 focus:ring-[#F0A93E]/20"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>
                </div>

                {/* Feature strip */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {[
                        { icon: <FaRegClock />, title: 'Fast Booking', copy: 'Secure your tickets instantly through a streamlined checkout built for speed.', accent: '#F0A93E' },
                        { icon: <FaTicketAlt />, title: 'Seamless Access', copy: 'Download tickets instantly or manage them anytime from your dashboard.', accent: '#2F8F76' },
                        { icon: <FaShieldAlt />, title: 'Secure Platform', copy: 'Every transaction is protected with modern encryption and 2FA.', accent: '#F0A93E' },
                    ].map((f, i) => (
                        <div key={i} className="bg-white rounded-2xl border border-[#241E22]/8 p-7 flex flex-col hover:-translate-y-1.5 hover:shadow-xl hover:shadow-[#211224]/5 transition-all duration-300">
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center text-xl mb-5 text-white"
                                style={{ backgroundColor: f.accent }}
                            >
                                {f.icon}
                            </div>
                            <h3 className="font-display text-xl font-semibold text-[#241E22] mb-2">{f.title}</h3>
                            <p className="font-body text-[#8D8790] text-sm leading-relaxed">{f.copy}</p>
                        </div>
                    ))}
                </div>

                {/* Section header */}
                <div className="flex items-end justify-between mb-8 pb-4 border-b-2 border-dashed border-[#241E22]/15">
                    <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-[#241E22]">
                        Upcoming Events
                    </h2>
                    <div className="font-mono text-sm text-[#8D8790]">{events.length} results</div>
                </div>

                {loading ? (
                    <div className="text-center py-24 font-body text-lg font-medium text-[#8D8790]">Loading events…</div>
                ) : events.length === 0 ? (
                    <div className="text-center py-24 font-body text-lg text-[#8D8790]">No events found matching your search.</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
                        {events.map(event => {
                            const seatPct = event.totalSeats
                                ? Math.round((event.availableSeats / event.totalSeats) * 100)
                                : 0;
                            return (
                                <div
                                    key={event._id}
                                    className="ticket-notch-left ticket-notch-right relative overflow-hidden rounded-2xl bg-white border border-[#241E22]/10 shadow-sm hover:shadow-2xl hover:shadow-[#211224]/10 hover:-translate-y-1.5 transition-all duration-300"
                                    style={{ '--seam-y': '208px' }}
                                >
                                    {/* Poster half */}
                                    <div className="h-48 bg-[#241E22]/5 overflow-hidden relative">
                                        {event.image ? (
                                            <img src={event.image} alt={event.title} className="h-full w-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-[#211224] text-[#F0A93E] font-display font-semibold text-2xl">
                                                {event.category || 'Event'}
                                            </div>
                                        )}

                                        {/* price stamp */}
                                        <div className="stamp-rotate absolute top-4 right-4 bg-white border-2 border-dashed border-[#211224]/25 rounded-full w-16 h-16 flex flex-col items-center justify-center shadow-md">
                                            {event.ticketPrice === 0 ? (
                                                <span className="font-mono text-[#2F8F76] text-[11px] font-bold leading-none">FREE</span>
                                            ) : (
                                                <>
                                                    <span className="font-mono text-[#211224] text-xs font-bold leading-none">₹{event.ticketPrice}</span>
                                                </>
                                            )}
                                        </div>
                                    </div>


                                    <div className="relative h-0 border-t-2 border-dashed border-[#241E22]/15"></div>


                                    <div className="p-6 flex flex-col">
                                        <div className="font-mono text-[10px] font-bold text-[#F0A93E] uppercase tracking-[0.2em] mb-2">
                                            {event.category}
                                        </div>
                                        <h2 className="font-display text-xl font-semibold text-[#241E22] mb-4 leading-snug">{event.title}</h2>

                                        <div className="flex flex-col gap-2 mb-5 text-[#241E22]/70 text-sm font-body">
                                            <div className="flex items-center gap-2">
                                                <FaCalendarAlt className="text-[#8D8790]" />
                                                <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <FaMapMarkerAlt className="text-[#8D8790]" />
                                                <span>{event.location}</span>
                                            </div>
                                        </div>

                                        <div className="mt-auto">
                                            <div className="w-full bg-[#241E22]/10 rounded-full h-1.5 mb-2">
                                                <div className="bg-[#2F8F76] h-1.5 rounded-full" style={{ width: `${seatPct}%` }}></div>
                                            </div>
                                            <p className="font-mono text-xs text-[#8D8790] mb-5">
                                                {event.availableSeats} / {event.totalSeats} seats left
                                            </p>
                                            <Link
                                                to={`/events/${event._id}`}
                                                className="font-body block w-full rounded-full bg-[#211224] py-3 text-center font-semibold text-white transition-all hover:bg-[#F0A93E] hover:text-[#211224]"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                <footer className="mt-24 pt-14 pb-10 border-t-2 border-dashed border-[#241E22]/15 text-center">
                    <div className="flex justify-center items-center gap-2 mb-4">
                        <FaTicketAlt className="text-[#F0A93E] text-2xl" />
                        <span className="font-display text-xl font-semibold text-[#241E22]">Eventora</span>
                    </div>
                    <p className="font-body text-[#8D8790] text-sm mb-6 max-w-md mx-auto">
                        The simplest, most dynamic way to manage, discover, and host world-class
                        events in your local city. Let's make memories together.
                    </p>
                    <div className="font-mono text-[11px] text-[#8D8790]/70 tracking-widest uppercase">
                        &copy; {new Date().getFullYear()} Eventora Platform. All rights reserved.
                    </div>
                </footer>
            </div>
        </div>
    );
};

export default Home;