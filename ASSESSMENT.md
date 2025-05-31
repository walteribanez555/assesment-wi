# Recipe Collection Assessment

## Overview

You'll be enhancing a recipe collection application with **both frontend and backend improvements**. Choose the track that best matches your skills, or tackle both if time permits. This assessment is designed to be completed in **1-2 hours**.

## Current State

The project has been set up with:

- Next.js 15 with React and TypeScript frontend
- JSON Server backend with 15 sample recipes
- Basic search, filtering, and pagination (6 recipes per page)
- Beautiful recipe card layout with Tailwind CSS

## Choose Your Focus

### Track A: Frontend Focus (1-2 hours)

**Goal**: Enhance the user experience and visual design

#### Required Tasks:

1. **Enhanced Recipe Cards** (30 min)

   - Add a "favorite" heart icon with toggle functionality
   - Improve hover animations and visual feedback
   - Add dietary restriction badges (vegetarian, vegan, etc.)

2. **Recipe Form** (45 min)

   - Create an "Add New Recipe" form with validation
   - Include: title, cuisine, difficulty, cook time, ingredients (dynamic list)
   - Form validation with error messages
   - Success state with confirmation

3. **Mobile Improvements** (15 min)
   - Ensure responsive design works well on mobile
   - Optimize filter interface for smaller screens

### Track B: Backend Focus (1-2 hours)

**Goal**: Replace JSON Server with a proper Express API

#### Required Tasks:

1. **Express API Setup** (30 min)

   - Create a proper Express server with TypeScript
   - Set up CORS and basic middleware
   - Replace JSON Server with Express routes

2. **CRUD Operations** (45 min)

   - `GET /api/recipes` - with pagination, search, and filtering
   - `POST /api/recipes` - create new recipe with validation
   - `PUT /api/recipes/:id` - update existing recipe
   - `DELETE /api/recipes/:id` - delete recipe
   - Proper error handling and status codes

3. **Advanced Features** (15 min)
   - Input validation and sanitization
   - Search functionality (title, ingredients, cuisine)
   - Query parameters for filtering (cuisine, difficulty, cook time range)

### Track C: Full Stack (1-2 hours)

**Goal**: Implement both frontend and backend improvements

#### Required Tasks:

1. **Backend API** (45 min)

   - Express server with basic CRUD operations
   - Search and filter endpoints
   - Input validation

2. **Frontend Integration** (30 min)

   - Connect React app to new Express API
   - Add basic recipe form
   - Improve error handling

3. **Polish** (15 min)
   - Loading states
   - Basic responsive improvements

## Technical Requirements

### All Tracks:

- **Clean Code**: Well-organized, commented code
- **TypeScript**: Proper type definitions
- **Error Handling**: Graceful error states
- **Testing**: Manual testing of all implemented features

### Backend Specific:

- **API Design**: RESTful endpoints with proper HTTP methods
- **Data Validation**: Server-side validation for all inputs
- **Error Responses**: Consistent error format with appropriate status codes
- **Code Structure**: Organized routes, middleware, and utilities

### Frontend Specific:

- **Component Design**: Reusable, well-structured React components
- **State Management**: Efficient state handling with hooks
- **User Experience**: Intuitive interactions and feedback
- **Responsive Design**: Works well on mobile and desktop

## Evaluation Criteria

**Backend Track:**

- API design and RESTful principles (30%)
- Data validation and error handling (25%)
- Code organization and TypeScript usage (25%)
- Feature completeness (20%)

**Frontend Track:**

- User interface and visual design (30%)
- React component structure (25%)
- User experience and interactions (25%)
- Feature completeness (20%)

**Full Stack Track:**

- Integration between frontend and backend (35%)
- Code quality across both layers (30%)
- Feature completeness (35%)

## Getting Started

1. **Choose your track** based on your strengths
2. **Review existing code** to understand the current structure
3. **Start with setup** (backend devs: create Express app, frontend devs: review React components)
4. **Implement core features** before adding polish
5. **Test thoroughly** before submission

## Bonus Features (if time permits)

**Backend:**

- Rate limiting
- Basic authentication
- Database integration (SQLite)
- Recipe image upload handling

**Frontend:**

- Dark mode toggle
- Recipe comparison feature
- Advanced search with filters
- Drag and drop for ingredients

## Submission

Include in your submission:

1. **Working application** with implemented features
2. **Brief README** explaining what you built and how to run it
3. **Any assumptions** or trade-offs you made
4. **Time tracking** (what you completed in the allocated time)

## Setup Instructions

```bash
# Install dependencies
npm run setup

# Start both servers (or just the one you're working with)
npm run dev

# Or start individually:
npm run frontend  # http://localhost:3000
npm run backend   # http://localhost:3001
```

## API Reference (Current JSON Server)

- `GET /recipes` - Get all recipes
- `GET /recipes?_page=1&_limit=6` - Paginated recipes
- `GET /recipes?cuisine=Italian` - Filter by cuisine
- `GET /recipes?q=search-term` - Search recipes

**Backend developers**: Replace this with your Express implementation!
