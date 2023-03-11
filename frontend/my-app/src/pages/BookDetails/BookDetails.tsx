import style from './BookDetails.module.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { environment } from '../../environments';

import { finBookById } from '../../slices/bookSlice';

const uploads = environment.uploads;

const BookDetails = () => {

    const { id } = useParams();

    const dispath = useDispatch<any>();

    const { book, loading } = useSelector((state: any) => state.book);

    useEffect(() => {

        dispath(finBookById(Number(id)));

    }, [id])

    return (
        <div className='container-main'>
            <div className={style.container_details}>
            <div className={style.options}>
                        <button className='btn'>Excluir</button>
                        <button className='btn' >Atualizar</button>
                        <button className='btn'>Realizar Emprestimo</button>
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