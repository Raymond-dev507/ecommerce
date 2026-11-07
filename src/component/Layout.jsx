import './Layout.css';
import { useState } from 'react';
import MoavoralLogo from '../assets/MoavoraLogo.png';
import { NavLink, Link, Outlet, useNavigate } from 'react-router-dom';
import {
    FaMagnifyingGlass, FaRegUser, FaCartShopping,
    FaFacebook, FaInstagram, FaYoutube, FaTiktok,
    FaBars, FaXmark
} from 'react-icons/fa6';

export default function Layout() {
    const [email, setEmail] = useState('');
    const [subscribeMsg, setSubscribeMsg] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const closeMenu = () => setIsMenuOpen(false);

    const handleSearch = (e) => {
        e.preventDefault();
        const query = searchTerm.trim();

        navigate(query
            ? `/products?search=${encodeURIComponent(query)}`
            : '/products'
        );
        closeMenu();
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

        if (!valid) {
            setSubscribeMsg('Enter a valid email address.');
            return;
        }

        // TODO: Send the email to your newsletter endpoint.
        setSubscribeMsg('Thanks for subscribing!');
        setEmail('');
    };

    return (
        <>
            <header className="site-header">
                <div className="announcement-bar">
                    <div className="announcement-left">
                        <span aria-hidden="true">🚚</span>
                        <p>Free Shipping on Orders Above ₦150,000</p>
                    </div>
                    <div className="announcement-center">
                        <p>Shop Smart. Live Better.</p>
                    </div>
                    <div className="announcement-right">
                        <Link to="/track-order">Track Order</Link>
                        <Link to="/help">Help</Link>
                        <Link to="/contact">Contact Us</Link>
                    </div>
                </div>

                <nav className="navbar" aria-label="Main navigation">
                    <Link to="/" className="navbar-logo" onClick={closeMenu}>
                        <img src={MoavoralLogo} alt="Moavora" />
                    </Link>

                    <button
                        className="menu-toggle"
                        type="button"
                        onClick={() => setIsMenuOpen((previous) => !previous)}
                        aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={isMenuOpen}
                        aria-controls="navbar-menu"
                    >
                        {isMenuOpen ? <FaXmark /> : <FaBars />}
                    </button>

                    <div id="navbar-menu" className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
                        <div className="links">
                            <NavLink to="/products" onClick={closeMenu}>Shop</NavLink>
                            <NavLink to="/collections" onClick={closeMenu}>Collections</NavLink>
                            <NavLink to="/new-arrivals" onClick={closeMenu}>New Arrivals</NavLink>
                            <NavLink to="/about" onClick={closeMenu}>About</NavLink>
                        </div>

                        <div className="navbar-actions">
                            <form className="search-box" onSubmit={handleSearch} role="search">
                                <input
                                    type="search"
                                    placeholder="Search for products..."
                                    aria-label="Search products"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button type="submit" aria-label="Submit search">
                                    <FaMagnifyingGlass className="search-icon" />
                                </button>
                            </form>

                            <Link to="/login" className="icon-button" aria-label="My account" onClick={closeMenu}>
                                <FaRegUser />
                            </Link>

                            <Link to="/cart" className="icon-button cart-button" aria-label="Shopping cart" onClick={closeMenu}>
                                <FaCartShopping />
                                <span className="cart-count">2</span>
                            </Link>
                        </div>
                    </div>
                </nav>
            </header>

            <main>
                <Outlet />
            </main>

            <footer className="footer">
                <div className="footer-main">
                    <div className="footer-col footer-brand">
                        <Link to="/" className="footer-logo" aria-label="Moavora home">
                            <svg width="40" height="40" viewBox="0 0 48 48" fill="none" aria-hidden="true">
                                <path d="M16 17v-4.5a8 8 0 0 1 16 0V17" stroke="#e6a817" strokeWidth="3.4" strokeLinecap="round" />
                                <path d="M7 17h34l2 25.2a2.8 2.8 0 0 1-2.8 3H7.8a2.8 2.8 0 0 1-2.8-3L7 17Z" fill="#e6a817" />
                                <path d="M15.5 26.5 22 36.5l11.5-14" stroke="#0b1e4a" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span>Moavora</span>
                        </Link>
                        <p className="footer-tagline">Shop smart. Live better.</p>
                    </div>

                    <nav className="footer-col" aria-label="Quick links">
                        <h3>Quick Links</h3>
                        <ul>
                            <li><Link to="/products">Shop</Link></li>
                            <li><Link to="/collections">Collections</Link></li>
                            <li><Link to="/new-arrivals">New Arrivals</Link></li>
                            <li><Link to="/about">About</Link></li>
                        </ul>
                    </nav>

                    <nav className="footer-col" aria-label="Customer care">
                        <h3>Customer Care</h3>
                        <ul>
                            <li><Link to="/help">FAQs</Link></li>
                            <li><Link to="/track-order">Track Order</Link></li>
                            <li><Link to="/returns">Returns &amp; Refunds</Link></li>
                            <li><Link to="/contact">Contact Us</Link></li>
                        </ul>
                    </nav>

                    <div className="footer-col footer-connect">
                        <h3>Stay Connected</h3>
                        <p className="footer-news-text">Get the latest deals and updates.</p>

                        <form className="footer-subscribe" onSubmit={handleSubscribe} noValidate>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                aria-label="Email address"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    if (subscribeMsg) setSubscribeMsg('');
                                }}
                            />
                            <button type="submit">Subscribe</button>
                        </form>

                        <p className="footer-msg" role="status" aria-live="polite">{subscribeMsg}</p>

                        <div className="footer-social" aria-label="Social media links">
                            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FaFacebook /></a>
                            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><FaInstagram /></a>
                            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube"><FaYoutube /></a>
                            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" aria-label="TikTok"><FaTiktok /></a>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="footer-bottom-inner">
                        <p>© {new Date().getFullYear()} Moavora. All rights reserved.</p>
                        <div className="footer-badges">
                            <span>Shop</span>
                            <span>Secure</span>
                            <span>Reliable</span>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}
