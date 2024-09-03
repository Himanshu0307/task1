import * as z from "zod";

export const AddOrderSchema = z.object({
  itemId: z.string().min(1, "Select a dish"),
  qty: z.coerce.number().nonnegative(),
});
