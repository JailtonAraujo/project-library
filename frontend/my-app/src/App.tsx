import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

//components
import NavBar from './components/Navbar/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Routes>

        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;