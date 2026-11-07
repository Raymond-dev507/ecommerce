import { Link } from 'react-router-dom'
import { FaArrowRight } from 'react-icons/fa6'
// import productsData from '../context/productsData.js'
import { useContext } from 'react'
import { productsContext } from '../context/productsContext'

import './CategoryCards.css'

function CategoryCards() {
    
    const uniqueCategories = []
    const data = useContext(productsContext)

    data.forEach((product) => {
        const alreadyExists = uniqueCategories.some(
            (item) => item.category === product.category
        )

        if (!alreadyExists) {
            uniqueCategories.push(product)
        }
    })

    return (
        <section className="category-cards" aria-label="Shop by category">
            {uniqueCategories.map((product, index) => (
                <Link
                    to={`/products?category=${encodeURIComponent(product.category)}`}
                    className={`category-card tone-${index % 5}`}
                    key={product.category}
                >
                    <div className="category-card-image">
                        <img src={product.image} alt="" loading="lazy" />
                    </div>

                    <div className="category-card-label">
                        <h3>{product.category}</h3>
                        <FaArrowRight className="category-card-arrow" />
                    </div>
                </Link>
            ))}
        </section>
    )
}

export default CategoryCards