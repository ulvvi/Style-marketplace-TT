import z from "zod";


const variant = z.object({
    name: z.string(),
    rating: z.number()
    .min(0, "Nota mínima é 0.")
    .max(5, "Nota máxima é 5.")
});


const createProductValidation = variant;

const createReviewValidation = variant.pick({
    rating: true
})


export default { 
    createProductValidation, 
    createReviewValidation};