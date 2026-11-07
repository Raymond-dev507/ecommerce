import { useState } from 'react'
import { FaCircleCheck } from 'react-icons/fa6'
import { getStars, getRatingCount } from '../productUtils'
import './ProductTabs.css'

export default function ProductTabs({ product }) {
    const [tab, setTab] = useState('description')

    const stars = getStars(product)
    const count = getRatingCount(product)
    const questions = product.questions?.length ?? 0
    const highlights = product.highlights ?? []

    const tabs = [
        { id: 'description', label: 'Description' },
        { id: 'reviews', label: `Reviews (${count})` },
        { id: 'qa', label: `Q&A (${questions})` }
    ]

    return (
        <section className="pt" data-category={product.category}>
            <div className="pt-list" role="tablist">
                {tabs.map((t) => (
                    <button
                        key={t.id}
                        type="button"
                        role="tab"
                        id={`tab-${t.id}`}
                        aria-selected={tab === t.id}
                        aria-controls={`panel-${t.id}`}
                        className={tab === t.id ? 'active' : ''}
                        onClick={() => setTab(t.id)}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {tab === 'description' && (
                <div className="pt-panel pt-desc" role="tabpanel" id="panel-description" aria-labelledby="tab-description">
                    <div className="pt-text">
                        <h2>Product Description</h2>
                        <p>{product.description}</p>

                        {highlights.length > 0 && (
                            <ul>
                                {highlights.map((h) => (
                                    <li key={h}>
                                        <FaCircleCheck /> {h}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="pt-image">
                        <img src={product.image} alt={product.name} loading="lazy" />
                    </div>
                </div>
            )}

            {tab === 'reviews' && (
                <div className="pt-panel pt-empty" role="tabpanel" id="panel-reviews" aria-labelledby="tab-reviews">
                    <strong>
                        {stars > 0 ? `${Number(stars).toFixed(1)} out of 5` : 'No ratings yet'}
                    </strong>
                    <p>
                        {count > 0
                            ? `Based on ${count} customer ratings. Written reviews will appear here.`
                            : 'Be the first to review this product.'}
                    </p>
                </div>
            )}

            {tab === 'qa' && (
                <div className="pt-panel pt-empty" role="tabpanel" id="panel-qa" aria-labelledby="tab-qa">
                    <strong>No questions yet</strong>
                    <p>Questions and answers about this product will appear here.</p>
                </div>
            )}
        </section>
    )
}