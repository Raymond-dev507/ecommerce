import {
    FaFilter,
    FaMagnifyingGlass,
    FaStar,
    FaRotateRight
} from 'react-icons/fa6'
import { formatNaira } from './productUtils'

const RATING_OPTIONS = [4, 3, 2]

export default function FilterSidebar({
    filters,
    setFilters,
    categoryCounts,
    bounds,
    onApply,
    onClear,
    open
}) {
    const update = (patch) => setFilters((f) => ({ ...f, ...patch }))

    const toggleCategory = (name) =>
        update({
            categories: filters.categories.includes(name)
                ? filters.categories.filter((c) => c !== name)
                : [...filters.categories, name]
        })

    const lo = filters.minPrice === '' ? bounds.min : Number(filters.minPrice)
    const hi = filters.maxPrice === '' ? bounds.max : Number(filters.maxPrice)

    const pct = (v) => ((v - bounds.min) / (bounds.max - bounds.min || 1)) * 100

    return (
        <form
            className={`filters ${open ? 'open' : ''}`}
            onSubmit={(e) => {
                e.preventDefault()
                onApply()
            }}
        >
            <h2 className="filters-title">
                <FaFilter /> Filter Products
            </h2>

            {/* Search */}
            <div className="filters-group">
                <h3>Search Products</h3>
                <div className="filters-search">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={filters.search}
                        onChange={(e) => update({ search: e.target.value })}
                    />
                    <button type="submit" aria-label="Search">
                        <FaMagnifyingGlass />
                    </button>
                </div>
            </div>

            {/* Category */}
            <div className="filters-group">
                <h3>Category</h3>
                {Object.entries(categoryCounts).map(([name, count]) => (
                    <label className="filters-check" key={name}>
                        <input
                            type="checkbox"
                            checked={filters.categories.includes(name)}
                            onChange={() => toggleCategory(name)}
                        />
                        <span>{name}</span>
                        <em>({count})</em>
                    </label>
                ))}
            </div>

            {/* Price */}
            <div className="filters-group">
                <h3>Price Range (₦)</h3>
                <div className="filters-price-inputs">
                    <input
                        type="number"
                        min="0"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) => update({ minPrice: e.target.value })}
                    />
                    <span>–</span>
                    <input
                        type="number"
                        min="0"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) => update({ maxPrice: e.target.value })}
                    />
                </div>

                <div className="dual-range">
                    <div className="dual-range-track" />
                    <div
                        className="dual-range-fill"
                        style={{ left: `${pct(lo)}%`, right: `${100 - pct(hi)}%` }}
                    />
                    <input
                        type="range"
                        min={bounds.min}
                        max={bounds.max}
                        step={bounds.step}
                        value={lo}
                        aria-label="Minimum price"
                        onChange={(e) =>
                            update({ minPrice: String(Math.min(Number(e.target.value), hi)) })
                        }
                    />
                    <input
                        type="range"
                        min={bounds.min}
                        max={bounds.max}
                        step={bounds.step}
                        value={hi}
                        aria-label="Maximum price"
                        onChange={(e) =>
                            update({ maxPrice: String(Math.max(Number(e.target.value), lo)) })
                        }
                    />
                </div>
                <p className="filters-price-label">
                    {formatNaira(lo)} – {formatNaira(hi)}
                </p>
            </div>

            {/* Rating */}
            <div className="filters-group">
                <h3>Rating</h3>
                {RATING_OPTIONS.map((n) => (
                    <label className="filters-check" key={n}>
                        <input
                            type="checkbox"
                            checked={filters.minRating === n}
                            onChange={() => update({ minRating: filters.minRating === n ? 0 : n })}
                        />
                        <span className="filters-stars">
                            {Array.from({ length: n }).map((_, i) => (
                                <FaStar key={i} />
                            ))}
                        </span>
                        <span>&amp; above</span>
                    </label>
                ))}
            </div>

            {/* Availability */}
            <div className="filters-group">
                <h3>Availability</h3>
                <label className="filters-check">
                    <input
                        type="checkbox"
                        checked={filters.inStockOnly}
                        onChange={(e) => update({ inStockOnly: e.target.checked })}
                    />
                    <span>In Stock Only</span>
                </label>
            </div>

            <button type="submit" className="filters-apply">
                <FaFilter /> Apply Filters
            </button>
            <button type="button" className="filters-clear" onClick={onClear}>
                <FaRotateRight /> Clear All
            </button>
        </form>
    )
}
