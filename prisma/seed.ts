import { Faker, id_ID, faker as fakerEn } from "@faker-js/faker";

import {
  OrderStatus,
  PaymentStatus,
  PrismaClient,
  UserRole,
  UserStatus,
} from "@prisma/client";
import bcrypt from "bcrypt";
import { categories, rawProducts } from "./data/products";

const prisma = new PrismaClient();

const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const faker = new Faker({ locale: [id_ID] });

const roles = [UserRole.USER, UserRole.ADMIN, UserRole.SUPERADMIN];

async function main() {
  console.log("🚀 Starting seeding process...");

  console.log("🧹 Cleaning up existing data...");
  // await prisma.payment.deleteMany();
  // await prisma.orderItem.deleteMany();
  // await prisma.order.deleteMany();

  // await prisma.cartItem.deleteMany();
  // await prisma.cart.deleteMany();

  // await prisma.dailyDiscount.deleteMany();
  // await prisma.product.deleteMany();
  // await prisma.category.deleteMany();

  // await prisma.address.deleteMany();
  // await prisma.refreshToken.deleteMany();
  // await prisma.session.deleteMany();
  // await prisma.user.deleteMany();

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
      const role = i === 0 ? UserRole.ADMIN : faker.helpers.arrayElement(roles);

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
          status: UserStatus.ACTIVE,
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

    // Helper untuk format nomor urut (4 digit, padding)
    function padNumber(num: number, length: number) {
      return num.toString().padStart(length, "0");
    }

    // Helper untuk membuat orderNumber custom
    function generateOrderNumber(date: Date, index: number): string {
      const yy = date.getFullYear().toString().slice(-2);
      const mm = (date.getMonth() + 1).toString().padStart(2, "0");
      const dd = date.getDate().toString().padStart(2, "0");
      const paddedIndex = padNumber(index, 4);
      return `NOKU${yy}${mm}${dd}${paddedIndex}`;
    }

    for (let i = 0; i < orderCount; i++) {
      const orderProducts = faker.helpers.arrayElements(
        products,
        faker.number.int({ min: 1, max: 5 })
      );
      const subtotal = orderProducts.reduce((sum, p) => sum + p.price, 0);
      const discount = faker.number.float({ min: 0, max: subtotal * 0.3 });
      const deliveryFee = faker.number.float({ min: 5000, max: 20000 });
      const totalAmount = subtotal - discount + deliveryFee;

      const createdAt = faker.date.past({ years: 1 });
      const updatedAt = faker.date.recent();
      const orderNumber = generateOrderNumber(createdAt, i + 1);

      const order = await prisma.order.create({
        data: {
          id: faker.string.uuid(),
          orderNumber,
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
            "NOKU Standard",
            "NOKU Express",
            "NOKU Same Day",
            "NOKU Next Day",
          ]),
          trackingNumber: faker.helpers.maybe(() =>
            faker.string.alphanumeric(12)
          ),
          customerNotes: faker.helpers.maybe(() => fakerEn.lorem.sentence()),
          createdAt,
          updatedAt,
        },
      });

      // Create shipping
      const shipping = await prisma.shipping.create({
        data: {
          id: faker.string.uuid(),
          orderId: order.id,
          addressId: order.addressId,
          shippingFee: deliveryFee,
          trackingNumber: faker.string.alphanumeric(12),
          estimateDelivery: faker.date.soon({ days: 3, refDate: createdAt }),
          method: faker.helpers.arrayElement([
            "Standard",
            "Express",
            "Next Day",
          ]),
          status: faker.helpers.arrayElement([
            "PENDING",
            "SHIPPED",
            "DELIVERED",
          ]),
          createdAt,
          updatedAt,
        },
      });

      // Create order items
      await Promise.all(
        orderProducts.map((product) =>
          prisma.orderItem.create({
            data: {
              id: faker.string.uuid(),
              orderId: order.id,
              productId: product.id,
              quantity: faker.number.int({ min: 1, max: 3 }),
              price: product.price,
              discount: faker.number.float({
                min: 0,
                max: product.price * 0.2,
              }),
            },
          })
        )
      );

      // Create timeline
      const timelines = await Promise.all([
        prisma.orderTimeline.create({
          data: {
            id: faker.string.uuid(),
            orderId: order.id,
            status: "Order Placed",
            description: "Your order has been placed.",
            date: createdAt,
          },
        }),
        prisma.orderTimeline.create({
          data: {
            id: faker.string.uuid(),
            orderId: order.id,
            status: "Processing",
            description: "Your order is being processed.",
            date: faker.date.soon({ days: 0.5, refDate: createdAt }),
          },
        }),
        prisma.orderTimeline.create({
          data: {
            id: faker.string.uuid(),
            orderId: order.id,
            status: "Shipped",
            description: "Your order has been shipped.",
            date: faker.date.soon({ days: 1, refDate: createdAt }),
          },
        }),
        prisma.orderTimeline.create({
          data: {
            id: faker.string.uuid(),
            orderId: order.id,
            status: "Delivered",
            description: "Your order has been delivered.",
            date: faker.helpers.maybe(() =>
              faker.date.soon({ days: 2, refDate: createdAt })
            ),
          },
        }),
      ]);

      // Create payment if status is PAID
      let payment = null;
      if (order.paymentStatus === "PAID") {
        payment = await prisma.payment.create({
          data: {
            id: faker.string.uuid(),
            orderId: order.id,
            paymentMethod: faker.helpers.arrayElement([
              "credit_card",
              "bank_transfer",
              "e_wallet",
            ]),
            transactionId: faker.string.alphanumeric(16),
            transactionTime: createdAt,
            transactionStatus: "settlement",
            grossAmount: totalAmount,
            fraudStatus: "accept",
            currency: "IDR",
            bank: faker.helpers.arrayElement(["bca", "bni", "bri", "mandiri"]),
            vaNumber: faker.helpers.maybe(() =>
              fakerEn.finance.accountNumber(16)
            ),
            cardType: faker.helpers.maybe(() =>
              faker.helpers.arrayElement(["visa", "mastercard"])
            ),
            maskedCard: faker.helpers.maybe(() =>
              fakerEn.finance.creditCardNumber()
            ),
            approvalCode: faker.helpers.maybe(() =>
              faker.string.alphanumeric(8)
            ),
            settlementTime: faker.date.soon({ days: 1, refDate: createdAt }),
            createdAt,
            updatedAt,
          },
        });
      }

      // Update order with foreign keys
      await prisma.order.update({
        where: { id: order.id },
        data: {
          shippingId: shipping.id,
          paymentId: payment?.id ?? undefined,
          orderTimelineId: timelines[0].id, // Optional main timeline
        },
      });
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
