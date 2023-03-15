import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

//components
import NavBar from './components/Navbar/Navbar';
import Acervo from './pages/Acervo/Acervo';
import NewBook from './pages/AddBook/NewBook';
import BookDetails from './pages/BookDetails/BookDetails';
import Footer from './components/Footer/Footer';
import UpdateBook from './pages/UpdateBook/UpdateBook';
import Customers from './pages/Customers/Customers';
import AddCustomer from './pages/AddCustomer/AddCustomer';
import UpdateCustomer from './pages/UpdateCustomer/UpdateCustomer';

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

            <Route path='/customers' element={<Customers/>} />

            <Route path='/customers/new' element={<AddCustomer/>} />

            <Route path='/book/new' element={<NewBook/>} />

            <Route path='/customers/update/:id' element={<UpdateCustomer/>} />

            <Route path='/book/details/:id' element={<BookDetails/>} />

            <Route path='book/update/:id' element={<UpdateBook/>}/>

        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
