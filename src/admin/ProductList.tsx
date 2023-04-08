
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

    useEffect(() => {


        fetchProducts();
    }, []);

    const handleEdit = (product: Product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    const handleProductUpdated = () => {
        fetchProducts();
    };


    const columnDefs = [
        { headerName: 'Nimi', field: 'name', sortable: true, filter: true },
        { headerName: 'ID', field: 'id' },
        { headerName: 'Kategoria', field: 'category', sortable: true, filter: true },
        {
            headerName: 'Kuvaus', field: 'description',

        },
        {
            headerName: 'Muokkaa/Poista', field: '', cellRendererFramework: (params: any) => (
                <div>
                    <button
                        className='focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900'
                        onClick={() => handleEdit(params.data)}>Muokkaa</button>
                    <button
                        className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'
                        onClick={() => handleDelete(params.data.id)}>Poista</button>
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
        <div className='flex-col justify-center items-center'>
            <h2 className="text-2xl font-bold mb-4">Inventaario</h2>
            <div className="ag-theme-alpine" style={{ height: '800px', width: '1200px' }}>
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
                    <EditProductForm product={selectedProduct} onCloseModal={closeModal} onProductUpdated={handleProductUpdated} />

                </Modal>
            )}
        </div>
    );
};

export default ProductList;
