import React, { useState } from 'react'
import useProducts from '../Hooks/useProducts'
import { Link } from 'react-router-dom';


const HomeScreen = () => {
    const {products_state, products_loading_state, products_error_state} = useProducts()
    console.log('Loading:', products_loading_state);
    console.log('Error:', products_error_state);
    console.log('Products:', products_state);

    return (
        <div>
            <h1>Bienvenido</h1>
            {/* ver si el usuario tiene rol de admin y si tiene rol de admin mostrar el boton de crear producto, el boton te llevara a /product/new y nos mostrara un formulario para crear un producto */}
            <div>
                {
                    products_loading_state 
                    ? <span>Loading...</span> 
                    : (
                        products_error_state
                        ? <span>{products_error_state}</span>
                        : <div>
                            {
                                products_state.map(
                                    (product) => {
                                        return (
                                            <div key={product._id}>
                                                <h2>{product.title}</h2>
                                                <span>Precio: {product.price}</span>
                                                <Link to={`/product/${product._id}`}>Ver detalle</Link>
                                                </div>
                                        )
                                    }
                                )
                            }
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default HomeScreen