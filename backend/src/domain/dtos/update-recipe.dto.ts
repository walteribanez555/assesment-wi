

import { z } from 'zod';

const updateRecipeSchema = z.object({
    id: z.number().positive("ID must be positive"),
    title: z.string().min(1, "Title is required").optional(),
    cuisine: z.string().min(1, "Cuisine is required").optional(),
    difficulty: z.enum(["Easy", "Medium", "Hard"]).optional(),
    cookTime: z.number().positive("Cook time must be positive").optional(),
    servings: z.number().positive("Servings must be positive").optional(),
    image: z.string().url("Image must be a valid URL").optional(),
    rating: z.number().min(0, "Rating must be at least 0").max(5, "Rating must be at most 5").optional(),
    ingredients: z.array(z.string().min(1, "Ingredient cannot be empty")).min(1, "At least one ingredient is required").optional(),
    description: z.string().min(1, "Description is required").optional()
});

export type UpdateRecipeDtoType = z.infer<typeof updateRecipeSchema>;

export class UpdateRecipeDto { 
    constructor(
        public readonly id: number,
        public readonly title?: string,
        public readonly cuisine?: string,
        public readonly difficulty?: "Easy" | "Medium" | "Hard",
        public readonly cookTime?: number,
        public readonly servings?: number,
        public readonly image?: string,
        public readonly rating?: number,
        public readonly ingredients?: string[],
        public readonly description?: string
    ) {}

    static update(object: { [key: string]: any }): [string?, UpdateRecipeDto?] {
        try {
            const validatedData = updateRecipeSchema.parse(object);
            return [undefined, new UpdateRecipeDto(
                validatedData.id,
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