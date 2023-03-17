import { useState } from 'react';
import { Customer } from '../../interfaces/Customer';

export interface CustomerProps {
  customer?:Customer,
  handleSubmit:any,
  btnLabel:string
}

const CustomerForm = (props:CustomerProps) => {


  const [customer, setCustomer] = useState(props.customer ? props.customer : null);
  const [id, setId] = useState(customer ? customer.id : 0);
  const [name, setName] = useState(customer ? customer.name : '');
  const [email, setEmail] = useState(customer ? customer.email : '');

  const dataEmitter = (e:any) =>{

    e.preventDefault();

    const customer:Customer={
      id,
      name,
      email
    }

    props.handleSubmit(customer);
  }

  return (

    <div className='customer-form'>
         <form className='form-control' onSubmit={(e)=>dataEmitter(e)}>

            <label className='form-group'>
                <span>Nome:</span>
                <input 
                  type="text" 
                  name='name'
                  onChange={(e)=> setName(e.target.value)}
                  value={name}
                />
            </label>

            <label className='form-group'>
                <span>E-mail:</span>
                <input 
                  type="email" 
                  name="email"
                  required
                  onChange={(e)=> setEmail(e.target.value)}
                  value={email}
                />
            </label>

            <input type="submit" value='salvar' className="btn"/>

        </form>   
    </div>
  )
}

export default CustomerForm