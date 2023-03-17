import style from './BookDetails.module.css';

import 'react-toastify/dist/ReactToastify.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { environment } from '../../environments';

import { useNavigate } from 'react-router-dom';

//slices
import { finBookById,deleteBook } from '../../slices/bookSlice';

const uploads = environment.uploads;

const BookDetails = () => {

    const { id } = useParams();

    const dispath = useDispatch<any>();

    const navigate = useNavigate();

    const { book, loading } = useSelector((state: any) => state.book);

    useEffect(() => {

        dispath(finBookById(Number(id)));

    }, [id]);

    const handleDelete = () =>{

        //to do
        //Check in backend if book are in pending check 

        if( window.confirm(`Tem certeza que deseja deletar o livro ${book.name} ?`) ){
            dispath(deleteBook(Number(id))); 
            
            navigate('/acervo');
        }

    } 

    return (
        <div className='container-main'>
            <div className={style.container_details}>
            <div className={style.options}>
                        <button className={`btn ${style.btn_delete}`} onClick={handleDelete} >Excluir</button>
                        <NavLink className={`btn ${style.btn_update}`} to={`/book/update/${id}`} >Atualizar</NavLink>
                        <NavLink className={`btn ${style.btn_checkin}`} to={`/book/checkin/${id}`} >Alugar</NavLink>
                    </div>
                <div className={style.content_details}>
                    <div className={style.book_details}>
                        <img src={`${uploads}/books/${book.image}`} alt="img_book" />
                        <div className={style.info_book}>
                            <p>Nome: {book.name}</p>
                            <p>Genêro: {book.gender}</p>
                            <p>Quantidade: {book.quantity}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetails