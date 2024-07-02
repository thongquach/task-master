# JWT Authentication & Authorization in NodeJs/Express, TypeScript & MongoDB REST APIs

This project is a simple RESTful API for user registration, authentication, and user management built using Node.js, Express.js,Typescript, and MongoDB. It provides endpoints for user `registration,` `login`, `fetching user details`, `logging out`, and `logging out from all devices`.

## Features

- User registration: Register a new user with a name, email, and password.
- User login: Authenticate users with their email and password.
- Fetch user details: Retrieve user details after authentication.
- Logout: Logout the user from the current device.
- Logout from all devices: Logout the user from all devices.

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies
4. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Define the following variables:
     - `PORT`: Port number for the server.
     - `MONGODB_URL`: MongoDB connection URL.
     - `JWT_SECRET`: Secret key for JWT token generation.

5. Start the server:

## Usage

- Register a new user: Send a POST request to `/api/users/register` with JSON data containing `name`, `email`, and `password`.
- Login: Send a POST request to `/api/users/login` with JSON data containing `email` and `password`.
- Fetch user details: Send a GET request to `/api/users/me` with a valid JWT token in the Authorization header.
- Logout: Send a POST request to `/api/users/logout` with a valid JWT token in the Authorization header.
- Logout from all devices: Send a POST request to `/api/users/logoutall` with a valid JWT token in the Authorization header.

## Dependencies

- express: Web framework for Node.js
- mongodb: NoSQL database
- mongoose: MongoDB object modeling tool
- bcryptjs: Password hashing library
- jsonwebtoken: JWT token generation and verification
- TypeScript: Superset of JavaScript that compiles to clean JavaScript output

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
