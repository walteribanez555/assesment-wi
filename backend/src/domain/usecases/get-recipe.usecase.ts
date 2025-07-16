import { RecipeEntity } from "../entities/recipe.entity";
import { RecipeRepository } from "../repositories/recipe.repository";

export interface GetRecipeUseCase { 
    execute(id: number): Promise<RecipeEntity>;
}

export class GetRecipe implements GetRecipeUseCase {
    constructor(private readonly repository: RecipeRepository) {}

    execute(id: number): Promise<RecipeEntity> {
        return this.repository.findById(id);
    }
}