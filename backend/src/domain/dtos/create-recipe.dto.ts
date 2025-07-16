
import { z } from 'zod';

const createRecipeSchema = z.object({
    title: z.string().min(1, "Title is required"),
    cuisine: z.string().min(1, "Cuisine is required"),
    difficulty: z.enum(["Easy", "Medium", "Hard"]),
    cookTime: z.number().positive("Cook time must be positive"),
    servings: z.number().positive("Servings must be positive"),
    image: z.string().url("Image must be a valid URL"),
    rating: z.number().min(0, "Rating must be at least 0").max(5, "Rating must be at most 5"),
    ingredients: z.array(z.string().min(1, "Ingredient cannot be empty")).min(1, "At least one ingredient is required"),
    description: z.string().min(1, "Description is required")
});

export type CreateRecipeDtoType = z.infer<typeof createRecipeSchema>;

export class CreateRecipeDto {
    constructor(
        public readonly title: string,
        public readonly cuisine: string,
        public readonly difficulty: "Easy" | "Medium" | "Hard",
        public readonly cookTime: number,
        public readonly servings: number,
        public readonly image: string,
        public readonly rating: number,
        public readonly ingredients: string[],
        public readonly description: string
    ) {}

    static create(object: { [key: string]: any }): [string?, CreateRecipeDto?] {
        try {
            const validatedData = createRecipeSchema.parse(object);
            return [undefined, new CreateRecipeDto(
                validatedData.title,
                validatedData.cuisine,
                validatedData.difficulty,
                validatedData.cookTime,
                validatedData.servings,
                validatedData.image,
                validatedData.rating,
                validatedData.ingredients,
                validatedData.description
            )];
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errorMessages = error.issues.map((err: any) => `${err.path.join('.')}: ${err.message}`).join(', ');
                return [errorMessages];
            }
            return ['Unknown validation error'];
        }
    }
}