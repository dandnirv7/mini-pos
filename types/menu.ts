export type MenuCategory = {
  id: string;
  name: string;
};

export type Menu = {
  id: string;
  name: string;
  slug: string;
  description: string;
  menuCategory: MenuCategory;
  price: number;
  stock: number;
  status: "available" | "out of stock" | null | string;
};
