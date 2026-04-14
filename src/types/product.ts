// types/product.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  description?: string;
  inStock: boolean;
  colors?: string[];
  isNew?: boolean;
}


export interface CartItem extends Product {
  quantity: number;
}

export type WishlistItem = Product;