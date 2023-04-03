// import React, { useEffect, useState } from 'react';
// import Product from '../interfaces/product';
// import { AgGridReact } from 'ag-grid-react';
// import 'ag-grid-community/styles/ag-grid.css';
// import 'ag-grid-community/styles/ag-theme-alpine.css';

// const ProductList: React.FC = () => {
//     const [products, setProducts] = useState<Product[]>([]);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await fetch('http://localhost:3001/products');
//                 const data = await response.json();
//                 console.log('Data:', data);
//                 setProducts(data.products);

//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };

//         fetchProducts();
//     }, []);

//     return (
//         <div>
//             <h2 className="text-2xl font-bold mb-4">Product List</h2>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>ID</th>
//                         <th>Category</th>
//                         <th>Description</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {products.map((product) => (
//                         <tr key={product.id}>
//                             <td>{product.name}</td>
//                             <td>{product.id}</td>
//                             <td>{product.category}</td>
//                             <td>{product.description}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>

//         </div>
//     );
// };

// export default ProductList;
import React, { useEffect, useState } from 'react';
import Product from '../interfaces/product';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const ProductList: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

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

    const columnDefs = [
        { headerName: 'Name', field: 'name', filter: true },
        { headerName: 'ID', field: 'id' },
        { headerName: 'Category', field: 'category', filter: true },
        { headerName: 'Description', field: 'description' },
    ];

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Product List</h2>
            <div className="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={products}
                    pagination={true}
                    paginationPageSize={10}
                    suppressCellSelection={true}
                />
            </div>
        </div>
    );
};

export default ProductList;
