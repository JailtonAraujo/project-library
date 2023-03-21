import style from './CheckInList.module.css';

//icons
import { GiReturnArrow } from 'react-icons/gi';
import { FiMoreVertical } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FcSearch } from 'react-icons/fc';

//hooks
import { useRef, useEffect, useState } from 'react';

//slices
import { findAll } from '../../../slices/checkInSlice';
import { useDispatch, useSelector } from 'react-redux';

import { environment } from '../../../environments';
import { Checkin } from '../../../interfaces/CheckIn';

const uploads = environment.uploads;

const CheckInList = () => {

    const modalRef = useRef<HTMLDivElement>(null);
    const [checkSelected, setCheckSelected] = useState(null) as any;
    const [optionSearch, setOptionSearch] = useState(0);
    const [argSearch, setArgSearch] = useState('');

    const dispatch = useDispatch<any>();

    const { checkInList, loading } = useSelector((state: any) => state.checkin);

    const actionsModal = (action: string) => {

        if (action === 'show') {
            modalRef.current?.classList.add('modal_show');
        } else if (action === 'close') {
            modalRef.current?.classList.remove('modal_show');
        }

    }

    const handleSearch = () =>{

            switch (optionSearch) {
                case 0:
                    break;
                case 1:
                    break;
                case 2:
                    break;
                default:
                    break;
            }        

        console.log(argSearch);
    }

    useEffect(() => {
        dispatch(findAll());
    }, [])

    if (loading) {
        return <> Loading... </>
    }

    return (
        <div className='container-main'>

            <div className={style.content_list}>
                <div className={style.title}>
                    <h1>Relação de emprestimos</h1>
                </div>

                <div className={style.search_container}>
                    <select name="select" onChange={(e)=>{setOptionSearch(Number(e.target.value))}}>
                        <option value="0" defaultValue={0} >Buscar Todos</option>
                        <option value="1">Buscar por Cliente</option>
                        <option value="2">Buscar por Data</option>
                    </select>
                    <div className={style.search_field}>
                        <input 
                            type={optionSearch === 2 ? 'date' : 'text'}
                            placeholder='Buscar por data ou nome do cliente'
                            onChange={(e)=>setArgSearch(e.target.value)} 
                        />
                        <button onClick={handleSearch}> <FcSearch /> </button>
                    </div>
                </div>

                <div className={style.checkin_tbl}>
                    <div className={style.header_tbl}>
                        <span>Cliente:</span>
                        <span>Livro:</span>
                        <span>Status:</span>
                        <span>Data entrega:</span>
                        <span>Ações</span>
                    </div>

                    {checkInList && checkInList.map((checkIn: Checkin) => (

                        <div className={style.row_tbl} key={checkIn.id}>
                            <span>{checkIn.customer.name}</span>
                            <span>{checkIn.book.name}</span>
                            <span>{checkIn.state}</span>
                            <span>{checkIn.checkout_date?.toString()}</span>
                            <span>
                                <button className='btn' title='Devolver!'><GiReturnArrow /></button>
                                <button className='btn' title='Detalhes!' onClick={() => { actionsModal('show'); setCheckSelected(checkIn) }}><FiMoreVertical /></button>
                            </span>

                        </div>
                    ))}
                </div>
            </div>

            <div className="modal " ref={modalRef}>
                <div className="body_modal">
                    <button className='close_modal' onClick={() => actionsModal('close')}> <AiFillCloseCircle /> </button>
                    <div className="title">
                        <h2>Detalhes do emprestimo.</h2>
                    </div>

                    {checkSelected && (

                        <div className={style.modal_content}>
                            <div className={style.details_checkin}>
                                <label className='form-group'>
                                    <span>Cliente</span>
                                    <input type="text" readOnly value={checkSelected.customer.name} />
                                </label>

                                <label className='form-group'>
                                    <span>Data do emprestimo:</span>
                                    <input type="text" readOnly value={checkSelected.checkin_date} />
                                </label>

                                <label className='form-group'>
                                    <span>Data prevista para devolução:</span>
                                    <input type="text" readOnly value={checkSelected.checkout_date} />
                                </label>

                                <label className='form-group'>
                                    <span>Valor a pagar:</span>
                                    <input type="text" readOnly value={checkSelected.valor} />
                                </label>
                            </div>
                            <div className={style.book_info}>
                                <img src={`${uploads}/books/${checkSelected.book.image}`} alt="img_book" />
                            </div>
                        </div>

                    )}

                </div>
            </div>
        </div>
    )
}

export default CheckInList