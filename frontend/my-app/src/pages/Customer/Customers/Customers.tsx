import style from './Customers.module.css';

//icons
import { NavLink } from 'react-router-dom';
import { FcSearch } from 'react-icons/fc';

//slices
import { getAll, deleteCustomer, finfByName } from '../../../slices/customerSlice';

//hooks
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

//components
import Pagination from '../../../components/Pagination/Pagination';
import { Customer } from '../../../interfaces/Customer';


const Customers = () => {

    const dispatch = useDispatch<any>();

    const [search, setSearch] = useState('');

    const { customers, totalPages, totalElements } = useSelector((state: any) => state.customer);

    useEffect(() => {
        dispatch(getAll(0));
    }, []);


    const handleDelete = (id: number) => {

        if (window.confirm('Tem certeza que deseja delete este usuario?')) {
            dispatch(deleteCustomer(id));
        }
    }

    const handlePaginate = (offset:number) =>{
        if(search){
            dispatch(finfByName({name:search,offset}));
            return;
        }
        dispatch(getAll(offset));
    }


    const handleSearch = () =>{
        dispatch(finfByName({name:search,offset:0}));
    }


    return (
        <div className='container-main'>
            <div className={style.list_customers}>
                <div className={style.title}><h1>Lista de Clientes</h1></div>
                <div className={style.options}>
                    <NavLink className='btn' to='/customers/new'>Cadastrar</NavLink>
                    <div className={style.search_field}>
                        <input type="text" placeholder='Buscar por nome' onChange={(e)=>setSearch(e.target.value)}/>
                        <button onClick={handleSearch} > <FcSearch /> </button>
                    </div>
                </div>
               
                <div className={style.content_tbl}>
                    <div className={style.header_tbl}>
                        <span>Name:</span>
                        <span>Email:</span>
                        <span>Ações:</span>
                    </div>

                    {(customers.length > 0) && customers.map((customer: Customer) => (
                        <div className={style.row_tbl} key={customer.id}>
                            <li>{customer.name}</li>
                            <li>{customer.email}</li>

                            {customer &&
                                <li className={style.tbl_actions}>
                                    <button title='Excluir' onClick={() => handleDelete(Number(customer.id))}  > <img src="/btn_delete.png" alt="" /> </button>
                                    <NavLink to={`/customers/update/${customer.id}`} title='Atualizar'> <img src="/btn_update.png" alt="" /> </NavLink>
                                </li>
                            }
                        </div>

                    ))}
                </div>
                <Pagination
                handlePaginate={handlePaginate}
                itensPerPage={10}
                pageCount={totalPages}
                totalElements={totalElements}
                />
            </div>
        </div>
    )
}

export default Customers