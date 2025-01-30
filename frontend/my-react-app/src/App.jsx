
 import './App.css'

import { Route, Routes } from "react-router-dom";
import Tasks from "./component/Task"
import Users from "./component/Users"
import Login from "./component/Login"


function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Users />} />
      <Route path="/users/login" element={<Login />} />
    
    </Routes>
    </div>
  );
}


export default App;
