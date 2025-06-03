import { UserRole, UserStatus } from "@prisma/client";
import { z } from "zod";

const regexLowercase = /[a-z]/;
const regexUppercase = /[A-Z]/;
const regexDigit = /\d/;
const regexSpecialChar = /[@$!%*?&]/;

export const UserSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid" }),
  username: z.string().min(2, { message: "Username minimal 2 karakter" }),
  fullName: z.string().min(2, { message: "Nama lengkap minimal 2 karakter" }),
  password: z
    .string()
    .min(8, { message: "Password minimal 8 karakter" })
    .refine((val) => regexLowercase.test(val), {
      message: "Password harus mengandung huruf kecil",
    })
    .refine((val) => regexUppercase.test(val), {
      message: "Password harus mengandung huruf besar",
    })
    .refine((val) => regexDigit.test(val), {
      message: "Password harus mengandung angka",
    })
    .refine((val) => regexSpecialChar.test(val), {
      message: "Password harus mengandung karakter spesial (@$!%*?&)",
    }),
  role: z
    .enum(Object.values(UserRole) as [string, ...string[]])
    .optional()
    .default("USER"),
  status: z
    .enum(Object.values(UserStatus) as [string, ...string[]])
    .optional()
    .default("ACTIVE"),
});

export type UserData = z.infer<typeof UserSchema>;
