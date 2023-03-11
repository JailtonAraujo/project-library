import style from './NewBook.module.css'

//components
import BookForm from "../../components/BookForm/BookForm"

import { newBook } from '../../slices/bookSlice';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

const NewBook = () => {

  const dispath = useDispatch<any>();

  const [book ,setBook] = useState(null);


  useEffect(()=>{

    if(book !== null){
      
      const formDate = new FormData();

      const bookFormData:any = Object.keys(book).forEach((key)=>formDate.append(key,book[key]));

      formDate.append('book',bookFormData);

      dispath(newBook(formDate));

    }

  },[book])


  const handleSubmit = (e:any) =>{

  }

  return (
    <div className='container-main'>
      <div className={style.container_newbook}>
        <div className={style.title}><h1>Cadastrar livro.</h1></div>
        <div className={style.content}>
          <BookForm btnLabel="Cadastrar" setBook={setBook}/>
        </div>
      </div>
    </div>
  )
}

export default NewBook