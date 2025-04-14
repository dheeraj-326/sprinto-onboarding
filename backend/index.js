// const express = require('express');
// const dotenv = require('dotenv');

// // Load environment variables
// dotenv.config();

// const app = express();
// const port = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Basic route
// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to the Book CRUD API' });
// });

// // Start server
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// }); 

// init env
// end init

import init from "./init.js";
import startServer from "./server.js"
import { fileURLToPath } from 'url';
import path from 'path';
console.log(import.meta.url); // file:///home
init();
await startServer();

// import.meta.url of the main module is the entry file
 // safest way
