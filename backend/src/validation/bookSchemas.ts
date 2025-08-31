import { z } from "zod";

export const IdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export const CreateBookSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200),
  author: z.string().trim().min(1, "Author is required").max(200),
});

export const UpdateBookSchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    author: z.string().trim().min(1).max(200).optional(),
    read: z.boolean().optional(),
  })
  .refine(
    (val) =>
      typeof val.title !== "undefined" ||
      typeof val.author !== "undefined" ||
      typeof val.read !== "undefined",
    { message: "At least one field must be provided" }
  );