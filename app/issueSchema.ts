import { z } from "zod";

export const issueSchema = z.object({
  title: z
    .string()
    .min(1, "Title is Required!")
    .max(255, "This title is too long, use shorter title"),

  description: z.string().min(1, "Description is Requiered!"),
});
