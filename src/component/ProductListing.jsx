import { useEffect, useMemo, useState, useContext } from 'react'
import { productsContext } from '../context/productsContext'
import { useSearchParams } from 'react-router-dom'
import {
    FaChevronLeft,
    FaChevronRight,
    FaChevronDown,
    FaSliders,
    FaTableCellsLarge,
    FaList,
    FaFilter
} from 'react-icons/fa6'
// import productsData from '../context/productsData'
import FilterSidebar from './FilterSidebar'
import ProductCard from './ProductCard'
import { getPrice, getStars, getRatingCount, isInStock } from './productUtils'
import './ProductListing.css'

const PAGE_SIZE = 12

const DEFAULT_FILTERS = {
    search: '',
    categories: [],
    minPrice: '',
    maxPrice: '',
    minRating: 0,
    inStockOnly: true
}

const SORT_OPTIONS = [
    { value: 'popularity', label: 'Sort by: Popularity' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
    { value: 'name', label: 'Name: A to Z' }
]


export default function ProductListing({ onResultsChange, onAddToCart }) {
    // const allProducts = productsData.data
    const allProducts = useContext(productsContext)
    console.log('ALL PRODUCTS:', allProducts)
    console.log('IS ARRAY:', Array.isArray(allProducts))
    const [searchParams] = useSearchParams()
    const urlSearch = searchParams.get('search') || ''
    const urlCategory = searchParams.get('category') || ''

    
    const fromUrl = {
        ...DEFAULT_FILTERS,
        search: urlSearch,
        categories: urlCategory ? [urlCategory] : []
    }
    const [draft, setDraft] = useState(fromUrl)
    const [applied, setApplied] = useState(fromUrl)
    const [sort, setSort] = useState('popularity')
    const [view, setView] = useState('grid')
    const [page, setPage] = useState(1)
    const [filtersOpen, setFiltersOpen] = useState(false)

    
    const categoryCounts = useMemo(() => {
        const counts = {}
        allProducts.forEach((p) => {
            counts[p.category] = (counts[p.category] || 0) + 1
        })
        return counts
    }, [allProducts])

    const bounds = useMemo(() => {
        const prices = allProducts.map(getPrice)
        const max = Math.max(...prices, 1000)
        return { min: 0, max: Math.ceil(max / 1000) * 1000, step: 100 }
    }, [allProducts])

    
    const results = useMemo(() => {
        const term = applied.search.trim().toLowerCase()
        const min = applied.minPrice === '' ? -Infinity : Number(applied.minPrice)
        const max = applied.maxPrice === '' ? Infinity : Number(applied.maxPrice)

        const list = allProducts.filter((p) => {
            const price = getPrice(p)

            const matchesCategory =
                applied.categories.length === 0 || applied.categories.includes(p.category)

            const matchesSearch =
                !term ||
                p.name?.toLowerCase().includes(term) ||
                p.category?.toLowerCase().includes(term) ||
                p.subCategory?.toLowerCase().includes(term) ||
                p.keywords?.some((k) => k.toLowerCase().includes(term))

            return (
                matchesCategory &&
                matchesSearch &&
                price >= min &&
                price <= max &&
                getStars(p) >= applied.minRating &&
                (!applied.inStockOnly || isInStock(p))
            )
        })

        const sorters = {
            popularity: (a, b) => getRatingCount(b) - getRatingCount(a),
            'price-asc': (a, b) => getPrice(a) - getPrice(b),
            'price-desc': (a, b) => getPrice(b) - getPrice(a),
            rating: (a, b) => getStars(b) - getStars(a),
            name: (a, b) => a.name.localeCompare(b.name)
        }
        return [...list].sort(sorters[sort])
    }, [allProducts, applied, sort])

   
    const total = results.length
    const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE))
    const currentPage = Math.min(page, pageCount)
    const startIndex = (currentPage - 1) * PAGE_SIZE
    const visible = results.slice(startIndex, startIndex + PAGE_SIZE)

    const from = total ? startIndex + 1 : 0
    const to = Math.min(startIndex + PAGE_SIZE, total)

    // keep the hero text ("Showing 1–12 of 50") in sync
    useEffect(() => {
        onResultsChange?.({ from, to, total })
    }, [from, to, total, onResultsChange])

    const applyFilters = () => {
        setApplied(draft)
        setPage(1)
        setFiltersOpen(false)
    }

    const clearAll = () => {
        const cleared = { ...DEFAULT_FILTERS, inStockOnly: false }
        setDraft(cleared)
        setApplied(cleared)
        setPage(1)
    }

    const goToPage = (n) => {
        setPage(n)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <section className="shop-layout">
            <FilterSidebar
                filters={draft}
                setFilters={setDraft}
                categoryCounts={categoryCounts}
                bounds={bounds}
                onApply={applyFilters}
                onClear={clearAll}
                open={filtersOpen}
            />

            {console.log(allProducts)}

            <div className="shop-main">
                {/* toolbar */}
                <div className="shop-toolbar">
                    <button
                        type="button"
                        className="shop-filter-toggle"
                        onClick={() => setFiltersOpen((v) => !v)}
                    >
                        <FaFilter /> Filters
                    </button>

                    <label className="shop-sort">
                        <FaSliders />
                        <select value={sort} onChange={(e) => setSort(e.target.value)}>
                            {SORT_OPTIONS.map((o) => (
                                <option key={o.value} value={o.value}>
                                    {o.label}
                                </option>
                            ))}
                        </select>
                        <FaChevronDown className="shop-sort-caret" />
                    </label>

                    <div className="shop-view">
                        <button
                            type="button"
                            className={view === 'grid' ? 'active' : ''}
                            aria-label="Grid view"
                            onClick={() => setView('grid')}
                        >
                            <FaTableCellsLarge />
                        </button>
                        <button
                            type="button"
                            className={view === 'list' ? 'active' : ''}
                            aria-label="List view"
                            onClick={() => setView('list')}
                        >
                            <FaList />
                        </button>
                    </div>
                </div>

                {/* products */}
                {total > 0 ? (
                    <div className={`products-grid ${view}`}>
                        {visible.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={onAddToCart}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="shop-empty">
                        <p>No products match your filters.</p>
                        <button type="button" onClick={clearAll}>
                            Clear all filters
                        </button>
                    </div>
                )}

                {/* pagination */}
                {pageCount > 1 && (
                    <nav className="shop-pagination" aria-label="Pagination">
                        {currentPage > 1 && (
                            <button type="button" aria-label="Previous page" onClick={() => goToPage(currentPage - 1)}>
                                <FaChevronLeft />
                            </button>
                        )}
                        {Array.from({ length: pageCount }, (_, i) => i + 1).map((n) => (
                            <button
                                key={n}
                                type="button"
                                className={n === currentPage ? 'active' : ''}
                                aria-current={n === currentPage ? 'page' : undefined}
                                onClick={() => goToPage(n)}
                            >
                                {n}
                            </button>
                        ))}
                        {currentPage < pageCount && (
                            <button type="button" aria-label="Next page" onClick={() => goToPage(currentPage + 1)}>
                                <FaChevronRight />
                            </button>
                        )}
                    </nav>
                )}
            </div>
        </section>
    )
}
