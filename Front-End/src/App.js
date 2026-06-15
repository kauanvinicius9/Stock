import React from 'react';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './components/login';
import Main from './components/main';
import RegistrationProduct from './components/registration';
import ManagementProduct from './components/management';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/registration" element={<RegistrationProduct />} />
        <Route path="/management" element={<ManagementProduct />} />
      </Routes>
    </Router>
  );
}

export default App;