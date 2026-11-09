import { z } from "zod";

export const createAccountSchema = z
  .object({
    email: z
      .string()
      .trim()
      .min(1, "Email is required")
      .pipe(z.email("Invalid email address")),
    full_name: z.string().optional(),
    password: z.string().min(8, "At least 8 characters."),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agree: z.boolean().refine((value) => value === true, {
      message: "You must agree to continue.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type CreateAccountFormValues = z.infer<typeof createAccountSchema>;
