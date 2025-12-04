import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './components/Create';
import Students from "./components/Students"; 
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/students" element={<Students />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </Router>
  );
}

export default App;
