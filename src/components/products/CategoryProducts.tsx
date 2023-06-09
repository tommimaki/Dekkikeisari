import React, { useState, useEffect } from 'react';
import Product from '../../interfaces/product';
import ProductCard from './ProductCard';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from '../layout/BreadCrumb';

const BASE_API_URL = process.env.REACT_APP_API_URL || 'def';


interface CategoryProductsProps {
    category: string;
    title: string;
    subheading: string;
    size?: string;
    search?: string;
    onFilteredProductsUpdate?: (filteredProducts: Product[]) => void;
    shouldRender?: boolean;
    product?: Product;
    currentProductId?: number;
    maxProducts?: number;

}

const CategoryProducts: React.FC<CategoryProductsProps> = ({
    category,
    title,
    subheading,
    size,
    search,
    onFilteredProductsUpdate,
    shouldRender = true,
    product,
    currentProductId,
    maxProducts = Infinity
}) => {
    const [products, setProducts] = useState<Product[]>([]);
    const location = useLocation();


    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`${BASE_API_URL}products?category=${category}`);
            const data = await response.json();

            const parsedProducts = data.products.map((product: Product) => {
                let imageUrlsArray = [];
                try {
                    if (typeof product.image_urls === 'string') {
                        const parsed = JSON.parse(product.image_urls);
                        imageUrlsArray = Array.isArray(parsed) ? parsed : JSON.parse(parsed);
                    } else if (Array.isArray(product.image_urls)) {
                        imageUrlsArray = product.image_urls;
                    } else {
                        console.error('Error: Unsupported image_urls format');
                    }
                } catch (error) {
                    console.error('Error parsing image URLs:', error);
                }

                return { ...product, image_urls: imageUrlsArray };
            });

            setProducts(parsedProducts);
        };

        fetchProducts();
    }, [category]);



    const filteredProducts = products.filter((p) => {
        let sizeMatch = true;
        let searchTermMatch = true;

        if (size) {
            const sizesArray = JSON.parse(p.sizes);
            sizeMatch = sizesArray.includes(size);
        }

        if (search) {
            searchTermMatch = p.name.toLowerCase().includes(search.toLowerCase());
        } else {
            searchTermMatch = true;
        }

        return sizeMatch && searchTermMatch && p.id !== product?.id && p.id !== currentProductId;
    });


    useEffect(() => {
        if (onFilteredProductsUpdate) {
            onFilteredProductsUpdate(filteredProducts);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [products, size, search]);

    if (!shouldRender) {
        return null;
    }
    return (
        <div className='max-w-7xl mx-auto p-4'>
            {location.pathname === `/${category}` && <Breadcrumb category={'products'} name={category} />}
            <div className="py-8 mx-8">
                <Link to={`/${category}`}>
                    <h3 className="text-2xl text-center font-bold mb-4">{title}</h3>
                </Link>
                <hr className="mb-4" />
                <p className="text-gray-700 text-center font-semibold mb-6">{subheading}</p>
                <hr className="mb-4" />
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>

    );
};

export default CategoryProducts;
