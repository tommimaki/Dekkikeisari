
import React, { useEffect, useState } from 'react';
import Product from '../interfaces/product';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Modal from 'react-modal';
import EditProductForm from './EditProductForm';
const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:3001/products');
                const data = await response.json();
                console.log('Data:', data);
                setProducts(data.products);

            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    const columnDefs = [
        { headerName: 'Name', field: 'name', sortable: true, filter: true },
        { headerName: 'ID', field: 'id' },
        { headerName: 'Category', field: 'category', sortable: true, filter: true },
        {
            headerName: 'Description', field: 'description',

        },
        {
            headerName: 'Actions', field: '', cellRendererFramework: (params: any) => (
                <div>
                    <button
                        className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900'
                        onClick={() => handleEdit(params.data)}>Edit</button>
                    <button
                        className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                        onClick={() => handleDelete(params.data.id)}>Delete</button>
                </div>
            )
        }
    ];

    const handleDelete = async (id: number) => {
        if (window.confirm(`Poista tuote ${id}?`)) {
            try {
                await fetch(`http://localhost:3001/products/${id}`, {
                    method: 'DELETE'
                });
                setProducts(products.filter(product => product.id !== id));
            } catch (error) {
                console.error('Error deleting product:', error);
            }
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Product List</h2>
            <div className="ag-theme-alpine" style={{ height: '700px', width: '100%' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={products}
                    pagination={true}
                    paginationPageSize={20}
                    suppressCellSelection={true}
                />
            </div>
            {selectedProduct && (
                <Modal isOpen={true} onRequestClose={closeModal} contentLabel="Edit Product">
                    <EditProductForm product={selectedProduct} onCloseModal={closeModal} />
                </Modal>
            )}
        </div>
    );
};

export default ProductList;
