import style from './NewBook.module.css'

//components
import BookForm from "../../components/BookForm/BookForm"

const NewBook = () => {
  return (
    <div className='container-main'>
      <div className={style.container_newbook}>
        <div className={style.title}><h1>Cadastrar livro.</h1></div>
        <div className={style.content}>
          <BookForm btnLabel="Cadastrar" />
        </div>
      </div>
    </div>
  )
}

export default NewBook