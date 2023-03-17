import style from './UpdateBook.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { Book } from '../../interfaces/Book';

//Components
import BookForm from "../../components/BookForm/BookForm"

//Slices
import {finBookById, updateBook} from '../../slices/bookSlice';

const UpdateBook = () => {

    const dispath = useDispatch<any>();

    const navigate = useNavigate();

    const { id } = useParams();

    const { book } = useSelector((state:any)=>state.book);

    useEffect(()=>{
        if(id){
            dispath(finBookById(Number(id)));
        }
    },[id,dispath]);

    const handleSubmit = (book:any) =>{

      if(book !== null){

        const formDate = new FormData();

        const bookFormData:any = Object.keys(book).forEach((key)=>formDate.append(key,book[key]));
  
        formDate.append('book',bookFormData);

        dispath(updateBook(formDate));
  
        navigate('/')

    }

    }

  return (
    <div className='container-main'>
      <div className={style.container_updatebook}>
        <div className={style.title}><h1>Atualizar livro.</h1></div>
        <div className={style.content}>
          <BookForm btnLabel="Atualizar" handleSubmit={handleSubmit} book={book}/>
        </div>
      </div>
    </div>
  )
}

export default UpdateBook