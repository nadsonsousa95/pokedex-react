
import './App.css';
import { Home } from './pages/Home/Home.jsx';
import { Link, Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import CardDetailPage from './pages/CardDetail/CardDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon/:id" element={<CardDetailPage />} />
      </Routes>
    </Router>
       
  );
}

export default App;
