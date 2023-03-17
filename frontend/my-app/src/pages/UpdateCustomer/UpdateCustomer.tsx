import style from './UpdateCustomer.module.css';

import { Customer } from '../../interfaces/Customer';

//slices
import { finfById,updateCustomer } from '../../slices/customerSlice';

//components
import CustomerForm from '../../components/CustomerForm/CustomerForm';

//hooks
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const UpdateCustomer = () => {

    const {id} = useParams();

    const dispath = useDispatch<any>();

    const navigate = useNavigate();

    const { customer,success } = useSelector((state:any)=> state.customer);


    useEffect(()=>{

        if(id){
             dispath(finfById(Number(id)));   
        }

    },[id]); 

    const handleSubmit = (customer:Customer) =>{

     dispath(updateCustomer(customer));

      navigate('/customers')

    }

  return (
    <div className="container-main">
        <div className={style.container_updatecustomer}>
            <div className={style.title}><h1>Cadastrar cliente</h1></div>
            <div className={style.content}>
              {customer.id && 
                 <CustomerForm btnLabel="Atualizar" handleSubmit={handleSubmit} customer={customer}/>
              }
              </div>
        </div>
    </div>
  )
}

export default UpdateCustomer