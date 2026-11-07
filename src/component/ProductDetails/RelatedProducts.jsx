import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'
import productsData from '../../context/productsData'
import ProductCard from '../ProductCard'
import '../ProductListing.css' // card styles (.pcard ...) live here
import './RelatedProducts.css'

export default function RelatedProducts({ product, onAddToCart, limit = 5 }) {
    const related = productsData.data
        .filter((p) => p.category === product.category && p.id !== product.id)
        .slice(0, limit)

    if (related.length === 0) return null

    return (
        <section className="rp" aria-labelledby="rp-title">
            <div className="rp-head">
                <h2 id="rp-title">You May Also Like</h2>
                <Link
                    to={`/products?category=${encodeURIComponent(product.category)}`}
                    className="rp-all"
                >
                    View All Products <FaArrowRight />
                </Link>
            </div>

            <div className="rp-grid">
                {related.map((p) => (
                    <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
                ))}
            </div>
        </section>
    )
}