import { Router } from "express";
import { RecipesController } from "../controllers/recipes.controller";
import { RecipeRepositoryImpl } from "../../it/repositories/recipe.repositories.impl";

/**
 * * RecipesRoutes class to define the routes for recipe-related operations.
 * * This class encapsulates the routes and their handlers.
 * * @class RecipesRoutes
 * * @static
 * * @returns {Router} An instance of the Express Router with the defined routes.
 */
export class RecipesRoutes { 
    static getRoutes() :Router {
        const router = Router();

        const recipeRepository = new RecipeRepositoryImpl();
        const recipeController= new RecipesController(recipeRepository);

        // GET /api/recipes - Get all recipes with search, filtering, and pagination
        router.get('/', recipeController.getRecipes);

        // GET /api/recipes/:id - Get recipe by ID
        router.get('/:id', recipeController.getRecipeById);

        // POST /api/recipes - Create new recipe
        router.post('/', recipeController.createRecipe);

        // PUT /api/recipes/:id - Update recipe by ID
        router.put('/:id', recipeController.updateRecipe);

        // DELETE /api/recipes/:id - Delete recipe by ID
        router.delete('/:id', recipeController.deleteRecipe);

        return router;
    }
}