import { faker } from "../utils/faker";
import { prisma } from "@/lib/prisma";

export async function seedCarts(users: any[], products: any[]) {
  console.log("🛒 Creating carts and cart items...");

  const carts = await Promise.all(
    users.map(async (user) => {
      const cart = await prisma.cart.create({
        data: {
          userId: user.id,
        },
      });

      const numberOfItems = faker.number.int({ min: 1, max: 4 });

      await Promise.all(
        Array.from({ length: numberOfItems }).map(() => {
          const product = faker.helpers.arrayElement(products);
          return prisma.cartItem.create({
            data: {
              cartId: cart.id,
              productId: product.id,
              quantity: faker.number.int({ min: 1, max: 3 }),
            },
          });
        })
      );

      return cart;
    })
  );

  return carts;
}
