import { Link, NavLink } from 'react-router-dom'
import { environment } from '../../environments'
import { Book } from '../../interfaces/Book'
import './CardBook.css'

const uploads = environment.uploads;

const CardBook = ( book:Book ) => {

  return (
    <div className='card'>
      <NavLink to={`/book/details/${book.id}`}>
      <div className="content-card">
        <img src={`${uploads}/books/${book.image}`} alt="imgBook" />
        <div className="bootom-card">
          <p>Nome: {book.name}</p>
          <p>Genêro: {book.gender}</p>
          <p>quantidade: {book.quantity}</p>
        </div>
      </div>
      </NavLink>
    </div>
  )
}

export default CardBook