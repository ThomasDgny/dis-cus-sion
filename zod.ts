import z from "zod";

export const searchSchema = z
  .string()
  .min(1, { message: "This field has to be filled." })
  .max(50, { message: "max character 50" });

export const userBio = z
  .string()
  .min(0, { message: "This field has to be filled." })
  .max(250, { message: "Your bio cannot be more than 250 characters" });

export const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters long" }),
});


export const signUpFormSchema = z.object({
  name: z
  .string()
  .min(1, { message: "This field has to be filled." })
  .max(30, { message: "Your user name cannot be more than 30 characters" }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(6, { message: "Password must be at least 8 characters long" }),
});

