# Blogify - A Blog Platform

## Description

This project is a full-stack blog platform built with React for the frontend and Node.js with Express for the backend. It allows users to create accounts, write blog posts, and interact with other users' content.

## Features

- User authentication (register, login, logout)
- Create, read, update, and delete blog posts
- Responsive design for various screen sizes

## Technologies Used

### Frontend
- React
- React Router for navigation
- Axios for API requests
- Tailwind CSS for styling

### Backend
- Node.js
- Express.js
- MongoDB for database
- Mongoose as ODM
- JSON Web Tokens (JWT) for authentication

## Setup Instructions

### Prerequisites
- Node.js (v14 or later)
- MongoDB

### Backend Setup
1. Clone the repository:
   ```
   git clone https://github.com/your-username/blog-platform.git
   cd blog-platform/server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/blog-platform
   JWT_SECRET=your_jwt_secret_here
   PORT=5000
   ```

4. Start the backend server:
   ```
   npm start
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd ../client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following content:
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the frontend development server:
   ```
   npm start
   ```

5. Open your browser and visit `http://localhost:3000` to view the application.

## API Endpoints

- `POST /api/user/register`: Register a new user
- `POST /api/user/login`: Login a user
- `GET /api/blog/all`: Get all blog posts
- `GET /api/blog/:id`: Get a specific blog post
- `POST /api/blog/create`: Create a new blog post (requires authentication)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgements

- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
