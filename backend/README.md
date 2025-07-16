# Recipe Management API Backend

A robust TypeScript-based REST API for managing recipes with search, filtering, and CRUD operations.

## 🚀 Features

- **Complete CRUD Operations** for recipes
- **Advanced Search & Filtering** by title, ingredients, cuisine, difficulty, cook time, rating
- **Pagination Support** with customizable page size
- **Sorting Capabilities** by multiple fields (title, cuisine, difficulty, cook time, rating, servings)
- **Input Validation** using Zod with comprehensive error messages
- **Clean Architecture** with Domain-Driven Design principles
- **Type Safety** with full TypeScript implementation
- **Mock Database** using JSON file for easy development

## 📋 Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)

## 🛠 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd assessment/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.template .env
   ```

4. **Update the .env file with your configuration**

## ⚙️ Configuration

Copy `.env.template` to `.env` and configure the following variables:

```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# API Configuration
API_PREFIX=/api
```

## 🏃‍♂️ Running the Application

### Development Mode
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

The server will start on `http://localhost:3000` (or your configured PORT).

## 📚 API Documentation
https://documenter.getpostman.com/view/11985015/2sB34ijyuJ

### Base URL
```
http://localhost:3000/api
```

### Endpoints

#### 📖 Get All Recipes (with Search & Filtering)
```http
GET /api/recipes
```

**Query Parameters:**
- `page` (number): Page number (default: 1)
- `limit` (number): Items per page (default: 10, max: 100)
- `search` (string): Search in title, ingredients, cuisine, description
- `cuisine` (string): Filter by cuisine type
- `difficulty` (enum): Filter by difficulty (Easy, Medium, Hard)
- `cookTimeMin` (number): Minimum cook time in minutes
- `cookTimeMax` (number): Maximum cook time in minutes
- `servingsMin` (number): Minimum number of servings
- `servingsMax` (number): Maximum number of servings
- `ratingMin` (number): Minimum rating (0-5)
- `ratingMax` (number): Maximum rating (0-5)
- `sortBy` (enum): Sort by field (title, cuisine, difficulty, cookTime, rating, servings)
- `sortOrder` (enum): Sort order (asc, desc)

**Example Requests:**
```bash
# Basic pagination
GET /api/recipes?page=1&limit=10

# Search for pasta recipes
GET /api/recipes?search=pasta

# Filter Italian easy recipes
GET /api/recipes?cuisine=Italian&difficulty=Easy

# Quick recipes under 20 minutes, sorted by rating
GET /api/recipes?cookTimeMax=20&sortBy=rating&sortOrder=desc
```

**Response:**
```json
{
  "recipes": [
    {
      "id": 1,
      "title": "Classic Spaghetti Carbonara",
      "cuisine": "Italian",
      "difficulty": "Medium",
      "cookTime": 20,
      "servings": 4,
      "image": "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400",
      "rating": 4.8,
      "ingredients": ["spaghetti", "eggs", "pancetta", "parmesan", "black pepper"],
      "description": "Creamy Italian pasta dish with eggs, cheese, and pancetta"
    }
  ],
  "total": 15,
  "page": 1,
  "totalPages": 2
}
```

#### 🔍 Get Recipe by ID
```http
GET /api/recipes/:id
```

**Response:**
```json
{
  "id": 1,
  "title": "Classic Spaghetti Carbonara",
  "cuisine": "Italian",
  "difficulty": "Medium",
  "cookTime": 20,
  "servings": 4,
  "image": "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400",
  "rating": 4.8,
  "ingredients": ["spaghetti", "eggs", "pancetta", "parmesan", "black pepper"],
  "description": "Creamy Italian pasta dish with eggs, cheese, and pancetta"
}
```

#### ➕ Create New Recipe
```http
POST /api/recipes
```

**Request Body:**
```json
{
  "title": "Delicious Chicken Alfredo",
  "cuisine": "Italian",
  "difficulty": "Medium",
  "cookTime": 30,
  "servings": 4,
  "image": "https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=400",
  "rating": 4.5,
  "ingredients": [
    "chicken breast",
    "fettuccine pasta",
    "heavy cream",
    "parmesan cheese",
    "garlic",
    "butter",
    "black pepper",
    "salt"
  ],
  "description": "Creamy and rich pasta dish with tender chicken and homemade alfredo sauce"
}
```

#### ✏️ Update Recipe
```http
PUT /api/recipes/:id
```

**Request Body (all fields optional for partial updates):**
```json
{
  "title": "Updated Chicken Alfredo Supreme",
  "rating": 4.8,
  "cookTime": 35,
  "ingredients": [
    "chicken breast",
    "fettuccine pasta",
    "heavy cream",
    "parmesan cheese",
    "garlic",
    "butter",
    "white wine",
    "mushrooms",
    "black pepper",
    "salt"
  ]
}
```

#### 🗑️ Delete Recipe
```http
DELETE /api/recipes/:id
```

### 🚨 Error Responses

```json
{
  "error": "Recipe with id 999 not found"
}
```

**Validation Error:**
```json
{
  "error": "title: Title is required, rating: Rating must be at least 0"
}
```

## 🏗️ Project Structure

```
backend/
├── src/
│   ├── domain/
│   │   ├── dtos/                    # Data Transfer Objects
│   │   │   ├── create-recipe.dto.ts
│   │   │   ├── update-recipe.dto.ts
│   │   │   ├── pagination.dto.ts
│   │   │   └── recipe-query.dto.ts
│   │   ├── entities/                # Domain Entities
│   │   │   └── recipe.entity.ts
│   │   ├── repositories/            # Repository Interfaces
│   │   │   └── recipe.repository.ts
│   │   ├── usecases/               # Business Logic
│   │   │   ├── create-recipe.usecase.ts
│   │   │   ├── get-recipe.usecase.ts
│   │   │   ├── get-recipes.usecase.ts
│   │   │   ├── update-recipe.usecase.ts
│   │   │   ├── delete-recipe.usecase.ts
│   │   │   └── search-recipes.usecase.ts
│   │   └── errors/                 # Custom Error Classes
│   │       └── custom.error.ts
│   ├── it/                         # Infrastructure Layer
│   │   └── repositories/           # Repository Implementations
│   │       └── recipe.repositories.impl.ts
│   ├── presentation/               # Presentation Layer
│   │   ├── controllers/            # HTTP Controllers
│   │   │   └── recipes.controller.ts
│   │   ├── routes/                 # Route Definitions
│   │   │   └── recipes.routes.ts
│   │   └── server.ts               # Express Server Setup
│   ├── configs/                    # Configuration Files
│   │   └── envs.ts
│   └── app.ts                      # Application Entry Point
├── db.json                         # Mock Database
├── package.json
├── tsconfig.json
├── .env.template
└── README.md
```

## 🧪 Technologies Used

- **Node.js** - Runtime environment
- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web framework
- **Zod** - Schema validation and parsing
- **Clean Architecture** - Architectural pattern
- **Domain-Driven Design** - Design approach

## 🔧 Validation Rules

### Recipe Fields:
- **title**: Required string (min 1 character)
- **cuisine**: Required string (min 1 character)
- **difficulty**: Required enum ("Easy", "Medium", "Hard")
- **cookTime**: Required positive number (minutes)
- **servings**: Required positive number
- **image**: Required valid URL
- **rating**: Required number (0-5 range)
- **ingredients**: Required array of strings (min 1 ingredient)
- **description**: Required string (min 1 character)

## 🚀 Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests (if configured)

### Adding New Features

1. **Add new DTOs** in `src/domain/dtos/`
2. **Update entities** in `src/domain/entities/`
3. **Create use cases** in `src/domain/usecases/`
4. **Implement repository methods** in `src/it/repositories/`
5. **Add controller methods** in `src/presentation/controllers/`
6. **Update routes** in `src/presentation/routes/`

## 📝 License

This project is part of an assessment and is for educational purposes.

## 🤝 Contributing

This is an assessment project. Please follow the established patterns when making changes.

---

**Happy Coding! 🍳👨‍💻**
