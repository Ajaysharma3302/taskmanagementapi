# taskmanagementapi
# Technology used
Node.js: JavaScript runtime environment
Express.js: Web framework for Node.js
dotenv: Loads environment variables from a .env file
MongoDB (Assumed): NoSQL Database for storing task and user data
Cors: A package to allow Cross-Origin Request Sharing (CORS)


# clone repo

# git clone https://github.com/Ajaysharma3302/taskmanagementapi.git

#Install dependencies:

cd your-repository-name
npm install

# Create a .env file in the root of the project and define your environment variables (e.g., database connection string, port, etc.).

# You need a MongoDB database or an appropriate database connection defined in your configuration file. Ensure that your database is running and reachable.  
PORT=6333
MONGO_URL="mongodb://127.0.0.1:27017/taskmanagementdatabase"
JWT_SECRET_KEY="sharma07" 


# POST /tasks
# Description: Create a new task.
# Authorization: Required (JWT token)
# Request Body:

{
  "title": "Task Title",
  "description": "Task Description",
  "dueDate": "2025-01-30",
  "priority": "High",
  "status": "Pending"
}  

# Response: Returns the created task object.

{
  "_id": "60f7a47f77ab2e001f39d6f8",
  "title": "Task Title",
  "description": "Task Description",
  "dueDate": "2025-01-30",
  "priority": "High",
  "status": "Pending"
}

GET /tasks
Description: Get all tasks.
Authorization: Required (JWT token)
Response: Returns a list of tasks.

[
  {
    "_id": "60f7a47f77ab2e001f39d6f8",
    "title": "Task Title",
    "description": "Task Description",
    "dueDate": "2025-01-30",
    "priority": "High",
    "status": "Pending"
  },
  ...
]
GET /tasks/:id
Description: Get a task by ID.
Authorization: Required (JWT token)
Response: Returns the task object if found, or a 404 error if not found.
json
Copy
{
  "_id": "60f7a47f77ab2e001f39d6f8",
  "title": "Task Title",
  "description": "Task Description",
  "dueDate": "2025-01-30",
  "priority": "High",
  "status": "Pending"
}
4. PATCH /tasks/:id
Description: Update a task by ID.
Authorization: Required (JWT token)
Request Body:
json
Copy
{
  "status": "Completed"
}
GET /tasks/:id
Description: Get a task by ID.
Authorization: Required (JWT token)
Response: Returns the task object if found, or a 404 error if not found.
json
Copy
{
  "_id": "60f7a47f77ab2e001f39d6f8",
  "title": "Task Title",
  "description": "Task Description",
  "dueDate": "2025-01-30",
  "priority": "High",
  "status": "Pending"
}
4. PATCH /tasks/:id
Description: Update a task by ID.
Authorization: Required (JWT token)
Request Body:
json
Copy
{
  "status": "Completed"
}   

# User Routes (/users)
These routes manage user authentication and require users to register and login. All user-related endpoints are prefixed with /users.

1. POST /users/register
Description: Register a new user with hashed password.
Request Body:
json
Copy
{
  "username": "User Name",
  "email": "user@example.com",
  "password": "password123",
  "age": 25
}
# Response: Returns a success message.
json
Copy
{
  "message": "Registered with hashed password"
}
2. POST /users/login
# Description: Login an existing user and generate a JWT token.
Request Body:
json
Copy
{
  "email": "user@example.com",
  "password": "password123"
}
Response: Returns a JWT token upon successful login.
json
Copy
{
  "message": "User logged in successfully",
  "token": "your_jwt_token_here"
}
# Running the Application
node index.js


# If you're using MongoDB locally, you can set MONGO_URL as:

"mongodb://127.0.0.1:27017/taskmanagementdatabase"