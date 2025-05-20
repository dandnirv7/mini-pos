export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  status: "available" | "out of stock" | string | null;
  imageUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string | null;
};
