export interface RecipeEntity {
    id: number;
    title: string;
    cuisine: string;
    difficulty: "Easy" | "Medium" | "Hard";
    cookTime: number;
    servings: number;
    image: string;
    rating: number;
    ingredients: string[];
    description: string;
}