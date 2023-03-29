// interfaces/product.ts
interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  category: string;
  sizes: string[]; // Add this line
}

export default Product;


