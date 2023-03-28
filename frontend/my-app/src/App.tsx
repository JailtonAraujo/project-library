import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

//components
import NavBar from './components/Navbar/Navbar';
import Acervo from './pages/Book/Acervo/Acervo';
import NewBook from './pages/Book/AddBook/NewBook';
import BookDetails from './pages/Book/BookDetails/BookDetails';
import Footer from './components/Footer/Footer';
import UpdateBook from './pages/Book/UpdateBook/UpdateBook';
import Customers from './pages/Customer/Customers/Customers';
import AddCustomer from './pages/Customer/AddCustomer/AddCustomer';
import UpdateCustomer from './pages/UpdateCustomer/UpdateCustomer';
import NewCheckIn from './pages/CheckIn/NewCheckIn/NewCheckIn';
import CheckInList from './pages/CheckIn/CheckInList/CheckInList';
import CheckOutList from './pages/CheckOut/CheckOutList/CheckOutList';

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

            <Route path='/book/checkin/:id' element={<NewCheckIn/>} />

            <Route path='/book/details/:id' element={<BookDetails/>} />

            <Route path='book/update/:id' element={<UpdateBook/>}/>

            <Route path='/customers' element={<Customers/>} />

            <Route path='/customers/new' element={<AddCustomer/>} />

            <Route path='/customers/update/:id' element={<UpdateCustomer/>} />

            <Route path='/checkin' element={<CheckInList/>} />
            <Route path='/checkout' element={<CheckOutList/>} />

        </Routes>
        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
