import { getFixedUsers } from "./data/users";
import { fakerID_ID as faker } from "@faker-js/faker";
import {
  rawAccessorySpecs,
  rawCategories,
  rawCoffeeSpecs,
  rawEquipmentSpecs,
  rawProducts,
} from "./data/products";
import { ProductStatus } from "@prisma/client";
import { addDays, subDays } from "date-fns";
import { prisma } from "../lib/db";
import { seedCarts } from "./data/carts";
import { seedOrders } from "./data/orders";

async function main() {
  console.log("🧑 Seeding fixed users...");

  const fixedUsers = await getFixedUsers();

  for (const user of fixedUsers) {
    const createdUser = await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: user,
    });

    await prisma.address.create({
      data: {
        id: faker.string.uuid(),
        street: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        country: "Indonesia",
        postalCode: faker.location.zipCode(),
        phoneNumber: user.phoneNumber,
        isDefault: true,
        userId: createdUser.id,
      },
    });
  }

  console.log("✅ Seeding categories...");
  const createdCategories = await Promise.all(
    rawCategories.map((cat) => prisma.category.create({ data: cat }))
  );

  const getCategoryId = (name: string) =>
    createdCategories.find((cat) => cat.name === name)?.id;

  console.log("📦 Seeding products...");
  await Promise.all(
    rawProducts.map(async (product, index) => {
      const createdProduct = await prisma.product.create({
        data: {
          id: product.id,
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          imageUrl: product.image,
          stock: product.stock,
          categoryId: getCategoryId(product.category) ?? "",
          status: ProductStatus.AVAILABLE,
          createdAt: faker.date.past(),
          updatedAt: faker.date.recent(),
        },
      });

      if (product.category === "beans") {
        const spec = rawCoffeeSpecs[index % rawCoffeeSpecs.length];
        await prisma.coffeeSpec.create({
          data: {
            productId: createdProduct.id,
            region: spec.region,
            altitude: spec.altitude,
            processing: spec.processing,
            flavorNotes: spec.flavorNotes,
            body: spec.body,
            acidity: spec.acidity,
            coffeeWeight: spec.coffeeWeight,
          },
        });
      } else if (product.category === "equipment") {
        const spec = rawEquipmentSpecs[index % rawEquipmentSpecs.length];
        await prisma.equipmentSpec.create({
          data: {
            productId: createdProduct.id,
            power: spec.power,
            material: spec.material,
            dimensions: spec.dimensions,
            weightEquip: spec.weightEquip,
            voltage: spec.voltage,
          },
        });
      } else if (product.category === "accessories") {
        const spec = rawAccessorySpecs[index % rawAccessorySpecs.length];
        await prisma.accessorySpec.create({
          data: {
            productId: createdProduct.id,
            compatibility: spec.compatibility,
            color: spec.color,
            capacity: spec.capacity,
          },
        });
      }
    })
  );

  const dailyDealProducts = rawProducts
    .filter((p) => p.category === "beans")
    .slice(0, 3);

  console.log("🔥 Seeding daily discounts...");
  await Promise.all(
    dailyDealProducts.map(async (product) => {
      await prisma.dailyDiscount.create({
        data: {
          productId: product.id,
          discount: 15 + Math.floor(Math.random() * 10),
          startDate: subDays(new Date(), 1),
          endDate: addDays(new Date(), 1),
        },
      });
    })
  );

  console.log("💖 Seeding wishlist...");
  await prisma.wishlist.createMany({
    data: [
      {
        userId: fixedUsers[1].id,
        productId: rawProducts[0].id,
      },
      {
        userId: fixedUsers[1].id,
        productId: rawProducts[1].id,
      },
    ],
  });

  console.log("📝 Seeding reviews...");
  await prisma.review.createMany({
    data: [
      {
        userId: fixedUsers[1].id,
        productId: rawProducts[0].id,
        rating: 4.5,
        comment: "Great flavor and smooth finish.",
      },
      {
        userId: fixedUsers[1].id,
        productId: rawProducts[2].id,
        rating: 4.0,
        comment: "A bit too earthy for me, but good quality.",
      },
    ],
  });

  console.log("🛒 Seeding carts and orders...");

  const users = await prisma.user.findMany();
  const products = await prisma.product.findMany();
  const addresses = await prisma.address.findMany();

  await seedCarts(users, products);
  await seedOrders(users, products, addresses);
}

main()
  .then(() => console.log("🌱 Seeding complete"))
  .catch((e) => {
    console.error("❌ Seeding failed", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
