# Shift Management Assessment

## Overview

You'll be building a shift management dashboard that allows users to view, create, and manage shifts for a team. The project uses SvelteKit, TypeScript, and TailwindCSS, with a mock API powered by JSON Server.

## Setup

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

## Current State

The project has been set up with:

- Basic project structure
- TypeScript types for Shifts, Locations, and Users
- Mock API with sample data
- Basic shift listing functionality

## Required Features

### 1. Shift Creation Form

Create a form component that allows users to:

- Select a location from the available options
- Set start and end times
- Specify required staff count
- Add notes
- Submit the new shift to the API

### 2. Shift Filtering

Implement filtering functionality to:

- Filter shifts by date range
- Filter by location
- Filter by staff member
- Combine multiple filters

### 3. Shift Management

Add the ability to:

- Edit existing shifts
- Delete shifts
- Mark shifts as complete
- View shift details

### 4. Staff Assignment

Implement functionality to:

- View available staff for a shift
- Assign staff to shifts
- Remove staff from shifts
- Show staff availability

### 5. UI/UX Improvements

Enhance the user interface with:

- Loading states
- Error handling
- Success notifications
- Responsive design
- Accessibility features

## Technical Requirements

### TypeScript

- Use proper type definitions
- Implement interfaces for all data structures
- Add type safety to API calls
- Use proper error types

### State Management

- Implement proper state management for shifts
- Handle loading and error states
- Manage form state
- Cache API responses where appropriate

### API Integration

- Implement proper error handling
- Add retry logic for failed requests
- Handle API response validation
- Implement proper loading states

### Code Quality

- Follow TypeScript best practices
- Implement proper error handling
- Add appropriate comments
- Follow SvelteKit conventions
- Use proper component structure

## Bonus Features

- Add shift conflict detection
- Implement shift templates
- Add drag-and-drop for staff assignment
- Add keyboard shortcuts
- Implement dark/light mode
- Add unit tests

## Evaluation Criteria

Your solution will be evaluated on:

1. Feature prioritization
2. Code organization and structure
3. TypeScript usage and type safety
4. Component design and reusability
5. State management approach
6. UI/UX implementation
7. Error handling
8. Documentation
9. Bonus feature implementation

## Time Limit

1-2 hours

## Submission

1. Fork the repository
2. Implement the required features
3. Add a README.md with:
   - Setup instructions
   - Technical decisions made
   - Any trade-offs considered
4. Submit a pull request with your changes

## Notes

- Focus on core functionality first
- Implement bonus features if time permits
- Ensure code is clean and well-documented
- Test your implementation thoroughly
