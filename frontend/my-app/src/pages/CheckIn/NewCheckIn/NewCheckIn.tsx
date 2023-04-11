import style from './NewCheckIn.module.css';

//components
import CardBook from '../../../components/cardBook/CardBook';

//hooks
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

//slices
import { finBookById } from '../../../slices/bookSlice';
import { finfByName } from '../../../slices/customerSlice';
import { checkIn } from '../../../slices/checkInSlice';

//icons
import { FcSearch } from 'react-icons/fc';
import { Customer } from '../../../interfaces/Customer';
import { Checkin } from '../../../interfaces/CheckIn';

const NewCheckIn = () => {

    const [nameSearch, setNameSearch] = useState('');

    const [customer, setCustomer] = useState(null) as any;
    // const [name, setName] = useState(customer ? customer.name : '');
    // const [email, setEmail] = useState(customer ? customer.email : '');

    const dispath = useDispatch<any>();

    const {id} = useParams();

    const navigate = useNavigate();

    const { book } = useSelector((state:any)=>state.book);
    const { customers } = useSelector((state:any)=>state.customer);
    const { loading } = useSelector((state:any)=>state.customer);


    useEffect(()=>{

        if(id){
            dispath(finBookById(Number(id)));
        }

    },[id,dispath]);

    const handleSearch = () =>{

        if(nameSearch){
            dispath(finfByName({name:nameSearch,offset:0}));
        }

    }

    const handleCheckIn = () =>{
        console.log(customer);
        console.log(book);

        const checkinData:Checkin = {
            book,
            customer,
        }

        dispath(checkIn(checkinData));

        navigate('/');
    }

  return (
    <div className='container-main'>
        <div className={style.container_checkin}>
        <div className={style.title}><h1>Alugar livro!</h1></div>
            <div className={style.content}>
            <div className={style.checkin_deteils}>
                  <div className="book_details">
                        <CardBook 
                            gender={book.gender} 
                            image={book.image} 
                            name={book.name} 
                            quantity={book.quantity} 
                            id={book.id}
                        />
                    </div>
                    <div className="customer_details">
                        <div className={style.search}>
                            <div className={style.search_field}>
                                <input type="text" placeholder='Buscar cliente por nome' onChange={(e)=>setNameSearch(e.target.value)}/>
                                <button className={style.btn_search} title='Buscar' onClick={handleSearch}><FcSearch/></button>
                            </div>
                            <div className={style.results}>

                                {customers && customers.map((customer:Customer)=>(
                                    <div className={style.row} key={customer.id}><button onClick={()=>{setCustomer(customer)}} >{customer.name}</button></div>
                                )) }
                            </div>
                        </div>

                       
                                 <div className={style.info}>
                            <label className='form-group'>
                                    <span>Nome:</span>
                                    <input type="text" name="name" readOnly value={customer ? customer.name : ''}/>
                            </label>
                            <label className='form-group'>
                                    <span>E-mail:</span>
                                    <input type="text" name="email" readOnly value={customer ? customer.email : ''}/>
                            </label>
                        </div>

                        {loading && (<button className='btn' disabled={customer ? false: true} onClick={handleCheckIn} >Aguarde...</button>)}                
                        {!loading && (<button className='btn' disabled={customer ? false: true} onClick={handleCheckIn} >Confirmar pedido!</button>)}    
                          
                    </div>
            </div>  
            </div>
        </div>
    </div>
  )
}

export default NewCheckIn