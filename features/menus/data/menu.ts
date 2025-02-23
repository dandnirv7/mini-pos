export type Menu = {
  id: string;
  image: File[] | string;
  slug?: string;
  status?: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
};
