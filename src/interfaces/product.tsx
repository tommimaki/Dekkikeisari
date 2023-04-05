// interfaces/product.ts
interface Product {
  id: number;
  name: string;
  description: string;
  image_urls: string;
  price: number;
  category: string;
  sizes: string;
  quantity?: number;
  size?: string;
}



export default Product;


