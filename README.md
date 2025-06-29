# NoteLover - Full Stack Note Management Application

NoteLover is a full-stack mobile application that enables users to register and manage personal notes. Built with React Native (Expo) on the frontend and Express.js with MongoDB on the backend, the project supports full CRUD functionality.

## Features

- User registration and listing
- Per-user note creation, editing, and deletion
- Note categorization using a dropdown-based type selector
- Backend API built with Express.js and MongoDB
- Clean and responsive UI with custom styling

## Application Flow

1. Users can be added via the "+" button on the main screen.
2. Each user has their own note page.
3. Notes include a title, content, and type.
4. Notes can be updated or deleted from the UI.
5. The note interface is filtered by user.

## Data Models

### Users Collection
```json
{
  "_id": ObjectId,
  "username": String
}

```

### Notes Collection
```json
{
  "_id": ObjectId,
  "title": String,
  "content": String,
  "createdAt": Date,
  "type": String,
  "userId": ObjectId
}
```

### NoteTypes Collection
```json
{
  "_id": ObjectId,
  "name": String
}
```

## Technologies Used
- Frontend: React Native (TypeScript, Expo)
- Backend: Node.js, Express.js
- Database: MongoDB
- API Testing: Postman
- Version Control: Git, GitHub

## API Endpoints
- GET /users
- POST /users
- GET /notes/:userId
- POST /notes  
- PUT /notes/:noteId
- DELETE /notes/:noteId
  
## Installation & Setup

### Frontend Setup
npm install

npx expo start

### Backend Setup
cd backend

npm install

npm run dev

## Development Notes
This project adheres to RESTful API design principles, ensuring modular and scalable communication between the frontend and backend. Users must be registered before they can create or manage notes. Each note includes a title, content, and a selectable category (type), with note types dynamically rendered via dropdown menus.

Notes are displayed using custom-styled cards for an intuitive and responsive UI experience. Deleting a user also triggers the removal of all associated notes to maintain database consistency.

This application was developed as part of a mobile development case study, with a focus on real-time user interaction and personalized note management.




