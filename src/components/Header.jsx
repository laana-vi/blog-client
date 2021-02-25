import { Link, useHistory } from "react-router-dom"
import { axiosInstance } from "../service"

const Header = ({ user }) => {
    const history = useHistory()
    return (
        <header>
            <nav>
                {
                    user ?
                        <>
                            <Link to='/home'>Home</Link>
                            <Link to='/admin'>Admin</Link>
                            <Link to='/settings'>Settings</Link>
                            <button onClick={() => {
                                localStorage.removeItem('access_token')
                                axiosInstance.defaults.headers['Authorization'] = null
                                history.push('/login')
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