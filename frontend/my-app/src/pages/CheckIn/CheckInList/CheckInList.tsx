import style from './CheckInList.module.css';

import Pagination from '../../../components/Pagination/Pagination';
import Loading from '../../../components/Loading/Loading';

//icons
import { GiReturnArrow } from 'react-icons/gi';
import { FiMoreVertical } from 'react-icons/fi';
import { AiFillCloseCircle } from 'react-icons/ai';
import { FcSearch } from 'react-icons/fc';

//hooks
import { useRef, useEffect, useState } from 'react';

//slices
import { findAll, findByCustomerName, findByDateInterval, checkOut as checkOutSlice} from '../../../slices/checkInSlice';
import { useDispatch, useSelector } from 'react-redux';

import { environment } from '../../../environments';
import { Checkin } from '../../../interfaces/CheckIn';
import { CheckOut } from '../../../interfaces/CheckOut';

const uploads = environment.uploads;

const CheckInList = () => {

    const modalRef = useRef<HTMLDivElement>(null);
    const adiveStatusRef = useRef<HTMLDivElement>(null);

    const [checkSelected, setCheckSelected] = useState(null) as any;

    const [optionSearch, setOptionSearch] = useState(0);
    const [nameSearch, setNameSearch] = useState('');

    const [initialDate, setInitialDate] = useState('');
    const [finalDate, setFinalDate] = useState('');

    const dispatch = useDispatch<any>();

    const { checkInList, totalElements, totalPages, loading } = useSelector((state: any) => state.checkin);

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
                dispatch(findByCustomerName({ offset: 0, name: nameSearch }));
                break;
            case 2:
                dispatch(findByDateInterval({ offset: 0, initialDate, finalDate }));
                break;
            default:
                break;
        }

    }

    const handlePaginate = (offset: number) => {

        // dispatch(findAll(offset));

        switch (optionSearch) {
            case 0:
                dispatch(findAll(offset));
                break;
            case 1:
                dispatch(findByCustomerName({ offset: offset, name: nameSearch }));
                break;
            case 2:
                dispatch(findByDateInterval({ offset, initialDate, finalDate }));
                break;
            default:
                break;
        }


    }

    const handleCheckOut = (checkIn: Checkin) => {

        const checkOut: CheckOut = {
            book: checkIn.book,
            customer: checkIn.customer,
            checkInId: Number(checkIn.id),
        }

        dispatch(checkOutSlice(checkOut));

    }

    useEffect(() => {
        dispatch(findAll(0));
    }, [dispatch])

    return (
        <div className='container-main'>

            {loading && (
                <> <Loading/></>
            )}

            <div className={style.content_list}>
                <div className={style.title}>
                    <h1>Relação de emprestimos</h1>
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

                <h3>{totalElements} resultados encontrados...</h3>

                <div className={style.checkin_tbl}>
                    <div className={style.header_tbl}>
                        <span>Cliente:</span>
                        <span>Livro:</span>
                        <span>Status:</span>
                        <span>Data entrega:</span>
                        <span>Ações</span>
                    </div>

                    {checkInList.length > 0 && checkInList.map((checkIn: Checkin) => (

                        <div className={style.row_tbl} key={checkIn.id}>
                            <span>{checkIn.customer.name}</span>
                            <span>{checkIn.book.name}</span>
                            <span>{checkIn.state}</span>
                            <span>{new Date(String(checkIn.checkout_date)).toLocaleDateString()}</span>
                            <span>
                                <button className='btn' title='Devolver!' onClick={() => handleCheckOut(checkIn)}><GiReturnArrow /></button>
                                <button className='btn' title='Detalhes!' onClick={() => { actionsModal('show'); setCheckSelected(checkIn) }}><FiMoreVertical /></button>
                            </span>

                        </div>
                    ))}
                </div>


                <Pagination
                    handlePaginate={handlePaginate}
                    pageCount={totalPages}
                    itensPerPage={10}
                />

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
                                    <input type="text" readOnly value={new Date(checkSelected.checkin_date).toLocaleDateString() } />
                                </label>

                                <label className='form-group'>
                                    <span>Data prevista para devolução:</span>
                                    <input type="text" readOnly value={new Date(checkSelected.checkout_date).toLocaleDateString()} />
                                </label>

                                {(checkSelected.daysLate > 0) && (
                                    <>
                                        <label className='form-group'>
                                            <span>Taxa por atraso:</span>
                                            <input type="text" readOnly value={`R$ ${Number(checkSelected.taxa).toFixed(2)}`} />
                                        </label>

                                        <label className='form-group'>
                                            <span>Dias atrasados:</span>
                                            <input type="text" readOnly value={checkSelected.daysLate} />
                                        </label>
                                    </>
                                )}

                                <label className='form-group'>
                                    <span>Valor a pagar:</span>
                                    <input type="text" readOnly value={`R$ ${Number(checkSelected.valor).toFixed(2)}`} />
                                </label>

                            </div>
                            <div className={style.book_info}>
                                <img src={`${uploads}/books/${checkSelected.book.image}`} alt="img_book" />
                                {(checkSelected.daysLate > 0) && (
                                    <div className={style.status}
                                        onMouseOver={() => { adiveStatusRef.current!.style.display = "block"; }}
                                        onMouseLeave={() => { adiveStatusRef.current!.style.display = "none"; }}> <span className={style.status_late}>
                                            <div ref={adiveStatusRef} className={`${style.advice} `} >Clientes que fizeram a devolução após o prazo terão
                                                multa aplicada de R$1,50 para cada dia de atrazo aplicada ao valor pago alem disso poderão sofrer limitações na plataforma,
                                                como a diminuição da quantidade de emprestimos por vez entre outras!</div>
                                        </span> livro com atrazo na entrega. </div>
                                )}
                            </div>
                        </div>

                    )}

                </div>
            </div>
        </div>
    )
}


export default CheckInList