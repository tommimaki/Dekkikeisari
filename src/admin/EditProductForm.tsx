import React, { useState, useEffect, useCallback } from 'react';
import Product from '../interfaces/product';
import { useDropzone } from 'react-dropzone';

interface Props {
    product: Product;
    onCloseModal: () => void;
}

const EditProductForm: React.FC<Props> = ({ product, onCloseModal }) => {
    const [image, setImage] = useState<File | null>(null);
    const [name, setName] = useState(product.name);
    const [description, setDescription] = useState(product.description);
    const [price, setPrice] = useState(product.price);
    const [category, setCategory] = useState(product.category);
    // const [selectedSizes, setSelectedSizes] = useState<string[]>(product.sizes);
    const [availableSizes, setAvailableSizes] = useState<string[]>([]);

    useEffect(() => {
        setName(product.name);
        setDescription(product.description);
        setPrice(product.price);
        setCategory(product.category);
        // setSelectedSizes(product.sizes);
    }, [product]);

    // Image dropzone
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        setImage(file);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);

        // Set available sizes based on the selected category
        switch (e.target.value) {
            case 'Skateboards':
                setAvailableSizes(['7.5', '7.75', '8.0', '8.25', '8.5']);
                break;
            case 'Shirts':
                setAvailableSizes(['XS', 'S', 'M', 'L', 'XL', 'XXL']);
                break;
            case 'Shoes':
                setAvailableSizes(['36', '37', '38', '39', '40', '41', '42', '43', '44']);
                break;
            default:
                setAvailableSizes([]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // TODO: Implement the update functionality for the product

        onCloseModal();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <button
                type="button"
                className="bg-gray-500 text-white py-2 px-4 rounded"
                onClick={onCloseModal}
            >
                X
            </button>
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <div>
                <label htmlFor="name" className="block text-sm font-medium">Product Name</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded p-2"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 w-full border border-gray-300 rounded p-2"
                />
            </div>
            <div>
                <label htmlFor="price" className="block text-sm font-medium">Price</label>
                <input
                    type="number"
                    step="0.01"
                    id="price"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    className="mt-1 w-full border border-gray-300 rounded p-2"
                />
            </div>
            <div>
                <label htmlFor="category" className="block text-sm font-medium">
                    Category(choose before sizes)
                </label>
                <select
                    id="category"
                    value={category}
                    onChange={handleCategoryChange}
                    className="mt-1 w-full border border-gray-300 rounded p-2"
                >
                    <option value="">-- Select category --</option>
                    <option value="Skateboards">Skateboards</option>
                    <option value="Shirts">Shirts</option>
                    <option value="Shoes">Shoes</option>
                </select>
            </div>
            {/* <div>
                <label htmlFor="sizes" className="block text-sm font-medium">
                    Sizes(cmd and click to select multiple)
                </label>
                <select
                    id="sizes"
                    value={selectedSizes}
                    onChange={(e) =>
                        setSelectedSizes(Array.from(e.target.selectedOptions, (option) => option.value))
                    }
                    className="mt-1 w-full border border-gray-300 rounded p-2"
                    multiple // allow selecting multiple options
                >
                    {availableSizes.map((size) => (
                        <option key={size} value={size}>
                            {size}
                        </option>
                    ))}
                </select>
            </div> */}

            <div>
                <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2">
                    Product Image
                </label>
                <div
                    {...getRootProps()}
                    className={`border-dashed border-2 p-4 text-center ${isDragActive ? 'border-blue-500' : 'border-gray-600'
                        }`}
                >
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the image here...</p>
                    ) : (
                        <p>Drag and drop an image, or click to select a file</p>
                    )}
                </div>
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Update Product
            </button>
        </form>
    );
};

export default EditProductForm;
