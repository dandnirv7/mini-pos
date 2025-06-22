import { faker } from "@faker-js/faker";
import { UserRole, UserStatus } from "@prisma/client";
import { hashPassword } from "../utils/hashPassword";

export const getFixedUsers = async () => [
  {
    id: faker.string.uuid(),
    email: "admin@example.com",
    username: "admin",
    firstName: "Admin",
    lastName: "User",
    password: await hashPassword("Password123!"),
    phoneNumber: "081234567890",
    role: UserRole.ADMIN,
    status: UserStatus.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: faker.string.uuid(),
    email: "user@example.com",
    username: "user",
    firstName: "Regular",
    lastName: "User",
    password: await hashPassword("Password123!"),
    phoneNumber: "081234567891",
    role: UserRole.USER,
    status: UserStatus.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: faker.string.uuid(),
    email: "superadmin@example.com",
    username: "superadmin",
    firstName: "Super",
    lastName: "Admin",
    password: await hashPassword("Password123!"),
    phoneNumber: "081234567892",
    role: UserRole.SUPERADMIN,
    status: UserStatus.ACTIVE,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
