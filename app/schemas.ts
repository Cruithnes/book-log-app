import { z } from "zod";

export const StatusEnum = z.enum(["Read", "Planing", "Reading", "Dropped"]);

export const NewBookSchema = z.object({
  title: z.string().nonempty("Title is required"),
  author: z.string().nonempty("Author is required"),
  description: z.string().optional().nullable(),
  status: StatusEnum,
  review: z.string().optional().nullable(),
  rating: z.coerce
    .number({ invalid_type_error: "Rating must be a number" })
    .min(0, "Min is 0")
    .max(10, "Max is 10")
    .optional()
    .nullable(),
  page: z.coerce
    .number({ invalid_type_error: "Page count must be a number" })
    .int("Page must be an integer")
    .positive("Must be positive")
    .optional()
    .nullable(),
  imageUrl: z.string().optional().nullable(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
});

export type NewBookInput = z.infer<typeof NewBookSchema>;

export const EditBookSchema = z.object({
  title: z.string().nonempty("Title is required"),
  author: z.string().nonempty("Author is required"),
  description: z.string().optional().nullable(),
  status: StatusEnum,
  review: z.string().optional().nullable(),
  rating: z.coerce.number().min(0).max(10).optional().nullable(),
  page: z.coerce.number().int().positive().optional().nullable(),
  imageUrl: z.string().optional().nullable(),
  startDate: z.string().optional().nullable(),
  endDate: z.string().optional().nullable(),
});

export type EditBookInput = z.infer<typeof EditBookSchema>;

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

export const signUpSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
})
