import { RecipeEntity } from "../entities/recipe.entity";
import { RecipeRepository } from "../repositories/recipe.repository";

export interface DeleteRecipeUseCase {
    execute(id: number): Promise<RecipeEntity>;
}

export class DeleteRecipe implements DeleteRecipeUseCase {
    constructor(private readonly repository: RecipeRepository) {}

    execute(id: number): Promise<RecipeEntity> {
        return this.repository.delete(id);
    }
}