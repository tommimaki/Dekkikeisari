

export interface ProductInOrder {
    productId: number;
    price: number;
    quantity: number;
}

export interface Customer {
    id: number;
    name: string;
    email: string;
}


export interface Order {
    id: number;
    customer_id: number;
    products: ProductInOrder[];
    total: number;
    shipping_address: string;
    created_at: string;
    updated_at: string;
    customer_name: string;
    customer_email: string;
    status: string;
}


