// interfaces/product.ts
interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  price: number;
  category: string;
  sizes: string;
  quantity?: number;
}



export default Product;


