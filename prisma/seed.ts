import { faker } from "@faker-js/faker";
import { Menu, MenuCategory, PrismaClient, User } from "@prisma/client";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

const hashPassword = async (password: string): Promise<string> => {
  if (!password) {
    throw new Error("Password parameter is missing");
  }

  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

const users: Omit<User, "deletedAt" | "resetToken" | "resetTokenExpires">[] =
  Array.from({ length: 20 }, () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    return {
      id: faker.string.uuid(),
      fullName: `${firstName} ${lastName}`,
      username: faker.internet
        .username({ firstName, lastName })
        .toLocaleLowerCase(),
      email: faker.internet.email({ firstName }).toLocaleLowerCase(),
      password: `${firstName}123`,
      status: faker.helpers.arrayElement(["active", "inactive"]),
      role: faker.helpers.arrayElement([
        "superadmin",
        "admin",
        "cashier",
        "user",
      ]),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };
  });

const menuCategories: Omit<MenuCategory, "deletedAt">[] = [
  {
    id: faker.string.uuid(),
    name: "food",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  },
  {
    id: faker.string.uuid(),
    name: "beverages",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  },
];

const menus: Omit<Menu, "deletedAt" | "imageUrl">[] = [
  {
    id: faker.string.uuid(),
    name: "Espresso",
    slug: "espresso",
    price: 15900,
    description:
      "Espresso is a strong, rich coffee made by forcing hot water through finely ground coffee beans. It's a concentrated coffee that serves as the base for other drinks like lattes and cappuccinos.",
    stock: 120,
    status: "available",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    menuCategoryId: menuCategories[1].id,
  },
  {
    id: faker.string.uuid(),
    name: "Cappuccino",
    slug: "cappuccino",
    price: 24900,
    description:
      "Cappuccino is a delightful espresso-based drink with equal parts espresso, steamed milk, and foam. It's creamy, frothy, and a perfect balance of rich coffee and smooth milk.",
    stock: 80,
    status: "available",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    menuCategoryId: menuCategories[1].id,
  },
  {
    id: faker.string.uuid(),
    name: "Latte",
    slug: "latte",
    price: 27900,
    description:
      "A Latte is a coffee drink made with espresso and steamed milk, topped with a small amount of foam. It's a smooth, creamy coffee drink that's perfect for those who love a mild coffee flavor with a touch of sweetness.",
    stock: 100,
    status: "available",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    menuCategoryId: menuCategories[1].id,
  },
  {
    id: faker.string.uuid(),
    name: "Bagel with Cream Cheese",
    slug: "bagel-with-cream-cheese",
    price: 15900,
    description:
      "A freshly toasted bagel served with a generous spread of creamy, rich cream cheese. It’s a simple, yet satisfying breakfast or snack, perfect to pair with any of our coffee drinks for a complete experience.",
    stock: 0,
    status: "out of stock",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    menuCategoryId: menuCategories[0].id,
  },
  {
    id: faker.string.uuid(),
    name: "Croissant",
    slug: "croissant",
    price: 12900,
    description:
      "A warm, flaky, buttery croissant that melts in your mouth. This classic French pastry pairs perfectly with any of our coffee drinks, making it a perfect option for breakfast or a mid-day snack.",
    stock: 100,
    status: "available",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    menuCategoryId: menuCategories[0].id,
  },
  {
    id: faker.string.uuid(),
    name: "Chocolate Chip Cookie",
    slug: "chocolate-chip-cookie",
    price: 10900,
    description:
      "Soft and chewy chocolate chip cookie, baked to perfection with gooey chocolate chunks in every bite. It’s the perfect sweet treat to enjoy alongside a hot or iced coffee.",
    stock: 80,
    status: "available",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    menuCategoryId: menuCategories[0].id,
  },
  {
    id: faker.string.uuid(),
    name: "Blueberry Muffin",
    slug: "blueberry-muffin",
    price: 14900,
    description:
      "A moist and fluffy muffin packed with fresh blueberries. Each bite offers a burst of fruity flavor, making it a perfect pairing with your favorite coffee drink for breakfast or a midday snack.",
    stock: 90,
    status: "available",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    menuCategoryId: menuCategories[0].id,
  },
  {
    id: faker.string.uuid(),
    name: "Caramel Macchiato",
    slug: "caramel-macchiato",
    price: 32900,
    description:
      "A Caramel Macchiato is a delicious espresso drink made with steamed milk, espresso, and caramel syrup. It's a sweet, creamy beverage that adds a perfect touch of warmth and sweetness, making it a popular choice among coffee lovers.",
    stock: 40,
    status: "available",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    menuCategoryId: menuCategories[1].id,
  },
  {
    id: faker.string.uuid(),
    name: "Vanilla Latte",
    slug: "vanilla-latte",
    price: 29900,
    description:
      "A smooth and creamy vanilla latte made with rich espresso, steamed milk, and a touch of vanilla syrup. It’s a comforting and slightly sweet coffee drink that’s perfect for a cozy moment.",
    stock: 70,
    status: "available",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    menuCategoryId: menuCategories[1].id,
  },
  {
    id: faker.string.uuid(),
    name: "Iced Coffee",
    slug: "iced-coffee",
    price: 24900,
    description:
      "Iced Coffee is brewed coffee served chilled over ice, offering a refreshing and bold taste. It’s a perfect drink for warm weather, providing the kick of coffee in a refreshing, cool form.",
    stock: 70,
    status: "available",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    menuCategoryId: menuCategories[1].id,
  },
  {
    id: faker.string.uuid(),
    name: "Affogato",
    slug: "affogato",
    price: 34900,
    description:
      "Affogato is a dessert-like espresso drink where a shot of hot espresso is poured over a scoop of creamy vanilla ice cream. The combination of hot and cold creates a delightful contrast that coffee and dessert lovers will enjoy.",
    stock: 30,
    status: "available",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    menuCategoryId: menuCategories[1].id,
  },
  {
    id: faker.string.uuid(),
    name: "Mocha",
    slug: "mocha",
    price: 32900,
    description:
      "Mocha combines rich espresso with creamy steamed milk and a shot of chocolate syrup, creating a delightful balance between the bitterness of coffee and the sweetness of chocolate. It's perfect for those who love chocolate and coffee together.",
    stock: 50,
    status: "available",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
    menuCategoryId: menuCategories[1].id,
  },
];

async function main() {
  for (const user of users) {
    const hashedPassword = await hashPassword(user.password);

    await prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  for (const category of menuCategories) {
    await prisma.menuCategory.create({
      data: category,
    });
  }

  for (const menu of menus) {
    await prisma.menu.create({
      data: {
        ...menu,
        menuCategoryId:
          menuCategories[Math.floor(Math.random() * menuCategories.length)].id,
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
