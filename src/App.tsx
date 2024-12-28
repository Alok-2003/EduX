import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Learn from './pages/Learn';
import Jobs from './pages/Jobs';
import Header from './Components/Header';
import Enterprise from './pages/Enterprise';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/enterprise" element={<Enterprise />} />
      </Routes>
    </Router>
  );
}

export default App;
