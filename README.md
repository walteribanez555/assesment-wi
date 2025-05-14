# Shift Management Assessment

## Overview

This is a shift management dashboard that allows users to view, create, and manage shifts for a team. The app works with a mock API that simulates a real workforce management system.

## Setup Instructions

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the JSON Server (in one terminal):

   ```bash
   npm run api
   ```

3. Start the development server (in another terminal):

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5173)

> **Important**: Both servers must be running simultaneously. The JSON server provides the mock API on port 3000, while the SvelteKit development server runs the app.

## API Endpoints

The following endpoints are available at `http://localhost:3000`:

- `GET /shifts` - Get list of shifts
- `POST /shifts` - Create a new shift
- `GET /locations` - Get available locations
- `GET /users` - Get staff members

## Features to Implement

1. View a list of upcoming shifts
2. Create a new shift with:
   - Start time
   - End time
   - Location
   - Required staff count
   - Notes
3. Filter shifts by:
   - Date range
   - Location
   - Staff member
4. Display shift coverage status

## Technical Notes

- The project uses SvelteKit, Tailwind CSS, and a JSON Server backend
- TypeScript types for the data models are available in `src/lib/types.ts`
- To avoid TypeScript configuration issues, the main component currently uses JavaScript

## Troubleshooting

If you encounter any issues:

1. Make sure both the API server (`npm run api`) and the development server (`npm run dev`) are running
2. If you see TypeScript errors, try simplifying the type usage or using JavaScript as shown in the current implementation

## Evaluation Criteria

- API integration and error handling
- Component design and reusability
- State management approach
- UI/UX implementation
- Code organization
- Documentation
