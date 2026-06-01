import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import Principal from './components/principal';
import CadastroProdutos from './components/cadastro';
import GestaoEstoque from './components/gestao';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/cadastro" element={<CadastroProdutos />} />
        <Route path="/gestao" element={<GestaoEstoque />} />
      </Routes>
    </Router>
  );
}

export default App;