import * as z from "zod";

export const SettingNewFormSchema = z
  .object({
    name: z.optional(
      z
        .string()
        .min(4, { message: "Username must contain atleast 4 character" })
    ),
    email: z.string().email(),
    password: z.optional(
      z
        .string()
        .min(8, { message: "Password must contain atleast 8 characters" })
    ),
    newPassword: z.optional(
      z
        .string()
        .min(8, { message: "Password must contain atleast 8 characters" })
    ),
    image: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean().default(false)),
  })
  .refine(
    ({ password, newPassword }) => {
      if (password && !newPassword) {
        return false;
      }
      return true;
    },
    { message: "New Password required", path: ["newPassword"] }
  );
