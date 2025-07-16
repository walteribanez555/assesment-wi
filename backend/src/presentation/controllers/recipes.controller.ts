import { Request, Response } from "express";
import { CustomError } from "../../domain/errors/custom.error";
import { RecipeRepository } from "../../domain/repositories/recipe.repository";
import { CreateRecipeDto } from "../../domain/dtos/create-recipe.dto";
import { UpdateRecipeDto } from "../../domain/dtos/update-recipe.dto";
import { RecipeQueryDto } from "../../domain/dtos/recipe-query.dto";
import { GetRecipe } from "../../domain/usecases/get-recipe.usecase";
import { CreateRecipe } from "../../domain/usecases/create-recipe.usecase";
import { UpdateRecipe } from "../../domain/usecases/update-recipe.usecase";
import { DeleteRecipe } from "../../domain/usecases/delete-recipe.usecase";
import { SearchRecipes } from "../../domain/usecases/search-recipes.usecase";

export class RecipesController { 
    // DI
    constructor(private readonly recipeRepository: RecipeRepository) {}

    private handleError = (resp: Response, error: unknown) => {
        if(error instanceof CustomError) {
            resp.status(error.statusCode).json({ error: error.message });
        } else {
            resp.status(500).json({ error });
        }
    }

    public getRecipes = (req: Request, res: Response): void => {
        const [error, recipeQueryDto] = RecipeQueryDto.create(req.query);

        if (error) {
            res.status(400).json({ error });
            return;
        }

        new SearchRecipes(this.recipeRepository)
            .execute(recipeQueryDto!)
            .then(result => res.json(result))
            .catch(error => this.handleError(res, error));
    };

    public getRecipeById = (req: Request, res: Response): void => {
        const id = +req.params.id;

        new GetRecipe(this.recipeRepository)
            .execute(id)
            .then(recipe => res.json(recipe))
            .catch(error => this.handleError(res, error));
    };

    public createRecipe = (req: Request, res: Response): void => {
        const [error, createRecipeDto] = CreateRecipeDto.create(req.body);

        if (error) {
            res.status(400).json({ error });
            return;
        }

        new CreateRecipe(this.recipeRepository)
            .execute(createRecipeDto!)
            .then(recipe => res.json(recipe))
            .catch(error => this.handleError(res, error));
    };

    public updateRecipe = (req: Request, res: Response): void => {
        const id = +req.params.id;

        const [error, updateRecipeDto] = UpdateRecipeDto.update({ ...req.body, id });

        if (error) {
            res.status(400).json({ error });
            return;
        }

        new UpdateRecipe(this.recipeRepository)
            .execute(updateRecipeDto!)
            .then(recipe => res.json(recipe))
            .catch(error => this.handleError(res, error));
    };

    public deleteRecipe = (req: Request, res: Response): void => {
        const id = +req.params.id;

        new DeleteRecipe(this.recipeRepository)
            .execute(id)
            .then(recipe => res.json(recipe))
            .catch(error => this.handleError(res, error));
    };
}