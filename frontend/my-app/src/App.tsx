import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

//components
import NavBar from './components/Navbar/Navbar';
import Acervo from './pages/Acervo/Acervo';
import NewBook from './pages/AddBook/NewBook';
import BookDetails from './pages/BookDetails/BookDetails';
import Footer from './components/Footer/Footer';

//hooks
import { ToastContainer } from './hooks/useToast';

function App() {
  return (
    <div className="App">
      <ToastContainer theme='dark'/>
      <BrowserRouter >
        <NavBar/>
        <Routes>
            <Route path='/' element={<Acervo/>} />

            <Route path='/book/new' element={<NewBook/>} />

            <Route path='/book/details/:id' element={<BookDetails/>} />
        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
