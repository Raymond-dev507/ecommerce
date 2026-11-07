import { useState } from 'react'
import {
    FaStar,
    FaStarHalfStroke,
    FaRegStar,
    FaMinus,
    FaPlus,
    FaCartShopping,
    FaRegHeart,
    FaHeart,
    FaTruckFast,
    FaShieldHalved,
    FaDroplet,
    FaFaceSmile,
    FaLeaf,
    FaRotateLeft,
    FaLock
} from 'react-icons/fa6'
import {
    getPrice,
    getStars,
    getRatingCount,
    isInStock,
    formatNaira
} from '../productUtils'
import './ProductInfo.css'

const DEFAULT_FEATURES = [
    { icon: FaShieldHalved, label: 'Quality Assured' },
    { icon: FaTruckFast, label: 'Fast Delivery' },
    { icon: FaRotateLeft, label: 'Easy Returns' },
    { icon: FaLock, label: 'Secure Checkout' }
]

const FEATURE_ICONS = [FaDroplet, FaFaceSmile, FaLeaf, FaShieldHalved]

function Stars({ value }) {
    return (
        <span className="pi-stars" aria-hidden="true">
            {[1, 2, 3, 4, 5].map((n) => {
                if (value >= n - 0.25) return <FaStar key={n} />
                if (value >= n - 0.75) return <FaStarHalfStroke key={n} />
                return <FaRegStar key={n} />
            })}
        </span>
    )
}

export default function ProductInfo({ product, onAddToCart }) {
    const [qty, setQty] = useState(1)
    const [wished, setWished] = useState(false)

    const stars = getStars(product)
    const count = getRatingCount(product)
    const price = getPrice(product)

    const inStock = isInStock(product)


    const bestSeller = product.bestSeller ?? count >= 100

    const features = product.features?.length
        ? product.features.slice(0, 4).map((label, i) => ({
            icon: FEATURE_ICONS[i % FEATURE_ICONS.length],
            label
        }))
        : DEFAULT_FEATURES

    return (
        <div className="pi">
            {bestSeller && <span className="pi-badge">Best Seller</span>}

            <h1 className="pi-title">{product.name}</h1>

            {stars > 0 && (
                <div className="pi-rating">
                    <Stars value={stars} />
                    <strong>{Number(stars).toFixed(1)}</strong>
                    <span>({count} reviews)</span>
                </div>
            )}

            <div className="pi-price">
                <strong>{formatNaira(price)}</strong>
            </div>

            <p className="pi-desc">{product.description}</p>

            <ul className="pi-features">
                {features.map(({ icon: Icon, label }) => (
                    <li key={label}>
                        <Icon />
                        <span>{label}</span>
                    </li>
                ))}
            </ul>

            <div className="pi-buy">
                <span className="pi-qty-label">Quantity:</span>
                <div className="pi-qty">
                    <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() => setQty((q) => Math.max(1, q - 1))}
                        disabled={qty <= 1}
                    >
                        <FaMinus />
                    </button>
                    <span aria-live="polite">{qty}</span>
                    <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() => setQty((q) => Math.min(99, q + 1))}
                    >
                        <FaPlus />
                    </button>
                </div>

                <button
                    type="button"
                    className="pi-cart"
                    disabled={!inStock}
                    onClick={() => onAddToCart?.(product, qty)}
                >
                    <FaCartShopping />
                    {inStock ? 'Add to Cart' : 'Out of stock'}
                </button>
            </div>

            <button
                type="button"
                className={`pi-wish ${wished ? 'active' : ''}`}
                aria-pressed={wished}
                onClick={() => setWished((v) => !v)}
            >
                {wished ? <FaHeart /> : <FaRegHeart />}
                {wished ? 'Added to Wishlist' : 'Add to Wishlist'}
            </button>

            <div className="pi-assure">
                <div>
                    <FaTruckFast />
                    <p>
                        <strong>Free Delivery</strong>
                        <span>On orders over ₦150,000</span>
                    </p>
                </div>
                <div>
                    <FaShieldHalved />
                    <p>
                        <strong>Secure Payments</strong>
                        <span>Your information is safe</span>
                    </p>
                </div>
            </div>
        </div>
    )
}