import { productActions } from "@/features/products/actions/productActions";
import React from "react";
import { Product } from "@/features/products/data/product";
import ProductForm from "../new/page";

const page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const { data } = await productActions.getProductById(slug);

  console.log(data);

  const initialData: Product = {
    image: [],
    name: data?.name || "",
    category: data?.category || "",
    price: data?.price || 0,
    stock: data?.stock || 0,
    description: data?.description || "",
  };

  return <ProductForm pageTitle="Edit Product" initialData={initialData} />;
};

export default page;
