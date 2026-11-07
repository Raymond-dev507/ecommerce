import './ShopHero.css'
import { Link } from 'react-router-dom'
import { FaHouse } from 'react-icons/fa6'

export default function ShopHero({ from = 1, to = 12, total = 50 }) {
    return (
        <section className="shop-hero">
            <div className="shop-hero-content">
                <nav className="hero-breadcrumb" aria-label="Breadcrumb">
                    <FaHouse className="hero-breadcrumb-icon" />
                    <Link to="/">Home</Link>
                    <span className="hero-breadcrumb-sep">&gt;</span>
                    <span aria-current="page">Shop All Products</span>
                </nav>

                <h1>Shop All Products</h1>
                <p className="hero-subtitle">
                    Discover amazing products across our collections.
                </p>
                <p className="hero-count">
                    Showing {from}–{to} of {total} products
                </p>
            </div>

            
            <svg
                className="hero-art"
                viewBox="0 0 460 160"
                preserveAspectRatio="xMaxYMax meet"
                aria-hidden="true"
            >
                {/* background shapes */}
                <path d="M170 160 L330 0 H460 V160Z" fill="#fff" opacity="0.28" />
                <path d="M300 160 Q380 120 460 56 V160Z" fill="#e6a817" />
                <path d="M360 160 Q410 130 460 112 V160Z" fill="#0b1e4a" />

                {/* gift box */}
                <rect x="0" y="92" width="136" height="68" fill="#10265c" />
                <rect x="-4" y="74" width="144" height="22" fill="#0b1e4a" />
                <rect x="56" y="74" width="22" height="86" fill="#e6a817" />
                <path d="M67 74 C40 30 8 52 36 70 C46 76 60 76 67 74Z" fill="#f0b72f" />
                <path d="M67 74 C94 30 126 52 98 70 C88 76 74 76 67 74Z" fill="#e6a817" />
                <ellipse cx="67" cy="72" rx="10" ry="8" fill="#c98f0e" />

                {/* shopping bag */}
                <path
                    d="M198 40 C198 -4 244 -4 244 40"
                    fill="none"
                    stroke="#0b1e4a"
                    strokeWidth="5"
                    strokeLinecap="round"
                />
                <rect x="168" y="38" width="100" height="122" fill="#1c3174" />
                <path d="M268 38 L286 48 V160 H268Z" fill="#0b1e4a" />
                <rect x="200" y="62" width="36" height="3" rx="1.5" fill="#e6a817" />

                {/* plant */}
                <g transform="translate(345 92)">
                    <path d="M0 0 C-30 -18 -38 -42 -26 -62 C-10 -48 -4 -24 0 0Z" fill="#3f7d3a" />
                    <path d="M0 0 C-4 -30 4 -56 20 -68 C30 -46 18 -18 0 0Z" fill="#5a9a45" />
                    <path d="M0 0 C22 -14 44 -16 58 -6 C44 10 20 10 0 0Z" fill="#4a8b3d" />
                    <path d="M0 0 C-22 -4 -46 0 -58 14 C-36 26 -14 16 0 0Z" fill="#6aa84f" />
                    <rect x="-26" y="-2" width="52" height="12" rx="3" fill="#f2f2f2" />
                    <path d="M-23 10 H23 L19 70 H-19Z" fill="#fff" />
                </g>
            </svg>
        </section>
    )
}
