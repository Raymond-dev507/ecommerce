import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaRegHeart, FaHeart, FaStar, FaCartShopping } from 'react-icons/fa6'
import {
    getPrice,
    getOldPrice,
    getStars,
    getRatingCount,
    isInStock,
    formatNaira
} from './productUtils'

export default function ProductCard({ product, onAddToCart }) {
    const [liked, setLiked] = useState(false)

    const stars = getStars(product)
    const count = getRatingCount(product)
    const oldPrice = getOldPrice(product)
    const inStock = isInStock(product)

    return (
        <article className="pcard" data-category={product.category}>
            <div className="pcard-media">

                <button
                    type="button"
                    className={`pcard-heart ${liked ? 'liked' : ''}`}
                    aria-label={liked ? 'Remove from wishlist' : 'Add to wishlist'}
                    aria-pressed={liked}
                    onClick={() => setLiked((v) => !v)}
                >
                    {liked ? <FaHeart /> : <FaRegHeart />}
                </button>

                <Link to={`/products/${product.id}`} tabIndex={-1}>
                    <img src={product.image} alt={product.name} loading="lazy" />
                </Link>
            </div>

            <div className="pcard-body">
                <h3 className="pcard-name">
                    <Link to={`/products/${product.id}`}>{product.name}</Link>
                </h3>

                {stars > 0 && (
                    <div className="pcard-rating">
                        <FaStar />
                        <span>{Number(stars).toFixed(1)}</span>
                        {count > 0 && <span className="pcard-count">({count})</span>}
                    </div>
                )}

                <div className="pcard-price">
                    <strong>{formatNaira(getPrice(product))}</strong>
                    {oldPrice && <s>{formatNaira(oldPrice)}</s>}
                </div>

                <button
                    type="button"
                    className="pcard-cart"
                    disabled={!inStock}
                    onClick={() => onAddToCart?.(product)}
                >
                    <FaCartShopping />
                    {inStock ? 'Add to Cart' : 'Out of stock'}
                </button>
            </div>
        </article>
    )
}