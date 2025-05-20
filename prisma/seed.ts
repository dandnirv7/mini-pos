import { faker } from "@faker-js/faker";
import { PrismaClient, Product, OrderStatus } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const roles = ["user", "admin", "superadmin", "cashier"];

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.dailyDiscount.deleteMany();
  await prisma.product.deleteMany();
  await prisma.address.deleteMany();
  await prisma.user.deleteMany();

  const users = await Promise.all(
    Array.from({ length: 10 }).map(async () => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const password = await hashPassword(firstName + "123");

      const user = await prisma.user.create({
        data: {
          id: faker.string.uuid(),
          fullName: `${firstName} ${lastName}`,
          username: faker.internet
            .userName({ firstName, lastName })
            .toLowerCase(),
          email: faker.internet.email({ firstName, lastName }).toLowerCase(),
          password,
          role: faker.helpers.arrayElement(roles),
          status: "active",
          resetToken: null,
          resetTokenExpires: null,
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        },
      });

      await prisma.address.create({
        data: {
          id: faker.string.uuid(),
          userId: user.id,
          street: faker.location.streetAddress(),
          state: faker.location.state(),
          phoneNumber: faker.phone.number(),
          city: faker.location.city(),
          postalCode: faker.location.zipCode(),
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        },
      });

      return user;
    })
  );

  const staticProducts: Omit<Product, "deletedAt" | "imageUrl">[] = [
    {
      id: faker.string.uuid(),
      name: "House Blend Coffee",
      slug: "house-blend-coffee",
      price: 18000,
      description: "Smooth and balanced house blend coffee.",
      stock: 100,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "coffee",
    },
    {
      id: faker.string.uuid(),
      name: "Espresso Roast",
      slug: "espresso-roast",
      price: 20000,
      description: "Dark roasted espresso with bold flavor.",
      stock: 90,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "coffee",
    },
    {
      id: faker.string.uuid(),
      name: "Caramel Macchiato",
      slug: "caramel-macchiato",
      price: 25000,
      description: "Espresso with steamed milk and caramel drizzle.",
      stock: 80,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "coffee",
    },
    {
      id: faker.string.uuid(),
      name: "Mocha Latte",
      slug: "mocha-latte",
      price: 26000,
      description: "Chocolate flavored coffee with steamed milk.",
      stock: 70,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "coffee",
    },
    {
      id: faker.string.uuid(),
      name: "Vanilla Cold Brew",
      slug: "vanilla-cold-brew",
      price: 24000,
      description: "Cold brew coffee with vanilla syrup.",
      stock: 60,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "coffee",
    },
    {
      id: faker.string.uuid(),
      name: "Americano",
      slug: "americano",
      price: 17000,
      description: "Espresso diluted with hot water.",
      stock: 110,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "coffee",
    },

    {
      id: faker.string.uuid(),
      name: "Earl Grey Tea",
      slug: "earl-grey-tea",
      price: 15000,
      description: "Fragrant black tea with bergamot citrus flavor.",
      stock: 70,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "tea",
    },
    {
      id: faker.string.uuid(),
      name: "Chamomile Tea",
      slug: "chamomile-tea",
      price: 14000,
      description: "Relaxing herbal tea with chamomile flowers.",
      stock: 60,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "tea",
    },
    {
      id: faker.string.uuid(),
      name: "Matcha Latte",
      slug: "matcha-latte",
      price: 22000,
      description: "Smooth Japanese green tea blended with milk.",
      stock: 50,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "tea",
    },
    {
      id: faker.string.uuid(),
      name: "Lemongrass Ginger Tea",
      slug: "lemongrass-ginger-tea",
      price: 16000,
      description: "Soothing tea with lemongrass and ginger blend.",
      stock: 55,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "tea",
    },
    {
      id: faker.string.uuid(),
      name: "Mint Green Tea",
      slug: "mint-green-tea",
      price: 15000,
      description: "Refreshing green tea with mint leaves.",
      stock: 60,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "tea",
    },
    {
      id: faker.string.uuid(),
      name: "Thai Iced Tea",
      slug: "thai-iced-tea",
      price: 19000,
      description: "Sweet and creamy spiced iced tea.",
      stock: 45,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "tea",
    },

    {
      id: faker.string.uuid(),
      name: "Ethiopian Coffee Beans",
      slug: "ethiopian-coffee-beans",
      price: 50000,
      description: "Premium whole coffee beans from Ethiopia.",
      stock: 80,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "beans",
    },
    {
      id: faker.string.uuid(),
      name: "Colombian Coffee Beans",
      slug: "colombian-coffee-beans",
      price: 48000,
      description: "Medium-roast coffee beans from Colombia.",
      stock: 75,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "beans",
    },
    {
      id: faker.string.uuid(),
      name: "Sumatra Mandheling Beans",
      slug: "sumatra-mandheling-beans",
      price: 52000,
      description: "Full-bodied beans with low acidity.",
      stock: 60,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "beans",
    },
    {
      id: faker.string.uuid(),
      name: "Guatemala Antigua Beans",
      slug: "guatemala-antigua-beans",
      price: 51000,
      description: "Nutty, chocolaty beans with smooth finish.",
      stock: 55,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "beans",
    },
    {
      id: faker.string.uuid(),
      name: "Brazil Santos Beans",
      slug: "brazil-santos-beans",
      price: 47000,
      description: "Light, sweet, and balanced coffee beans.",
      stock: 65,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "beans",
    },
    {
      id: faker.string.uuid(),
      name: "Kenyan AA Beans",
      slug: "kenyan-aa-beans",
      price: 53000,
      description: "Bright and fruity coffee from Kenya.",
      stock: 50,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "beans",
    },

    {
      id: faker.string.uuid(),
      name: "Almond Croissant",
      slug: "almond-croissant",
      price: 12000,
      description: "Flaky pastry filled with almond cream.",
      stock: 60,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "snack",
    },
    {
      id: faker.string.uuid(),
      name: "Cheese Danish",
      slug: "cheese-danish",
      price: 13000,
      description: "Soft pastry with sweet cream cheese filling.",
      stock: 55,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "snack",
    },
    {
      id: faker.string.uuid(),
      name: "Chocolate Muffin",
      slug: "chocolate-muffin",
      price: 11000,
      description: "Rich and moist chocolate muffin.",
      stock: 70,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "snack",
    },
    {
      id: faker.string.uuid(),
      name: "Banana Bread",
      slug: "banana-bread",
      price: 12500,
      description: "Soft banana-flavored cake loaf.",
      stock: 65,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "snack",
    },
    {
      id: faker.string.uuid(),
      name: "Butter Croissant",
      slug: "butter-croissant",
      price: 10000,
      description: "Classic French croissant with buttery layers.",
      stock: 75,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "snack",
    },
    {
      id: faker.string.uuid(),
      name: "Oatmeal Cookie",
      slug: "oatmeal-cookie",
      price: 9000,
      description: "Crunchy oat cookies with raisins.",
      stock: 85,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "snack",
    },

    {
      id: faker.string.uuid(),
      name: "Morning Combo Bundle",
      slug: "morning-combo-bundle",
      price: 30000,
      description: "Coffee and croissant combo to start your day.",
      stock: 40,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "bundles",
    },
    {
      id: faker.string.uuid(),
      name: "Afternoon Tea Set",
      slug: "afternoon-tea-set",
      price: 32000,
      description: "Tea and snacks set for a relaxing break.",
      stock: 35,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "bundles",
    },
    {
      id: faker.string.uuid(),
      name: "Family Coffee Pack",
      slug: "family-coffee-pack",
      price: 90000,
      description: "Large pack of mixed coffee for the family.",
      stock: 20,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "bundles",
    },
    {
      id: faker.string.uuid(),
      name: "Travel Kit Bundle",
      slug: "travel-kit-bundle",
      price: 45000,
      description: "Portable coffee and snacks for on-the-go.",
      stock: 30,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "bundles",
    },
    {
      id: faker.string.uuid(),
      name: "Coffee & Beans Bundle",
      slug: "coffee-beans-bundle",
      price: 75000,
      description: "Fresh brew with a pack of beans included.",
      stock: 25,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "bundles",
    },
    {
      id: faker.string.uuid(),
      name: "All Day Starter Pack",
      slug: "all-day-starter-pack",
      price: 85000,
      description: "Full-day pack with drinks and snacks.",
      stock: 15,
      status: "available",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      category: "bundles",
    },
  ];

  const products: Product[] = [];
  for (const product of staticProducts) {
    try {
      const createdProduct = await prisma.product.create({ data: product });
      products.push(createdProduct);
    } catch (error) {
      console.error(`❌ Gagal membuat produk ${product.name}:`, error);
    }
  }

  for (const product of products.slice(0, 10)) {
    await prisma.dailyDiscount.create({
      data: {
        id: faker.string.uuid(),
        productId: product.id,
        discount: faker.number.float({ min: 5, max: 30 }),
        date: new Date(),
        createdAt: new Date(),
      },
    });
  }

  for (const user of users) {
    const cart = await prisma.cart.create({
      data: {
        id: faker.string.uuid(),
        userId: user.id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    const cartItems = [];
    for (let i = 0; i < 3; i++) {
      const product = faker.helpers.arrayElement(products);
      cartItems.push({
        id: faker.string.uuid(),
        cartId: cart.id,
        productId: product.id,
        quantity: faker.number.int({ min: 1, max: 5 }),
      });
    }

    await prisma.cartItem.createMany({ data: cartItems });

    const orderItems = cartItems.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product
          ? product.price
          : faker.number.float({ min: 10000, max: 50000 }),
      };
    });

    const totalAmount = orderItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    await prisma.order.create({
      data: {
        id: faker.string.uuid(),
        userId: user.id,
        totalAmount,
        discount: faker.number.float({ min: 0, max: totalAmount * 0.2 }),
        deliveryFee: faker.number.float({ min: 5000, max: 20000 }),
        status: faker.helpers.arrayElement(Object.values(OrderStatus)),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
        items: {
          create: orderItems.map((item) => ({
            id: faker.string.uuid(),
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
    });
  }

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
