import style from './Loading.module.css';

const Loading = () => {
  return (
    <div className={style.container_loading}>
        <div className={style.loading}>
            <div className={style.spinner}>
            </div>
            <p>Loading...</p>
        </div>
    </div>
  )
}

export default Loading;