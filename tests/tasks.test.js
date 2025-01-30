const request = require('supertest');
const app =  require("../index")
const mongoose = require("mongoose");
// const User = require("../routes/userroute")
// const Task = require("../routes/taskroute")
 const User = require("../models/usermodel");
 const Task = require("../models/taskmodel");

let token = '';


beforeAll(async () => {
    const url = process.env.MONGO_URL || 'mongodb://localhost:27017/taskmanagementdatabase';
    await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

//   // Test user login (to get the token for authorization)
// beforeEach(async () => {
//     // Create a test user for authentication
//     const user = new User({
//       username: 'testuser',
//       password: 'testpassword',
//     });
//     await user.save();                    

// Test user login (to get the token for authorization)
beforeEach(async () => {
    // Create a test user for authentication
    const user = new User({
      username: 'testuser',
      password: 'testpassword',
      age: 30,       
      email: 'test@example.com', 
    });
    await user.save();
  
    // Log in to get a token
    const res = await request(app)
      .post('/users/login')
      .send({ username: 'testuser', password: 'testpassword' });
  
    token = res.body.token;
  });
  describe('Task CRUD operations', () => {

    // Create a new task
    it('should create a new task', async () => {
      const newTask = {
        title: 'Test Task',
        description: 'This is a test task',
        dueDate: '2025-02-01',
        priority: 'High',
        status: 'Pending',
      };
  
      const res = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${token}`)
        .send(newTask);
  
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('title', newTask.title);
      expect(res.body).toHaveProperty('status', 'Pending');
    });
  
    // Get all tasks
    it('should retrieve all tasks', async () => {
      const res = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${token}`);
  
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  
    // Get a task by ID
    it('should retrieve a task by ID', async () => {
      const task = new Task({
        title: 'Test Task by ID',
        description: 'This task will be fetched by ID',
        dueDate: '2025-02-02',
        priority: 'Medium',
        status: 'Pending',
      });
      await task.save();
  
      const res = await request(app)
        .get(`/tasks/${task._id}`)
        .set('Authorization', `Bearer ${token}`);
  
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title', 'Test Task by ID');
    });
  
    // Update a task
    it('should update a task', async () => {
      const task = new Task({
        title: 'Task to be updated',
        description: 'This task will be updated',
        dueDate: '2025-02-03',
        priority: 'Low',
        status: 'Pending',
      });
      await task.save();
  
      const updatedTask = {
        title: 'Updated Task Title',
        status: 'In Progress',
      };
  
      const res = await request(app)
        .patch(`/tasks/${task._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(updatedTask);
  
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('title', 'Updated Task Title');
      expect(res.body).toHaveProperty('status', 'In Progress');
    });
  
    // Delete a task
    it('should delete a task', async () => {
      const task = new Task({
        title: 'Task to be deleted',
        description: 'This task will be deleted',
        dueDate: '2025-02-04',
        priority: 'Medium',
        status: 'Pending',
      });
      await task.save();
  
      const res = await request(app)
        .delete(`/tasks/${task._id}`)
        .set('Authorization', `Bearer ${token}`);
  
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('message', 'Task deleted successfully');
    });
  });