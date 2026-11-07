import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { FaHouse, FaChevronRight } from 'react-icons/fa6'
import productsData from '../context/productsData'

import ProductGallery from '../component/ProductDetails/ProductGallery'
import ProductInfo from '../component/ProductDetails/ProductInfo'
import ProductTabs from '../component/ProductDetails/ProductTabs'
import RelatedProducts from '../component/ProductDetails/RelatedProducts'

import './ProductDetails.css'

export default function ProductDetails({ onAddToCart }) {
    const { id } = useParams()
    const product = productsData.data.find((p) => String(p.id) === String(id))

    useEffect(() => {
        window.scrollTo({ top: 0 })
    }, [id])

    if (!product) {
        return (
            <section className="pd-notfound">
                <h1>Product not found</h1>
                <p>We couldn't find the product you're looking for.</p>
                <Link to="/products">Back to all products</Link>
            </section>
        )
    }

    // use the product's own gallery if it has one, otherwise reuse the single
    // image for every thumbnail (set FALLBACK_THUMBS to 1 to show just one)
    const FALLBACK_THUMBS = 4
    const images = product.images?.length
        ? product.images
        : Array(FALLBACK_THUMBS).fill(product.image)

    return (
        <main className="pd-page">
            <nav className="pd-breadcrumb" aria-label="Breadcrumb">
                <Link to="/products" aria-label="Home"><FaHouse /></Link>
                <FaChevronRight className="pd-sep" />
                <Link to={`/products?category=${encodeURIComponent(product.category)}`}>
                    {product.category}
                </Link>
                {product.subCategory && (
                    <>
                        <FaChevronRight className="pd-sep" />
                        <span>{product.subCategory}</span>
                    </>
                )}
                <FaChevronRight className="pd-sep" />
                <span aria-current="page">{product.name}</span>
            </nav>

            <section className="pd-top">
                <ProductGallery
                    images={images}
                    name={product.name}
                    category={product.category}
                />
                <ProductInfo product={product} onAddToCart={onAddToCart} />
            </section>

            <ProductTabs product={product} />
            <RelatedProducts product={product} onAddToCart={onAddToCart} />
        </main>
    )
}