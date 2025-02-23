"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Menu } from "@/features/menus/data/menu";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { type MenuData, menuSchema } from "@/features/menus/data/schema";
import InnerFormMenu from "./inner-form-menu";

export default function MenuForm({
  initialData,
  pageTitle,
}: {
  initialData: Menu | null;
  pageTitle: string;
}) {
  const defaultValues = {
    name: initialData?.name || "",
    category: initialData?.category || "",
    price: initialData?.price || 0,
    stock: initialData?.stock || 0,
    description: initialData?.description || "",
  };

  const form = useForm<MenuData>({
    resolver: zodResolver(menuSchema),
    values: defaultValues,
  });

  function onSubmit(values: MenuData) {
    console.log(values);
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          {pageTitle}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <InnerFormMenu handleSubmit={onSubmit} />
        </Form>
      </CardContent>
    </Card>
  );
}
