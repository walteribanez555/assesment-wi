import { CreateRecipeDto } from "../../domain/dtos/create-recipe.dto";
import { PaginationDto } from "../../domain/dtos/pagination.dto";
import { RecipeQueryDto } from "../../domain/dtos/recipe-query.dto";
import { RecipeEntity } from "../../domain/entities/recipe.entity";
import { RecipeRepository } from "../../domain/repositories/recipe.repository";

import * as dbData from "../../../db.json";
const { recipes } = dbData;

/**
 *  * RecipeRepositoryImpl is an implementation of the RecipeRepository interface.
 */
export class RecipeRepositoryImpl implements RecipeRepository {
    private recipes: RecipeEntity[] = [...recipes as RecipeEntity[]]; // Create a copy to avoid modifying original data

    async findById(id: number): Promise<RecipeEntity> {
        const recipe = this.recipes.find(recipe => recipe.id === id);
        if (!recipe) {
            throw new Error(`Recipe with id ${id} not found`);
        }
        return recipe;
    }

    async findAll(paginationDto: PaginationDto<RecipeEntity[]>): Promise<RecipeEntity[]> {
        const { limit, offset } = paginationDto;
        const startIndex = offset;
        const endIndex = offset + limit;
        
        return this.recipes.slice(startIndex, endIndex);
    }

    async create(createRecipeDto: CreateRecipeDto): Promise<RecipeEntity> {
        // Generate new ID based on the highest existing ID
        const maxId = this.recipes.length > 0 
            ? Math.max(...this.recipes.map(recipe => recipe.id))
            : 0;
        
        const newRecipe: RecipeEntity = {
            id: maxId + 1,
            ...createRecipeDto
        };
        
        this.recipes.push(newRecipe);
        return newRecipe;
    }

    async update(id: number, recipe: Partial<RecipeEntity>): Promise<RecipeEntity> {
        const existingRecipeIndex = this.recipes.findIndex(r => r.id === id);
        
        if (existingRecipeIndex === -1) {
            throw new Error(`Recipe with id ${id} not found`);
        }
        
        const existingRecipe = this.recipes[existingRecipeIndex];
        const updatedRecipe: RecipeEntity = {
            ...existingRecipe,
            ...recipe,
            id // Ensure ID doesn't change
        };
        
        this.recipes[existingRecipeIndex] = updatedRecipe;
        return updatedRecipe;
    }

    async delete(id: number): Promise<RecipeEntity> {
        const recipeIndex = this.recipes.findIndex(recipe => recipe.id === id);
        
        if (recipeIndex === -1) {
            throw new Error(`Recipe with id ${id} not found`);
        }
        
        const deletedRecipe = this.recipes[recipeIndex];
        this.recipes.splice(recipeIndex, 1);
        return deletedRecipe;
    }

    async findWithQuery(queryDto: RecipeQueryDto): Promise<{ recipes: RecipeEntity[], total: number }> {
        let filteredRecipes = [...this.recipes];

        // Search functionality - search in title, ingredients, and cuisine
        if (queryDto.search) {
            const searchTerm = queryDto.search.toLowerCase();
            filteredRecipes = filteredRecipes.filter(recipe => {
                const titleMatch = recipe.title.toLowerCase().includes(searchTerm);
                const cuisineMatch = recipe.cuisine.toLowerCase().includes(searchTerm);
                const ingredientMatch = recipe.ingredients.some(ingredient => 
                    ingredient.toLowerCase().includes(searchTerm)
                );
                const descriptionMatch = recipe.description.toLowerCase().includes(searchTerm);
                
                return titleMatch || cuisineMatch || ingredientMatch || descriptionMatch;
            });
        }

        // Filter by cuisine
        if (queryDto.cuisine) {
            filteredRecipes = filteredRecipes.filter(recipe => 
                recipe.cuisine.toLowerCase() === queryDto.cuisine!.toLowerCase()
            );
        }

        // Filter by difficulty
        if (queryDto.difficulty) {
            filteredRecipes = filteredRecipes.filter(recipe => 
                recipe.difficulty === queryDto.difficulty
            );
        }

        // Filter by cook time range
        if (queryDto.cookTimeMin !== undefined) {
            filteredRecipes = filteredRecipes.filter(recipe => 
                recipe.cookTime >= queryDto.cookTimeMin!
            );
        }
        if (queryDto.cookTimeMax !== undefined) {
            filteredRecipes = filteredRecipes.filter(recipe => 
                recipe.cookTime <= queryDto.cookTimeMax!
            );
        }

        // Filter by servings range
        if (queryDto.servingsMin !== undefined) {
            filteredRecipes = filteredRecipes.filter(recipe => 
                recipe.servings >= queryDto.servingsMin!
            );
        }
        if (queryDto.servingsMax !== undefined) {
            filteredRecipes = filteredRecipes.filter(recipe => 
                recipe.servings <= queryDto.servingsMax!
            );
        }

        // Filter by rating range
        if (queryDto.ratingMin !== undefined) {
            filteredRecipes = filteredRecipes.filter(recipe => 
                recipe.rating >= queryDto.ratingMin!
            );
        }
        if (queryDto.ratingMax !== undefined) {
            filteredRecipes = filteredRecipes.filter(recipe => 
                recipe.rating <= queryDto.ratingMax!
            );
        }

        // Sorting
        filteredRecipes.sort((a, b) => {
            let aValue: any;
            let bValue: any;

            switch (queryDto.sortBy) {
                case 'title':
                    aValue = a.title.toLowerCase();
                    bValue = b.title.toLowerCase();
                    break;
                case 'cuisine':
                    aValue = a.cuisine.toLowerCase();
                    bValue = b.cuisine.toLowerCase();
                    break;
                case 'difficulty':
                    const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
                    aValue = difficultyOrder[a.difficulty];
                    bValue = difficultyOrder[b.difficulty];
                    break;
                case 'cookTime':
                    aValue = a.cookTime;
                    bValue = b.cookTime;
                    break;
                case 'rating':
                    aValue = a.rating;
                    bValue = b.rating;
                    break;
                case 'servings':
                    aValue = a.servings;
                    bValue = b.servings;
                    break;
                default:
                    aValue = a.title.toLowerCase();
                    bValue = b.title.toLowerCase();
            }

            if (queryDto.sortOrder === 'desc') {
                return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
            } else {
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            }
        });

        const total = filteredRecipes.length;

        // Apply pagination
        const startIndex = queryDto.offset;
        const endIndex = queryDto.offset + queryDto.limit;
        const paginatedRecipes = filteredRecipes.slice(startIndex, endIndex);

        return {
            recipes: paginatedRecipes,
            total
        };
    }
}
