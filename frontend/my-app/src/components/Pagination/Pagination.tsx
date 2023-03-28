import style from './Pagination.module.css';

//icons
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import ReactPaginate from 'react-paginate';

export interface Propspagination{
  handlePaginate:any,
  pageCount:number,
  itensPerPage:number,
  totalElements?:number
}

const Pagination = (props:Propspagination) => {

  const handlePageClick = (event: any) => {
    const offset = Number(event.selected * props.itensPerPage);

    props.handlePaginate(offset);

  }

  return (
    <div className={style.container_pagination}>
        <div className={style.content_pagination}>
        <ReactPaginate
                    breakLabel="..."
                    nextLabel={<GrFormNext/>}
                    onPageChange={handlePageClick}
                    pageCount={props.pageCount}
                    previousLabel={<GrFormPrevious/>}
                    containerClassName={style.content_pagination}
                    pageLinkClassName={style.list_element}
                    nextLinkClassName={style.btn_next}
                    previousLinkClassName={style.btn_previus} 
                    activeLinkClassName={style.select_element}  
                />
        </div>
        {props.totalElements && (
          <p>{props.totalElements} Resuldados encontrados...</p>
        )}
    </div>
  )
}

export default Pagination