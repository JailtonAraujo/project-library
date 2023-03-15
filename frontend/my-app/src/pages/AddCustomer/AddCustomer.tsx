import style  from "./AddCustomer.module.css";

//components
import CustomerForm from "../../components/CustomerForm/CustomerForm"

//hooks
import { Customer } from "../../interfaces/Customer";
import { useDispatch } from "react-redux";

//slices
import { newCustomer } from '../../slices/customerSlice';
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {

  const dispath = useDispatch<any>();
  const navigate = useNavigate();

  const handlerSubmit = (customer:Customer) =>{

   dispath(newCustomer(customer));

   navigate('/customers');

  } 


  return (
    <div className="container-main">
        <div className={style.container_newcustomer}>
            <div className={style.title}><h1>Cadastrar cliente</h1></div>
            <div className={style.content}>
                <CustomerForm btnLabel="Cadastrar" handleSubmit={handlerSubmit}/>
              </div>
        </div>
    </div>
  )
}

export default AddCustomer