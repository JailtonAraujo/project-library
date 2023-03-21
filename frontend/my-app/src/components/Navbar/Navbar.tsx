import style from './Navbar.module.css'

import { Link, NavLink } from 'react-router-dom';

const NavBar = () =>{

    return(
        <div className={style.navbar}>
            <div className={style.content_nav}>
                <div className={style.brand}>
                   <Link to='/'> <img src="https://cdn-icons-png.flaticon.com/512/3038/3038089.png" alt="img_brand" /></Link>
                </div>
                <ul className={style.links}>
                    <li><NavLink to='/'>HOME</NavLink></li>
                    <li><NavLink to='/customers'>CLIENTES</NavLink></li>
                    <li><NavLink to='/checkin'>EMPRÉSTIMOS</NavLink></li>
                </ul>
            </div>
        </div>
    )

}

export default NavBar;