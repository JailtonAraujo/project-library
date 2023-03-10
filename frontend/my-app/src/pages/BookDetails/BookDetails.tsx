import style from './BookDetails.module.css';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { environment } from '../../environments';

const uploads = environment.uploads;

const BookDetails = () => {

    const {id} = useParams();

    const { book, loading} = useSelector((state:any)=> state.book);

    useEffect(()=>{

    },[id])

  return (
    <div className='conatainer-main'>
        <div className="content">
            <div className="options"></div>
            <div className="book-details">
                <img src='' alt="img_book"/>
                <div className="info-book">
                    <p>Nome</p>
                    <p>Gender</p>
                    <p>Quantity</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default BookDetails