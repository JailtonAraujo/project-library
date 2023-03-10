import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

//components
import NavBar from './components/Navbar/Navbar';
import Acervo from './pages/Acervo/Acervo';
import NewBook from './pages/AddBook/NewBook';
import BookDetails from './pages/BookDetails/BookDetails';

function App() {
  return (
    <div className="App">
      <BrowserRouter >
        <NavBar/>
        <Routes>
            <Route path='/acervo' element={<Acervo/>} />

            <Route path='/book/new' element={<NewBook/>} />

            <Route path='/book/details/:id' element={<BookDetails/>} />
        </Routes>
      
      </BrowserRouter>
    </div>
  );
}

export default App;
