import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../utils/axios';
import { FaCalendarAlt, FaMapMarkerAlt, FaSearch, FaRegClock, FaTicketAlt, FaShieldAlt } from 'react-icons/fa';


const Home = () => {
    const { location } = useLocation();
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (location !== '#events') return;
        requestAnimationFrame(() => {
            document.getElementById('events')?.scrollIntoView({ behavior: 'smooth' });
        });
    }, [location]);

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
                <div id="events" className="flex items-end justify-between mb-8 pb-4 border-b-2 border-dashed border-[#241E22]/15">
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
