export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountedPrice?: number;
  discountPercentage?: number;
  image: string;
  rating: number;
  reviewCount: number;
  category: string;
  origin?: string;
  roastLevel?: string;
  inStock: boolean;
  stock: number;
  createdAt?: Date | string;
}
