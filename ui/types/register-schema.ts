import * as z from "zod";
export const RegisterSchema = z.object({
  name: z.string().min(4, {
    message: "Name must have 4 characters",
  }),
  email: z.string().email(),
  password: z.string().min(8, {
    message: "password must be 8 character long",
  }),
});
