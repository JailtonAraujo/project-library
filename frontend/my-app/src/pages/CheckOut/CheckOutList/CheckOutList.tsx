import style from './CheckOutList.module.css';

//hooks
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//icons
import { AiFillCloseCircle } from "react-icons/ai";
import { FcSearch } from "react-icons/fc";
import { FiMoreVertical } from 'react-icons/fi';

//components
import Pagination from "../../../components/Pagination/Pagination";

import { environment } from "../../../environments";

//slice
import { findAll,findByCustomer,findByDateInterval } from '../../../slices/checkOutSlice';

import { CheckOut } from '../../../interfaces/CheckOut';



const uploads = environment.uploads;

const CheckOutList = () => {


    const modalRef = useRef<HTMLDivElement>(null);
    const [checkSelected, setCheckSelected] = useState(null) as any;

    const [optionSearch, setOptionSearch] = useState(0);
    const [nameSearch, setNameSearch] = useState('');

    const adiveStatusRef = useRef<HTMLDivElement>(null);

    const [initialDate, setInitialDate] = useState('');
    const [finalDate, setFinalDate] = useState('');

    const dispatch = useDispatch<any>();

    const { listCheckOut, totalElements, totalPages } = useSelector((state: any) => state.checkout);

    const actionsModal = (action: string) => {

        if (action === 'show') {
            modalRef.current?.classList.add('modal_show');
        } else if (action === 'close') {
            modalRef.current?.classList.remove('modal_show');
        }

    }

    const handleSearch = () => {

        /*
            CASE 0 -> FIND ALL CHECKINS;
            CASE 1 -> FIND BY CUSTOMER NAME;
            CASE 2 -> FIND BY DATE INTERVAL;
        */

        switch (optionSearch) {
            case 0:
                dispatch(findAll(0));
                break;
            case 1:
                dispatch(findByCustomer({ offset: 0, name:nameSearch }));
                break;
            case 2:
                dispatch(findByDateInterval({offset:0,initialDate,finalDate}));
                break;
            default:
                break;
        }

    }

    const handlePaginate = (offset: number) => {

        switch (optionSearch) {
            case 0:
                dispatch(findAll(offset));
                break;
            case 1:
                dispatch(findByCustomer({ offset:offset, name:nameSearch }));
                break;
            case 2:
                dispatch(findByDateInterval({offset,initialDate,finalDate}));
                break;
            default:
                break;
        }


    }

    useEffect(() => {
        dispatch(findAll(0));
    }, [])

    return (
        <div className='container-main'>

            <div className={style.content_list}>
                <div className={style.title}>
                    <h1>Relação de devoluções</h1>
                </div>

                <div className={style.search_container}>
                    <select name="select" onChange={(e) => { setOptionSearch(Number(e.target.value)) }}>
                        <option value="0" defaultValue={0} >Buscar Todos</option>
                        <option value="1">Buscar por Cliente</option>
                        <option value="2">Buscar por Intervalo</option>
                    </select>
                    <div className={style.search_field}>

                        {(optionSearch <= 1) && (
                            <input
                                type='text'
                                placeholder='Buscar por data ou nome do cliente'
                                onChange={(e) => setNameSearch(e.target.value)}
                            />
                        )}

                        {(optionSearch === 2) && (
                            <div className={style.data_interval}>
                                <label>
                                    <span>Data inicial:</span>
                                    <input type="date" onChange={(e) => setInitialDate(e.target.value)} />
                                </label>
                                <label>
                                    <span>Data final:</span>
                                    <input type="date" onChange={(e) => setFinalDate(e.target.value)} />
                                </label>
                            </div>
                        )}


                        <button onClick={handleSearch}> <FcSearch /> </button>
                    </div>
                </div>

                <div className={style.checkout_tbl}>
                    <div className={style.header_tbl}>
                        <span>Cliente:</span>
                        <span>Livro:</span>
                        <span>Data da devolução:</span>
                        <span>Ações:</span>
                    </div>

                    {listCheckOut.length > 0 && listCheckOut.map((checkOut: CheckOut) => (

                        <div className={style.row_tbl} key={checkOut.id}>
                            <span>{checkOut.customer.name}</span>
                            <span>{checkOut.book.name}</span>
                            <span>{new Date(String(checkOut.dateCheckOut)).toLocaleDateString()}</span>
                            <span>
                                <button className='btn' title='Detalhes!' onClick={() => { actionsModal('show'); setCheckSelected(checkOut) }}><FiMoreVertical /></button>
                            </span>

                        </div>
                    ))}
                </div>


                <Pagination
                    handlePaginate={handlePaginate}
                    pageCount={totalPages}
                    itensPerPage={10}
                    totalElements={totalElements}
                />

            </div>

            <div className="modal " ref={modalRef}>
                <div className="body_modal">
                    <button className='close_modal' onClick={() => actionsModal('close')}> <AiFillCloseCircle /> </button>
                    <div className="title">
                        <h2>Detalhes da Davolução.</h2>
                    </div>

                    {checkSelected && (

                        <div className={style.modal_content}>
                            <div className={style.details_checkin}>
                                <label className='form-group'>
                                    <span>Cliente</span>
                                    <input type="text" readOnly value={checkSelected.customer.name} />
                                </label>

                                <label className='form-group'>
                                    <span>Data da devolução:</span>
                                    <input type="text" readOnly value={new Date(String(checkSelected.dateCheckOut)).toLocaleDateString()} />
                                </label>

                                <label className='form-group'>
                                    <span>Dias atrasados:</span>
                                    <input type="text" readOnly value={`${checkSelected.diasAtraso} Dias`} />
                                </label>

                                <label className='form-group'>
                                    <span>Taxa por atraso:</span>
                                    <input type="text" readOnly value={`R$ ${Number(checkSelected.taxaAtraso).toFixed(2)}`} />
                                </label>

                                <label className='form-group'>
                                    <span>Valor pago:</span>
                                    <input type="text" readOnly value={`R$ ${Number(checkSelected.valorPago).toFixed(2)}`} />
                                </label>
                            </div>
                            <div className={style.book_info}>
                                <img src={`${uploads}/books/${checkSelected.book.image}`} alt="img_book" />

                                {checkSelected.taxaAtraso > 0 && (
                                    <div className={style.status}
                                        onMouseOver={() => { adiveStatusRef.current!.style.display = "block"; }}
                                        onMouseLeave={() => { adiveStatusRef.current!.style.display = "none"; }}> <span className={style.status_late}>
                                            <div ref={adiveStatusRef} className={`${style.advice} `} >Clientes que fizeram a devolução após o prazo terão
                                                multa aplicada ao valor pago e poderão sofrer limitações na plataforma,
                                                como a diminuição da quantidade de emprestimos por vez entre outras!</div>
                                        </span> livro entregue após o prazo. </div>
                                )}

                            </div>

                        </div>

                    )}

                </div>
            </div>
        </div>
    )
}

export default CheckOutList