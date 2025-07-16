import { config } from 'dotenv';


/**
 *  * Load environment variables from .env file
 *  * and export them as an object.
 */
export const envs = { 
     PORT :  process.env.PORT ? parseInt(process.env.PORT) : 3000,
     ENVIRONMENT: process.env.NODE_ENV || 'development',
}