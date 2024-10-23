


import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import LandPage from './pages/landpage';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


const App:React.FC = () => {
    return (
      <>
      <Router>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/landpage' element={<LandPage />} />
        </Routes>
      </Router>
      
      </>
    )
}

root.render(<App />);


