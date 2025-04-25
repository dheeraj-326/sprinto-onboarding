# Book CRUD Backend

A Node.js/Express backend application with GraphQL and PostgreSQL integration for managing book data.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v14 or higher)
- npm (v8 or higher)

## Project Structure

```
backend/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── dao/           # Data Access Objects
├── graphql/       # GraphQL schema and resolvers
├── middlewares/   # Express middlewares
├── models/        # Database models
├── routes/        # API routes
├── services/      # Business logic
├── utils/         # Utility functions
├── .env           # Environment variables
├── index.js       # Application entry point
├── init.js        # Initialization script
└── server.js      # Server configuration
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd book-crud/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Copy `.env.example` to `.env` (if available)
   - Configure the following environment variables in `.env`:
     ```
     PORT=4001
     DB_HOST=localhost
     DB_PORT=5432
     DB_NAME=book_crud
     DB_USER=your_username
     DB_PASSWORD=your_password
     ```

4. **Database Setup**
   - Create a PostgreSQL database named `book_crud`
   - The application will automatically create tables on startup

## Running the Application

### Development Mode
```bash
npm run dev
```
This will start the server with nodemon for hot-reloading.

### Production Mode
```bash
npm start
```

## API Documentation

### GraphQL Playground
Once the server is running, you can access the GraphQL Playground at:
```
http://localhost:4001/graphql
```

## Available Scripts

- `npm run postgres` - Start postgres in docker
- `npm start` - Start the server in production mode
- `npm run dev` - Start the server in development mode with hot-reloading
- `npm test` - Run tests (if configured)

## Dependencies

- Express.js - Web framework
- Apollo Server - GraphQL server
- Sequelize - ORM for PostgreSQL
- GraphQL - Query language
- dotenv - Environment variable management

## License

This project is licensed under the ISC License. 