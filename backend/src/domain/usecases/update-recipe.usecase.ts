import { UpdateRecipeDto } from "../dtos/update-recipe.dto";
import { RecipeEntity } from "../entities/recipe.entity";
import { RecipeRepository } from "../repositories/recipe.repository";

export interface UpdateRecipeUseCase {
    execute(dto: UpdateRecipeDto): Promise<RecipeEntity>;
}

export class UpdateRecipe implements UpdateRecipeUseCase {
    constructor(private readonly repository: RecipeRepository) {}

    execute(dto: UpdateRecipeDto): Promise<RecipeEntity> {
        const { id, ...updateData } = dto;
        return this.repository.update(id, updateData);
    }
}

