import { CreateRecipeDto } from "../dtos/create-recipe.dto";
import { PaginationDto } from "../dtos/pagination.dto";
import { RecipeQueryDto } from "../dtos/recipe-query.dto";
import { RecipeEntity } from "../entities/recipe.entity";

export abstract class RecipeRepository {
    abstract findById(id: number): Promise<RecipeEntity>;
    abstract findAll(paginationDto: PaginationDto<RecipeEntity[]>): Promise<RecipeEntity[]>;
    abstract findWithQuery(queryDto: RecipeQueryDto): Promise<{ recipes: RecipeEntity[], total: number }>;
    abstract create(createRecipeDto: CreateRecipeDto): Promise<RecipeEntity>;
    abstract update(id: number, recipe: Partial<RecipeEntity>): Promise<RecipeEntity>;
    abstract delete(id: number): Promise<RecipeEntity>;
}