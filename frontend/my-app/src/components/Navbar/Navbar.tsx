import './Navbar.css'

import { Link, NavLink } from 'react-router-dom';

const NavBar = () =>{

    return(
        <div className="navbar">
            <div className="content-nav">
                <div className="brand">
                   <Link to='/'> <img src="https://cdn-icons-png.flaticon.com/512/3038/3038089.png" alt="img_brand" /></Link>
                </div>
                <ul className="links">
                    <li><NavLink to='/'>HOME</NavLink></li>
                    <li><NavLink to='/'>CLIENTES</NavLink></li>
                    <li><NavLink to='/'>EMPRÉSTIMOS</NavLink></li>
                </ul>
            </div>
        </div>
    )

}

export default NavBar;