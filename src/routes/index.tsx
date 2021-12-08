import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
// import Login from '../pages/Login'; { <Route path="/" exact component={Login} /> }

const Rotes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>} />
    </Routes>
  );
};


export default Rotes;
