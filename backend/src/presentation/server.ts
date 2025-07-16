import express, { Router } from "express";

/**
 * * Options for the Server class.
 * * @property {number} port - The port on which the server will listen.
 * * @property {Router} routes - The Express Router instance containing the application's routes.
 */
interface Options { 
    port: number;
    routes: Router;
}


export class Server { 
    private readonly app = express();
    private readonly port: number;
    private readonly routes: Router;


    constructor(options : Options) { 
        const { port, routes } = options;
        this.port = port;
        this.routes = routes;
    }


    /**
     * * Starts the server and listens on the specified port.
     * * It sets up middleware for JSON parsing and URL-encoded data,
     * * and mounts the provided routes.
     */
    async start() { 
        this.app.use(express.json());
        this.app.use( express.urlencoded({extended: true}))

        // Mount all routes under /api prefix
        this.app.use('/api/recipes', this.routes);

        this.app.listen(this.port, () => { 
            console.log(`Server is running on port ${this.port}`);
        });
    }

}