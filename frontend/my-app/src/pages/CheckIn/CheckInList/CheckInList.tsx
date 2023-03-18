import style from './CheckInList.module.css';

//icons
import { GiReturnArrow } from 'react-icons/gi';

const CheckInList = () => {
  return (
    <div className='container-main'>
        <div className={style.content_list}>
            <div className={style.title}>
                <h1>Relação de emprestimos</h1>
            </div>
            <div className={style.checkin_tbl}>
                <div className={style.header_tbl}>
                    <span>Cliente:</span>
                    <span>Livro:</span>
                    <span>Status:</span>
                    <span>Data entrega:</span>
                    <span>Ações</span> 
                </div>

                <div className={style.row_tbl}>
                    <span>Jailton de Araujo Santos</span>
                    <span>Inferno</span>
                    <span>PENDENTE</span>
                    <span>26/03/2023</span>
                     <span><button className='btn' title='Devolver!'><GiReturnArrow/></button></span> 
                </div>

                <div className={style.row_tbl}>
                    <span>Jailton de Araujo Santos</span>
                    <span>Inferno</span>
                    <span>PENDENTE</span>
                    <span>26/03/2023</span>
                     <span><button className='btn' title='Devolver!'><GiReturnArrow/></button></span> 
                </div>

                <div className={style.row_tbl}>
                    <span>Jailton de Araujo Santos</span>
                    <span>Inferno</span>
                    <span className={style.late}>PENDENTE</span>
                    <span>26/03/2023</span>

                    <span><button className='btn' title='Devolver!'><GiReturnArrow/></button></span> 
                </div>

            </div>
        </div>
    </div>
  )
}

export default CheckInList