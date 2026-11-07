// import { useState } from "react";
import { productsContext } from "./productsContext";
import data from "./productsData";

export default function ProductsProvider({children}){

    const products =data;
    // const [cart, setCart] = useState([])


    

    return(
        <>
            <productsContext.Provider value={products}>
                {children}
            </productsContext.Provider>
        </>
    )
    
}

