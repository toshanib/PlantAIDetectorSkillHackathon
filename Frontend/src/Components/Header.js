import { NavLink } from 'react-router-dom'
import './Header.css'

const Header = () =>  {
    return( 
    <div className='headerContainer'>
        <header>
            <NavLink to='/' activeClassName="is_active" exact={true}><h1 className="header_title">Plant Disease Classification</h1></NavLink>
            <nav>
                <ul className="nav_links">
                    <li><NavLink to='/prediction_classes' activeClassName="is_active" exact={true}><i className="fas fa-scroll"></i> Prediction Labels</NavLink></li>

                </ul>
            </nav>
        </header>
    </div>
    )
}

export default Header;