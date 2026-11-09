import { Routes, Route } from 'react-router-dom'
// import NotFound from './pages/NotFound'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Layout from './component/Layout'
import './App.css'

function App() {

  return (
    <>

      <Routes>
        <Route element={<Layout />}>
          <Route path='/products' element={<Products />} />
          <Route path='/products/:id' element={<ProductDetails />} />

        </Route>

        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>


    </>
  )
}

export default App
