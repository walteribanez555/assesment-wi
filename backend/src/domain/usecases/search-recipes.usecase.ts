import { RecipeQueryDto } from "../dtos/recipe-query.dto";
import { RecipeEntity } from "../entities/recipe.entity";
import { RecipeRepository } from "../repositories/recipe.repository";

export interface SearchRecipesUseCase {
    execute(queryDto: RecipeQueryDto): Promise<{ recipes: RecipeEntity[], total: number, page: number, totalPages: number }>;
}

export class SearchRecipes implements SearchRecipesUseCase {
    constructor(private readonly repository: RecipeRepository) {}

    async execute(queryDto: RecipeQueryDto): Promise<{ recipes: RecipeEntity[], total: number, page: number, totalPages: number }> {
        const result = await this.repository.findWithQuery(queryDto);
        
        return {
            recipes: result.recipes,
            total: result.total,
            page: queryDto.page,
            totalPages: Math.ceil(result.total / queryDto.limit)
        };
    }
}
