import { faker } from "@faker-js/faker";
import {
  OrderStatus,
  PaymentStatus,
  PrismaClient,
  Product,
} from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const roles = ["USER", "ADMIN", "SUPERADMIN", "CASHIER"];

async function main() {
  console.log("🚀 Starting seeding process...");

  console.log("🧹 Cleaning up existing data...");
  await prisma.payment.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.category.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.cart.deleteMany();
  await prisma.dailyDiscount.deleteMany();
  await prisma.product.deleteMany();
  await prisma.address.deleteMany();
  await prisma.refreshToken.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();

  console.log("👥 Creating users...");
  const users = await Promise.all(
    Array.from({ length: 15 }).map(async (_, i) => {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      const password = await hashPassword("Password123!");
      const email =
        i === 0
          ? "admin@example.com"
          : faker.internet.email({ firstName, lastName }).toLowerCase();
      const role = i === 0 ? "ADMIN" : faker.helpers.arrayElement(roles);

      const user = await prisma.user.create({
        data: {
          id: faker.string.uuid(),
          fullName: `${firstName} ${lastName}`,
          username: faker.internet
            .username({ firstName, lastName })
            .toLowerCase(),
          email,
          password,
          role,
          status: "ACTIVE",
          phoneNumber: faker.phone.number(),
          createdAt: faker.date.past({ years: 1 }),
          updatedAt: faker.date.recent(),
        },
      });

      const addressCount = faker.number.int({ min: 1, max: 3 });
      for (let j = 0; j < addressCount; j++) {
        await prisma.address.create({
          data: {
            id: faker.string.uuid(),
            userId: user.id,
            street: faker.location.streetAddress(),
            city: faker.location.city(),
            state: faker.location.state(),
            postalCode: faker.location.zipCode(),
            phoneNumber: faker.phone.number(),
            createdAt: faker.date.past(),
            updatedAt: faker.date.recent(),
          },
        });
      }

      return user;
    })
  );

  console.log("🏷️ Creating categories...");

  const categories = [
    {
      name: "Coffee",
      slug: "coffee",
      description: "Premium coffee selections",
    },
    { name: "Tea", slug: "tea", description: "Fine tea collections" },
    {
      name: "Beans",
      slug: "beans",
      description: "Coffee beans from various regions",
    },
    {
      name: "Snacks",
      slug: "snacks",
      description: "Delicious snacks to accompany your drink",
    },
    {
      name: "Bundles",
      slug: "bundles",
      description: "Special product bundles",
    },
  ];

  const createdCategories = await Promise.all(
    categories.map((category) =>
      prisma.category.create({
        data: {
          id: faker.string.uuid(),
          name: category.name,
          slug: category.slug,
          description: category.description,
          imageUrl: faker.image.urlLoremFlickr({ category: "food" }),
          createdAt: faker.date.past({ years: 1 }),
          updatedAt: faker.date.recent(),
        },
      })
    )
  );

  const categoryMap = new Map<string, string>();
  createdCategories.forEach((cat) => {
    categoryMap.set(cat.slug.toLowerCase(), cat.id);
  });

  function getCategoryIdByProductName(name: string): string {
    const lower = name.toLowerCase();

    if (
      lower.includes("coffee") ||
      lower.includes("latte") ||
      lower.includes("espresso") ||
      lower.includes("americano") ||
      lower.includes("cold brew") ||
      lower.includes("macchiato")
    ) {
      return categoryMap.get("coffee")!;
    }

    if (lower.includes("tea") || lower.includes("matcha")) {
      return categoryMap.get("tea")!;
    }

    if (lower.includes("beans")) {
      return categoryMap.get("beans")!;
    }

    if (
      lower.includes("croissant") ||
      lower.includes("danish") ||
      lower.includes("muffin") ||
      lower.includes("bread") ||
      lower.includes("cookie")
    ) {
      return categoryMap.get("snacks")!;
    }

    if (
      lower.includes("bundle") ||
      lower.includes("pack") ||
      lower.includes("kit") ||
      lower.includes("set")
    ) {
      return categoryMap.get("bundles")!;
    }

    throw new Error(`No category match for product: ${name}`);
  }

  console.log("🛍️ Creating static products...");

  const rawProducts: Omit<
    Product,
    "deletedAt" | "imageUrl" | "categoryId" | "weight"
  >[] = [
    {
      id: faker.string.uuid(),
      name: "House Blend Coffee",
      slug: "house-blend-coffee",
      price: 18000,
      description: "Smooth and balanced house blend coffee.",
      stock: 100,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Espresso Roast",
      slug: "espresso-roast",
      price: 20000,
      description: "Dark roasted espresso with bold flavor.",
      stock: 90,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Caramel Macchiato",
      slug: "caramel-macchiato",
      price: 25000,
      description: "Espresso with steamed milk and caramel drizzle.",
      stock: 80,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Mocha Latte",
      slug: "mocha-latte",
      price: 26000,
      description: "Chocolate flavored coffee with steamed milk.",
      stock: 70,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Vanilla Cold Brew",
      slug: "vanilla-cold-brew",
      price: 24000,
      description: "Cold brew coffee with vanilla syrup.",
      stock: 60,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Americano",
      slug: "americano",
      price: 17000,
      description: "Espresso diluted with hot water.",
      stock: 110,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },

    {
      id: faker.string.uuid(),
      name: "Earl Grey Tea",
      slug: "earl-grey-tea",
      price: 15000,
      description: "Fragrant black tea with bergamot citrus flavor.",
      stock: 70,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Chamomile Tea",
      slug: "chamomile-tea",
      price: 14000,
      description: "Relaxing herbal tea with chamomile flowers.",
      stock: 60,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Matcha Latte",
      slug: "matcha-latte",
      price: 22000,
      description: "Smooth Japanese green tea blended with milk.",
      stock: 50,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Lemongrass Ginger Tea",
      slug: "lemongrass-ginger-tea",
      price: 16000,
      description: "Soothing tea with lemongrass and ginger blend.",
      stock: 55,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Mint Green Tea",
      slug: "mint-green-tea",
      price: 15000,
      description: "Refreshing green tea with mint leaves.",
      stock: 60,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Thai Iced Tea",
      slug: "thai-iced-tea",
      price: 19000,
      description: "Sweet and creamy spiced iced tea.",
      stock: 45,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },

    {
      id: faker.string.uuid(),
      name: "Ethiopian Coffee Beans",
      slug: "ethiopian-coffee-beans",
      price: 50000,
      description: "Premium whole coffee beans from Ethiopia.",
      stock: 80,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Colombian Coffee Beans",
      slug: "colombian-coffee-beans",
      price: 48000,
      description: "Medium-roast coffee beans from Colombia.",
      stock: 75,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Sumatra Mandheling Beans",
      slug: "sumatra-mandheling-beans",
      price: 52000,
      description: "Full-bodied beans with low acidity.",
      stock: 60,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Guatemala Antigua Beans",
      slug: "guatemala-antigua-beans",
      price: 51000,
      description: "Nutty, chocolaty beans with smooth finish.",
      stock: 55,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Brazil Santos Beans",
      slug: "brazil-santos-beans",
      price: 47000,
      description: "Light, sweet, and balanced coffee beans.",
      stock: 65,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Kenyan AA Beans",
      slug: "kenyan-aa-beans",
      price: 53000,
      description: "Bright and fruity coffee from Kenya.",
      stock: 50,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },

    {
      id: faker.string.uuid(),
      name: "Almond Croissant",
      slug: "almond-croissant",
      price: 12000,
      description: "Flaky pastry filled with almond cream.",
      stock: 60,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Cheese Danish",
      slug: "cheese-danish",
      price: 13000,
      description: "Soft pastry with sweet cream cheese filling.",
      stock: 55,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Chocolate Muffin",
      slug: "chocolate-muffin",
      price: 11000,
      description: "Rich and moist chocolate muffin.",
      stock: 70,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Banana Bread",
      slug: "banana-bread",
      price: 12500,
      description: "Soft banana-flavored cake loaf.",
      stock: 65,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Butter Croissant",
      slug: "butter-croissant",
      price: 10000,
      description: "Classic French croissant with buttery layers.",
      stock: 75,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Oatmeal Cookie",
      slug: "oatmeal-cookie",
      price: 9000,
      description: "Crunchy oat cookies with raisins.",
      stock: 85,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },

    {
      id: faker.string.uuid(),
      name: "Morning Combo Bundle",
      slug: "morning-combo-bundle",
      price: 30000,
      description: "Coffee and croissant combo to start your day.",
      stock: 40,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Afternoon Tea Set",
      slug: "afternoon-tea-set",
      price: 32000,
      description: "Tea and snacks set for a relaxing break.",
      stock: 35,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Family Coffee Pack",
      slug: "family-coffee-pack",
      price: 90000,
      description: "Large pack of mixed coffee for the family.",
      stock: 20,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Travel Kit Bundle",
      slug: "travel-kit-bundle",
      price: 45000,
      description: "Portable coffee and snacks for on-the-go.",
      stock: 30,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "Coffee & Beans Bundle",
      slug: "coffee-beans-bundle",
      price: 75000,
      description: "Fresh brew with a pack of beans included.",
      stock: 25,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
    {
      id: faker.string.uuid(),
      name: "All Day Starter Pack",
      slug: "all-day-starter-pack",
      price: 85000,
      description: "Full-day pack with drinks and snacks.",
      stock: 15,
      status: "AVAILABLE",
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    },
  ];

  const productsWithCategory = rawProducts.map((product) => ({
    ...product,
    categoryId: getCategoryIdByProductName(product.name),
  }));

  const products = await Promise.all(
    productsWithCategory.map((product) =>
      prisma.product.create({
        data: product,
      })
    )
  );

  console.log("🏷️ Creating daily discounts...");
  await Promise.all(
    products.slice(0, 10).map((product) =>
      prisma.dailyDiscount.create({
        data: {
          id: faker.string.uuid(),
          productId: product.id,
          discount: faker.number.float({ min: 5, max: 50 }),
          startDate: faker.date.recent(),
          endDate: faker.date.soon({ days: 7 }),
          createdAt: new Date(),
        },
      })
    )
  );

  console.log("🛒 Creating carts and orders...");
  for (const user of users) {
    const cart = await prisma.cart.create({
      data: {
        id: faker.string.uuid(),
        userId: user.id,
        createdAt: faker.date.recent(),
        updatedAt: faker.date.recent(),
      },
    });

    const cartItemsCount = faker.number.int({ min: 2, max: 5 });
    const cartProducts = faker.helpers.arrayElements(products, cartItemsCount);

    await prisma.cartItem.createMany({
      data: cartProducts.map((product) => ({
        id: faker.string.uuid(),
        cartId: cart.id,
        productId: product.id,
        quantity: faker.number.int({ min: 1, max: 3 }),
      })),
    });

    const orderCount = faker.number.int({ min: 1, max: 3 });
    const userAddresses = await prisma.address.findMany({
      where: { userId: user.id },
    });

    for (let i = 0; i < orderCount; i++) {
      const orderProducts = faker.helpers.arrayElements(
        products,
        faker.number.int({ min: 1, max: 5 })
      );
      const subtotal = orderProducts.reduce((sum, p) => sum + p.price, 0);
      const discount = faker.number.float({ min: 0, max: subtotal * 0.3 });
      const deliveryFee = faker.number.float({ min: 5000, max: 20000 });
      const totalAmount = subtotal - discount + deliveryFee;

      const order = await prisma.order.create({
        data: {
          id: faker.string.uuid(),
          userId: user.id,
          addressId: faker.helpers.arrayElement(userAddresses).id,
          totalAmount,
          discount,
          deliveryFee,
          status: faker.helpers.arrayElement(Object.values(OrderStatus)),
          paymentStatus: faker.helpers.arrayElement(
            Object.values(PaymentStatus)
          ),
          shippingMethod: faker.helpers.arrayElement([
            "Standard",
            "Express",
            "Next Day",
          ]),
          trackingNumber: faker.helpers.maybe(() =>
            faker.string.alphanumeric(12)
          ),
          customerNotes: faker.helpers.maybe(() => faker.lorem.sentence()),
          createdAt: faker.date.past({ years: 1 }),
          updatedAt: faker.date.recent(),
          items: {
            create: orderProducts.map((product) => ({
              id: faker.string.uuid(),
              productId: product.id,
              quantity: faker.number.int({ min: 1, max: 3 }),
              price: product.price,
              discount: faker.number.float({
                min: 0,
                max: product.price * 0.2,
              }),
            })),
          },
        },
      });

      if (order.paymentStatus === "PAID") {
        await prisma.payment.create({
          data: {
            id: faker.string.uuid(),
            orderId: order.id,
            paymentMethod: faker.helpers.arrayElement([
              "credit_card",
              "bank_transfer",
              "e_wallet",
            ]),
            transactionId: faker.string.alphanumeric(16),
            transactionTime: order.createdAt,
            transactionStatus: "settlement",
            grossAmount: order.totalAmount,
            fraudStatus: "accept",
            currency: "IDR",
            bank: faker.helpers.arrayElement(["bca", "bni", "bri", "mandiri"]),
            vaNumber: faker.helpers.maybe(() =>
              faker.finance.accountNumber(16)
            ),
            cardType: faker.helpers.maybe(() =>
              faker.helpers.arrayElement(["visa", "mastercard"])
            ),
            maskedCard: faker.helpers.maybe(() =>
              faker.finance.creditCardNumber()
            ),
            approvalCode: faker.helpers.maybe(() =>
              faker.string.alphanumeric(8)
            ),
            settlementTime: faker.date.soon({
              days: 1,
              refDate: order.createdAt,
            }),
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
          },
        });
      }
    }
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
