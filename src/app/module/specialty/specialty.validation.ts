import z from "zod";

const createSpecialtyZodSchema = z.object({
    title : z.string("Title is requried"),
    description : z.string().optional(),
})

export const speacialtyValidation = {
    createSpecialtyZodSchema
}