export const userSelect = {
  id: true,
  email: true,
  username: true,
  fullName: true,
  role: true,
  status: true,
  addresses: {
    select: {
      id: true,
      street: true,
      isPrimary: true,
    },
  },
};

export const productSelect = {
  id: true,
  name: true,
  slug: true,
  price: true,
  description: true,
  imageUrl: true,
  status: true,
  stock: true,
  category: true,
  createdAt: true,
  updatedAt: true,
};
