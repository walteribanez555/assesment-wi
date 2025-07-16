import { z } from 'zod';

const recipeQuerySchema = z.object({
    // Pagination
    page: z.number().min(1).default(1),
    limit: z.number().min(1).max(100).default(10),
    
    // Search
    search: z.string().optional(), // Search in title, ingredients, cuisine
    
    // Filters
    cuisine: z.string().optional(),
    difficulty: z.enum(["Easy", "Medium", "Hard"]).optional(),
    cookTimeMin: z.number().min(0).optional(),
    cookTimeMax: z.number().min(0).optional(),
    servingsMin: z.number().min(1).optional(),
    servingsMax: z.number().min(1).optional(),
    ratingMin: z.number().min(0).max(5).optional(),
    ratingMax: z.number().min(0).max(5).optional(),
    
    // Sorting
    sortBy: z.enum(["title", "cuisine", "difficulty", "cookTime", "rating", "servings"]).default("title"),
    sortOrder: z.enum(["asc", "desc"]).default("asc")
});

export type RecipeQueryDtoType = z.infer<typeof recipeQuerySchema>;

export class RecipeQueryDto {
    constructor(
        public readonly page: number = 1,
        public readonly limit: number = 10,
        public readonly search?: string,
        public readonly cuisine?: string,
        public readonly difficulty?: "Easy" | "Medium" | "Hard",
        public readonly cookTimeMin?: number,
        public readonly cookTimeMax?: number,
        public readonly servingsMin?: number,
        public readonly servingsMax?: number,
        public readonly ratingMin?: number,
        public readonly ratingMax?: number,
        public readonly sortBy: string = "title",
        public readonly sortOrder: "asc" | "desc" = "asc"
    ) {}

    get offset(): number {
        return (this.page - 1) * this.limit;
    }

    static create(object: { [key: string]: any }): [string?, RecipeQueryDto?] {
        try {
            // Convert string numbers to actual numbers for query params
            const processedObject = { ...object };
            
            // Convert string numbers to numbers
            const numberFields = ['page', 'limit', 'cookTimeMin', 'cookTimeMax', 'servingsMin', 'servingsMax', 'ratingMin', 'ratingMax'];
            numberFields.forEach(field => {
                if (processedObject[field] && typeof processedObject[field] === 'string') {
                    const num = Number(processedObject[field]);
                    if (!isNaN(num)) {
                        processedObject[field] = num;
                    }
                }
            });

            const validatedData = recipeQuerySchema.parse(processedObject);
            
            return [undefined, new RecipeQueryDto(
                validatedData.page,
                validatedData.limit,
                validatedData.search,
                validatedData.cuisine,
                validatedData.difficulty,
                validatedData.cookTimeMin,
                validatedData.cookTimeMax,
                validatedData.servingsMin,
                validatedData.servingsMax,
                validatedData.ratingMin,
                validatedData.ratingMax,
                validatedData.sortBy,
                validatedData.sortOrder
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
