import './BookForm.css'

import { useState } from 'react'
import { Book } from '../../interfaces/Book';
import { environment } from '../../environments';

export interface FomrBookProps {
    book?:Book,
    btnLabel:string
}

const uploads = environment.uploads;

const BookForm = (props:FomrBookProps) => {

    const book = props.book;

    const [id, setId] = useState(book ? book.id : 0);
    const [name, setName] = useState(book ? book.name : '');
    const [gender, setGender] = useState(book ? book.gender : '');
    const [quantity, setQuantity] = useState(book ? book.quantity : 0);
    const [image, setImage] = useState(book ? book.image : "");
    const [previwImage, setPreviwImage] = useState();

    const handleSubmit = (e:any) =>{

        e.preventDefault();

        const book:Book={
            name,
            gender,
            image,
            quantity,
            id
        }

        console.log(book);

    }

    const handleImage = (e:any) =>{

        const image = e.target.files[0];

        setPreviwImage(image);

        setImage(image);

    }

  return (
    <div className='book-form'>
        <form className='form-control' onSubmit={handleSubmit} >

           
                <label className="form-group">
                    <span>Nome:</span>
                    <input 
                    type="text" 
                    placeholder='nome do livro'
                    onChange={(e)=> setName(e.target.value)}
                    value={name}
                    />
                </label>
            

           
                <label className="form-group">
                    <span>Genêro:</span>
                    <input 
                    type="text" 
                    placeholder='genêro do livro'
                    onChange={(e)=> setGender(e.target.value)}
                    value={gender}
                    />
                </label>
            

           
                <label className="form-group">
                    <span>Quantidade:</span>
                    <input 
                    type="number" 
                    placeholder='Quantidade do livro'
                    onChange={(e)=> setQuantity(Number(e.target.value))}
                    value={quantity}
                    />
                </label>

                <div className="previw-image">
                    <span>Preview Image:</span>
                    {(image || previwImage) && (
                        <>
                            <img src={previwImage ? URL.createObjectURL(previwImage) : `${uploads}/books/${image}`} 
                            alt="img_preview" />
                        </>
                    )}
                </div>

           
                <label className="form-group">
                    <span>Imagem:</span>
                    <input 
                    type="file" 
                    placeholder='Imagem do livro'
                    onChange={handleImage}
                    />
                </label>
            
            
            <input type="submit" value={props.btnLabel} className='btn' />
        </form>
    </div>
  )
}

export default BookForm