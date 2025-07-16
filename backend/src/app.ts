import { Server } from "./presentation/server";
import { envs } from "./configs/envs";
import { RecipesRoutes } from "./presentation/routes/recipes.routes";

function main () { 
    const server = new Server({
        port: envs.PORT,
        routes: RecipesRoutes.getRoutes()
    });

    server.start();
}

main();