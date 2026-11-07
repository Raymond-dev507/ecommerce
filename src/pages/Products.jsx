import { useState, useContext } from 'react'
// import productsData from '../context/productsData'
import { productsContext } from '../context/productsContext'

import ShopHero from '../component/ShopHero'
import CategoryCards from '../component/CategoryCards'
import ProductListing from '../component/ProductListing'
import { useSearchParams } from 'react-router-dom'

export default function Products() {
    
    const [searchParams] = useSearchParams()
    const data = useContext(productsContext)

    // console.log(data)
    
    const [range, setRange] = useState({
        from: 1,
        to: Math.min(12, data.length),
        total: data.length
    })

    return (
        <>
            <ShopHero from={range.from} to={range.to} total={range.total} />
            <CategoryCards />
            <ProductListing
                key={`${searchParams.get('search') || ''}-${searchParams.get('category') || ''}`}
                onResultsChange={setRange}
            />
        </>
    )
}