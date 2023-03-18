import style from './Acervo.module.css'

import {findAllBooks} from "../../../slices/bookSlice";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { Book } from "../../../interfaces/Book";

//componets
import CardBook from '../../../components/cardBook/CardBook';
import { NavLink } from 'react-router-dom';

const Acervo = () =>{

    const { books, loading, error, message } = useSelector((state:any)=> state.book);

    const dispath = useDispatch<any>();

    useEffect(()=>{
        dispath(findAllBooks());
    },[]);


    return(
        <div className="container-main">
            <div className={style.content_acervo}>
            <div className={style.title}><h1>Acervo</h1></div>
            <div className={style.content_books}>
                <div className={style.options}>
                    <NavLink className='btn' to='/book/new' >Cadastrar</NavLink>
                </div>
                <ul className={style.list_books}>
                    {books && books.map((book:Book)=>(
                    <div key={book.id}>
                        <CardBook 
                            gender={book.gender} 
                            image={book.image} 
                            name={book.name} 
                            quantity={book.quantity} 
                            id={book.id}
                        />
                    </div>
                    
                    ))}
                </ul>
            </div>
            </div>
        </div>
    )

}


export default Acervo;