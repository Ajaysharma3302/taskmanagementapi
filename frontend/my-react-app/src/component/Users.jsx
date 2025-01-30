import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';
const Users = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = { username, email, password, age };

    // Send data to the backend to create a new user
    axios.post('http://localhost:6333/users/register', newUser)
      .then((response) => {
        console.log("User created:", response.data);
        setTimeout(() => {
            navigate("/users/login"); // Redirect to login page after successful registration
          }, 2000); // Delay for a smooth experience
        
      })
      .catch((error) => {
        console.error("There was an error creating the user!", error);
      });
  };


  return (
    <div className="user-form-container">
    <h1 className="form-heading">Create User</h1>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="input-group">
          <label className="input-label">Username</label>
          <input 
            type="text" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required 
            className="input-field" 
          />
        </div>
        <div className="input-group">
          <label className="input-label">Email</label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label className="input-label">Password</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            className="input-field" 
          />
        </div>
        <div  className="input-group">
          <label className="input-label">Age</label>
          <input 
            type="number" 
            value={age} 
            onChange={(e) => setAge(e.target.value)} 
            required 
            className="input-field" 
          />
        </div>
        <button type="submit" className="submit-button" >Create User</button>
      </form>
    </div>
  );
};

export default Users;
