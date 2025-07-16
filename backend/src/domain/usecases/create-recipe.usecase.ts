import { CreateRecipeDto } from "../dtos/create-recipe.dto";
import { RecipeEntity } from "../entities/recipe.entity";
import { RecipeRepository } from "../repositories/recipe.repository";

export interface CreateRecipeUseCase {
    execute(dto: CreateRecipeDto): Promise<RecipeEntity>;
}

export class CreateRecipe implements CreateRecipeUseCase {
    constructor(private readonly repository: RecipeRepository) {}

    execute(dto: CreateRecipeDto): Promise<RecipeEntity> {
        return this.repository.create(dto);
    }
}