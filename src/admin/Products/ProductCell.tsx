import React, { useState } from "react";
import Modal from "react-modal";
import { ProductInOrder } from "../../interfaces/order";

Modal.setAppElement("#root"); // Replace #root with the id of your root element

const ProductCell: React.FC<{ value: ProductInOrder[] }> = (params) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };


  return (
    <div>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-500 text-white text-sm px-3 py-1 rounded-md mr-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        tuotelista
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="Product Details"
        className="relative w-3/4 mx-auto mt-10 p-6 bg-white rounded-md shadow-lg focus:outline-none"
        overlayClassName="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center"
      >
        <h2 className="text-xl font-bold mb-4">Product Details</h2>
        <div className="space-y-2">
          {params.value.map((product: ProductInOrder) => (
            <div key={product.productId} className="border-b border-gray-200 py-2">
              Product ID: {product.productId} (Name: {product.productName}, Size: {product.size}, Quantity: {product.quantity})
            </div>
          ))}
        </div>
        <button
          onClick={closeModal}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default ProductCell;
