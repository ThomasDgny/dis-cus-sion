import z from "zod";

export const searchSchema = z
  .string()
  .min(1, { message: "This field has to be filled." })
  .max(50, { message: "max character 50" })