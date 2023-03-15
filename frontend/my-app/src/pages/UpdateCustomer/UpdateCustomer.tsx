import style from './UpdateCustomer.module.css';

import { Customer } from '../../interfaces/Customer';

//slices
import { finfById } from '../../slices/customerSlice';

//components
import CustomerForm from '../../components/CustomerForm/CustomerForm';

//hooks
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

const UpdateCustomer = () => {

    const {id} = useParams();

    const dispath = useDispatch<any>();

    const { customer } = useSelector((state:any)=> state.customer);


    useEffect(()=>{

        if(id){
             dispath(finfById(Number(id)));   
        }

    },[id]); 

    const handleSubmit = (customer:Customer) =>{

    }

  return (
    <div className="container-main">
        <div className={style.container_updatecustomer}>
            <div className={style.title}><h1>Cadastrar cliente</h1></div>
            <div className={style.content}>
                <CustomerForm btnLabel="Atualizar" handleSubmit={handleSubmit}/>
              </div>
        </div>
    </div>
  )
}

export default UpdateCustomer