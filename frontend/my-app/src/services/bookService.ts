import { environment } from '../environments';
import { Book } from '../interfaces/Book';

const bookEndPoint = `${environment.baseApicustomersAndBooks}/book`;


const findAllBooks = async () => {

    try {

        const data = await fetch(`${bookEndPoint}/`)
            .then((res) => res.json())
            .catch((err) => err);

        return data;

    } catch (error) {
        console.log(error);
    }

}

const findById = async (id:number) =>{

    try {
        
        const data = await fetch(`${bookEndPoint}/${id}`)
            .then((res)=>res.json())
            .catch((err)=>err);

            return data;

    } catch (error) {
        console.log(error);
    }
}

const newBook = async (bookData:any) =>{

    const config ={
        method:'POST',
        body:bookData,
        headers:{}
    }

    try {
        
        const data = await fetch(`${bookEndPoint}/`,config)
            .then((res) => res.json())
            .catch((err)=>err);

            return data;

    } catch (error) {
        console.log(error);
    }

}

const deleteBook = async (id:number) =>{

    try {
        
        const data = await fetch(`${bookEndPoint}/${id}`,{method:'DELETE'})
            .then((res)=>res.json())
            .catch((err)=>err);

        return data;

    } catch (error) {
        console.log(error);
    }

}

const updateBook = async (bookData:any) =>{

    const config ={
        method:'PATCH',
        body:bookData,
        headers:{}
    }

    try {
        
        const data = await fetch(`${bookEndPoint}/update`,config)
            .then((res)=>res.json())
            .catch((err)=>err);

            return data

    } catch (error) {
        console.log(error);
    }

}


const bookService = {
    findAllBooks,
    findById,
    newBook,
    deleteBook,
    updateBook
}

export default bookService;