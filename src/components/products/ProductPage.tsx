// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import Product from '../../interfaces/product';
// import { addToCart } from '../../features/cart/cartSlice';

// const ProductPage = () => {
//     const { id } = useParams();
//     const [product, setProduct] = useState<Product | null>(null);
//     const [selectedSize, setSelectedSize] = useState<string>('');
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const fetchProduct = async () => {
//             const response = await fetch(`http://localhost:3001/products/${id}`);
//             const data = await response.json();
//             setProduct(data.product);
//         };

//         fetchProduct();
//     }, [id]);

//     const handleAddToCart = () => {
//         if (product) {
//             dispatch(addToCart({ ...product, quantity: 1 }));
//         }
//     };

//     if (!product) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="py-8">
//             <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
//             <h3 className="text-2xl font-semibold mb-4">{product.name}</h3>
//             <p className="text-gray-700">{product.description}</p>
//             <p className="text-gray-700 mb-4">{product.price}€</p>
//             {product.sizes && (
//                 <div className="mb-4">
//                     <label htmlFor="size" className="block mb-2">Size</label>
//                     <select
//                         id="size"
//                         value={selectedSize}
//                         onChange={(e) => setSelectedSize(e.target.value || '')}
//                         className="w-full border border-gray-300 p-2 rounded"
//                     >
//                         <option value="">Select a size</option>
//                         {(() => {
//                             const parsedSizes = JSON.parse(product.sizes);
//                             return parsedSizes.map((sizeString: string) => (
//                                 <option
//                                     key={sizeString}
//                                     value={sizeString}
//                                 >
//                                     {sizeString}
//                                 </option>
//                             ));
//                         })()}
//                     </select>
//                 </div>
//             )}
//             <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" disabled={!selectedSize} onClick={handleAddToCart}>
//                 Add to cart
//             </button>
//         </div>
//     );

// };

// export default ProductPage;

// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import Product from '../../interfaces/product';
// import { addToCart } from '../../features/cart/cartSlice';


// import { RootState } from '../../store'; // Import RootState type
// const cart = useSelector((state: RootState) => state.cart); // Provide type annotation for state


// const ProductPage = () => {
//     const { id } = useParams();
//     const [product, setProduct] = useState<Product | null>(null);
//     const [selectedSize, setSelectedSize] = useState<string>('');
//     const dispatch = useDispatch();
//     const cart = useSelector((state) => state.cart);

//     useEffect(() => {
//         const fetchProduct = async () => {
//             const response = await fetch(`http://localhost:3001/products/${id}`);
//             const data = await response.json();
//             setProduct(data.product);
//         };

//         fetchProduct();
//     }, [id]);

//     const handleAddToCart = () => {
//         if (product) {
//             const cartProduct = { ...product, quantity: 1 };
//             dispatch(addToCart(cartProduct));
//         }
//     };

//     if (!product) {
//         return <div>Loading...</div>;
//     }

//     console.log('Cart:', cart.items); // Log the cart state to the console

//     return (
//         <div className="py-8">
//             <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
//             <h3 className="text-2xl font-semibold mb-4">{product.name}</h3>
//             <p className="text-gray-700">{product.description}</p>
//             <p className="text-gray-700 mb-4">{product.price}€</p>
//             {product.sizes && (
//                 <div className="mb-4">
//                     <label htmlFor="size" className="block mb-2">Size</label>
//                     <select
//                         id="size"
//                         value={selectedSize}
//                         onChange={(e) => setSelectedSize(e.target.value || '')}
//                         className="w-full border border-gray-300 p-2 rounded"
//                     >
//                         <option value="">Select a size</option>
//                         {(() => {
//                             const parsedSizes = JSON.parse(product.sizes);
//                             return parsedSizes.map((sizeString: string) => (
//                                 <option
//                                     key={sizeString}
//                                     value={sizeString}
//                                 >
//                                     {sizeString}
//                                 </option>
//                             ));
//                         })()}
//                     </select>
//                 </div>
//             )}
//             <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" disabled={!selectedSize} onClick={handleAddToCart}>
//                 Add to cart
//             </button>
//         </div>
//     );

// };

// export default ProductPage;

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../../interfaces/product';
import { addToCart } from '../../features/cart/cartSlice';
import { RootState } from '../../store'; // Import RootState type

const ProductPage = () => {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const dispatch = useDispatch();

    const cart = useSelector((state: RootState) => state.cart); // Move the useSelector hook inside the component

    useEffect(() => {
        const fetchProduct = async () => {
            const response = await fetch(`http://localhost:3001/products/${id}`);
            const data = await response.json();
            setProduct(data.product);
        };

        fetchProduct();
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            const cartProduct = { ...product, quantity: 1 };
            dispatch(addToCart(cartProduct));
        }
    };

    if (!product) {
        return <div>Loading...</div>;
    }

    console.log('Cart:', cart.items); // Log the cart state to the console

    return (
        <div className="py-8">
            <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
            <h3 className="text-2xl font-semibold mb-4">{product.name}</h3>
            <p className="text-gray-700">{product.description}</p>
            <p className="text-gray-700 mb-4">{product.price}€</p>
            {product.sizes && (
                <div className="mb-4">
                    <label htmlFor="size" className="block mb-2">Size</label>
                    <select
                        id="size"
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value || '')}
                        className="w-full border border-gray-300 p-2 rounded"
                    >
                        <option value="">Select a size</option>
                        {(() => {
                            const parsedSizes = JSON.parse(product.sizes);
                            return parsedSizes.map((sizeString: string) => (
                                <option
                                    key={sizeString}
                                    value={sizeString}
                                >
                                    {sizeString}
                                </option>
                            ));
                        })()}
                    </select>
                </div>
            )}
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" disabled={!selectedSize} onClick={handleAddToCart}>
                Add to cart
            </button>
        </div>
    );

};

export default ProductPage;
