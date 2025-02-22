import { z } from "zod";

const menuStatusSchema = z.union([z.literal("active"), z.literal("inactive")]);
export type MenuStatus = z.infer<typeof menuStatusSchema>;
