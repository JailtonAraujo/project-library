import style from './Acervo.module.css'

import { findAllBooks, findByName, findByGender } from "../../../slices/bookSlice";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { Book } from "../../../interfaces/Book";

//componets
import CardBook from '../../../components/cardBook/CardBook';
import { NavLink } from 'react-router-dom';
import Pagination from '../../../components/Pagination/Pagination';
import { FcSearch } from 'react-icons/fc';

const Acervo = () => {

    const [search, setSearch] = useState('');
    const [opcSearch, setOpcSearch] = useState(0);

    const { books, totalElements, totalPages, loading, error, message } = useSelector((state: any) => state.book);

    const dispath = useDispatch<any>();

    const handlePaginate = (offset: number) => {
        dispath(findAllBooks(offset));
    }

    const handleSearch = () => {
        handleSearchPaginate(0);
    }



    const handleSearchPaginate = (offset:number) => {

        switch (opcSearch) {
            case 0:
                dispath(findAllBooks(offset));
                break;
            case 1:
                if(search){dispath(findByName({ name: search, offset: offset }));}
                break
            case 2:
                if(search){dispath(findByGender({name:search,offset:offset}))}
                break
            default:
                dispath(findAllBooks(0));
                break;
        }
    }

    useEffect(() => {
        dispath(findAllBooks(0));
    }, []);


    return (
        <div className="container-main">
            <div className={style.content_acervo}>
                <div className={style.title}><h1>Acervo</h1></div>
                <div className={style.content_books}>
                    <div className={style.options}>
                        <NavLink className='btn' to='/book/new' >Cadastrar</NavLink>

                        <div className={style.content_search}>
                            <select name="select" onChange={(e)=>setOpcSearch(Number(e.target.value))}>
                                <option value="0" defaultValue={0} >Buscar Todos</option>
                                <option value="1">Buscar por Nome</option>
                                <option value="2">Buscar por Categoria</option>
                            </select>

                            <div className={style.search_field}>
                                <input type="text" placeholder='Buscar por nome' onChange={(e) => setSearch(e.target.value)} />
                                <button onClick={handleSearch} > <FcSearch /> </button>
                            </div>
                        </div>

                    </div>
                    <ul className={style.list_books}>
                        {(books.length > 0) && books.map((book: Book) => (
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
            <Pagination
                itensPerPage={12}
                pageCount={totalPages}
                handlePaginate={handlePaginate}
                totalElements={totalElements} />
        </div>
    )

}


export default Acervo;