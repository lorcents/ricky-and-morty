# Ricky and Morty API Web App

This README.md document outlines the design and implementation decisions made for the web application that consumes the Rick and Morty API. The application is built using Next.js with TypeScript, utilizes a REST API, incorporates Redux Persist for persisting notes about characters, and has been deployed on Vercel at [test-web-app-woad.vercel.app](https://test-web-app-woad.vercel.app/).

## Table of Contents
1. [Design Decisions](#design-decisions)
   - [Next.js with TypeScript](#nextjs-with-typescript)
   - [REST API](#rest-api)
   - [Redux Persist](#redux-persist)
   - [Deployment on Vercel](#deployment-on-vercel)
   
2. [Implementation Details](#implementation-details)
   - [Folder Structure](#folder-structure)
   - [Redux Store](#redux-store)
   - [Character Notes](#character-notes)
   
3. [How to Run](#how-to-run)
   - [Local Development](#local-development)
   - [Production Build](#production-build)

---

## Design Decisions

### Next.js with TypeScript
The choice of using Next.js with TypeScript was made to take advantage of server-side rendering, which enhances performance and search engine optimization. TypeScript provides static typing, catching potential errors during development.

### REST API
The application consumes the Rick and Morty API through a RESTful architecture. This decision allows for simple and predictable data fetching, making it easier to manage and scale the application.

### Redux Persist
Redux Persist was incorporated to enable the persistence of notes about characters across sessions. This enhances user experience by allowing users to keep personalized notes even after closing and reopening the application.

### Deployment on Vercel
Vercel was chosen as the deployment platform due to its seamless integration with Next.js. The automatic deployments, serverless functions, and global CDN make it an excellent choice for hosting the application.

---

## Implementation Details

### Folder Structure
The project follows a modular folder structure, separating concerns like components, pages, hooks, and store. This promotes maintainability and scalability.
```plaintext
 /src
  |-- components 
  |-- app
      |-- pages folder
      |-- [id].page.tsx
      |-- app page
  |-- hooks
  |-- store
      |-- actions
      |-- reducers 
```

### Redux Store
The Redux store is implemented with actions, reducers,  for managing asynchronous actions. This provides a centralized state management system and persisting data.

### Character Notes
The application allows users to add, edit,  notes about each character. These notes are persisted using Redux Persist, ensuring that user data is retained even when the page is refreshed or reopened.

---

## How to Run

### Local Development
1. Clone the repository: `git clone [https://github.com/lorcents/test_web_app]`
2. Navigate to the project directory: `cd test_web_app`
3. Install dependencies: `npm install`
4. Run the development server: `npm run dev`
5. Open your browser and visit [http://localhost:3000](http://localhost:3000)

### Production Build
To create a production-ready build, follow these steps:
1. Run the build command: `npm run build`
2. Start the production server: `npm start`
3. Open your browser and visit [http://localhost:3000](http://localhost:3000)

---



