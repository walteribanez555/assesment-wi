import { PaginationDto } from "../dtos/pagination.dto";
import { RecipeEntity } from "../entities/recipe.entity";
import { RecipeRepository } from "../repositories/recipe.repository";

export interface GetRecipesUseCase {
    execute(pagination: PaginationDto<RecipeEntity[]>): Promise<RecipeEntity[]>;
}

export class GetRecipes implements GetRecipesUseCase {
    constructor(private readonly repository: RecipeRepository) {}

    execute(pagination: PaginationDto<RecipeEntity[]>): Promise<RecipeEntity[]> {
        return this.repository.findAll(pagination);
    }
}