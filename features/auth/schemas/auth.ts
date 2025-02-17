import { z } from "zod";

const statusSchema = z.union([z.literal("active"), z.literal("inactive")]);

const roleSchema = z.union([
  z.literal("super admin"),
  z.literal("admin"),
  z.literal("user"),
]);

const regexLowercase = /[a-z]/;
const regexUppercase = /[A-Z]/;
const regexDigit = /\d/;
const regexSpecialChar = /[@$!%*?&]/;

export const registrationSchema = z.object({
  email: z.string().email({ message: "Invalid email format" }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" }),
  fullName: z
    .string()
    .min(2, { message: "Fullname must be at least 2 characters" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .refine((value) => regexLowercase.test(value), {
      message: "Password must contain at least one lowercase letter",
    })
    .refine((value) => regexUppercase.test(value), {
      message: "Password must contain at least one uppercase letter",
    })
    .refine((value) => regexDigit.test(value), {
      message: "Password must contain at least one number",
    })
    .refine((value) => regexSpecialChar.test(value), {
      message: "Password must contain at least one special character",
    }),
  role: roleSchema.optional(),
  status: statusSchema.optional(),
});

export type RegistrationData = z.infer<typeof registrationSchema>;

export const loginSchema = z.object({
  login: z.string().min(1, { message: "Please enter your email or username" }),
  password: z
    .string()
    .min(1, { message: "Please enter your password" })
    .min(8, {
      message: "Password must be at least 8 characters long",
    }),
});

export type LoginData = z.infer<typeof loginSchema>;
