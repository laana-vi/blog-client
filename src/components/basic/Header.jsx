import { useState } from "react"
import { useHistory } from "react-router-dom"
import { NavLink } from 'react-router-dom';
import { axiosInstance } from "../../service"
import { StyledHeader } from "../styled/StyledHeader"
import { FaLongArrowAltLeft } from "react-icons/fa";



const Header = ({ user }) => {
    const history = useHistory()
    const [open, setOpen] = useState(false)

    return (
        <StyledHeader open={open}>
            {
                user ?
                    <nav className='header-container'>
                        <NavLink exact to='/home'><img className='pic' src='https://res.cloudinary.com/dpj7zvqzs/image/upload/v1614626528/media/posts/logo_tnx6vv.png' alt="" /></NavLink>
                        <ul className="nav-links">
                            <li><NavLink activeClassName="navbar__link--active" exact className="item" to='/admin' onClick={() => setOpen(!open)}>MY POSTS</NavLink></li>
                            <li><NavLink activeClassName="navbar__link--active" exact className="item" to='/settings' onClick={() => setOpen(!open)}>ACCOUNT</NavLink></li>
                            <li className="logout-button item" onClick={() => {
                                localStorage.removeItem('access_token')
                                axiosInstance.defaults.headers['Authorization'] = null
                                setOpen(!open)
                                history.push('/login')
                                window.location.reload()
                            }}>LOGOUT</li>
                        </ul>
                        <div className="burger" onClick={() => setOpen(!open)}>
                            <div className="line1"></div>
                            <div className="line2"></div>
                            <div className="line3"></div>
                        </div>
                    </nav>
                    :
                    <nav className='header-container'>
                        <NavLink exact to='/home'><img className='pic' src='https://res.cloudinary.com/dpj7zvqzs/image/upload/v1614626528/media/posts/logo_tnx6vv.png' alt="" /></NavLink>
                        <ul className="nav-links">
                            <li><NavLink activeClassName="navbar__link--active" exact className="item" to="/login" onClick={() => setOpen(!open)}>LOGIN</NavLink></li>
                            <li><NavLink activeClassName="navbar__link--active" exact className="item" to='/register' onClick={() => setOpen(!open)}>REGISTER</NavLink></li>
                        </ul>
                        <div className="burger" onClick={() => setOpen(!open)}>
                            <div className="line1"></div>
                            <div className="line2"></div>
                            <div className="line3"></div>
                        </div>
                    </nav>
            }

            <button className='back-button'
                onClick={() => {
                    history.goBack();
                }}
            ><FaLongArrowAltLeft size={25}/></button>
        </StyledHeader>
    )
}

export default Header