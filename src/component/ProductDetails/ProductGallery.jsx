import { useState } from 'react'
import { FaChevronDown } from 'react-icons/fa6'
import './ProductGallery.css'

export default function ProductGallery({ images, name, category }) {
    const [active, setActive] = useState(0)
    const hasThumbs = images.length > 1

    return (
        <div className={`pg ${hasThumbs ? 'has-thumbs' : ''}`} data-category={category}>
            {hasThumbs && (
                <div className="pg-thumbs">
                    {images.map((src, i) => (
                        <button
                            key={src + i}
                            type="button"
                            className={i === active ? 'active' : ''}
                            aria-label={`Show image ${i + 1}`}
                            aria-current={i === active}
                            onClick={() => setActive(i)}
                        >
                            <img src={src} alt="" loading="lazy" />
                        </button>
                    ))}
                    {images.length > 4 && (
                        <span className="pg-more" aria-hidden="true">
                            <FaChevronDown />
                        </span>
                    )}
                </div>
            )}

            <div className="pg-main">
                <img src={images[active]} alt={name} />
            </div>
        </div>
    )
}