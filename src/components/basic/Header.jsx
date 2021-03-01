import { Link, useHistory } from "react-router-dom"
import { axiosInstance } from "../../service"

const Header = ({ user }) => {
    const history = useHistory()
    return (
        <header>
            <nav>
                <h3>{user}</h3>
                {
                    user ?
                        <>
                            <Link to='/blog'>Posts</Link>
                            <Link to='/admin'>Admin</Link>
                            <Link to='/settings'>Settings</Link>
                            <button onClick={() => {
                                localStorage.removeItem('access_token')
                                axiosInstance.defaults.headers['Authorization'] = null
                                history.push('/login')
                                window.location.reload()
                            }}>Logout</button>
                        </>
                        :
                        <>
                            <Link to="/login">Login</Link>
                            <Link to='/register'>Register</Link>
                        </>
                }
            </nav>
        </header>

    )
}

export default Header