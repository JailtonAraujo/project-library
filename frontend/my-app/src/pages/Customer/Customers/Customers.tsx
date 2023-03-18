import style from './Customers.module.css';

//icons
import { NavLink } from 'react-router-dom';

//slices
import { getAll, deleteCustomer } from '../../../slices/customerSlice';

//hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Customer } from '../../../interfaces/Customer';

const Customers = () => {

    const dispatch = useDispatch<any>();

    const { customers } = useSelector((state: any) => state.customer);

    useEffect(() => {
        dispatch(getAll());
    }, []);


    const handleDelete = (id:number) =>{

        if(window.confirm('Tem certeza que deseja delete este usuario?')){
            dispatch(deleteCustomer(id));
        }
    }


    return (
        <div className='container-main'>
            <div className={style.list_customers}>
                <div className={style.title}><h1>Lista de Clientes</h1></div>
                <div className={style.options}>
                    <NavLink className='btn' to='/customers/new'>Cadastrar</NavLink>
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
                                <button title='Excluir' onClick={()=> handleDelete(Number(customer.id))}  > <img src="/btn_delete.png" alt="" /> </button>
                                <NavLink to={`/customers/update/${customer.id}`} title='Atualizar'> <img src="/btn_update.png" alt="" /> </NavLink>
                            </li>
                            }
                        </div>

                    ))}
                </div>
            </div>
        </div>
    )
}

export default Customers