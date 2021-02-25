import { useEffect, useState } from "react"
import { parseJwt, token, axiosInstance, getAllPosts } from "./service"
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom'
import Home from "./components/Home"
import Admin from "./components/Admin"
import Settings from "./components/Settings"
import Login from "./components/Login"
import Register from "./components/Register"
import PrivateRoute from "./components/PrivateRoute"


const App = () => {
    const [user, setUser] = useState(parseJwt(token)?.user_name)
    const [posts, setPosts] = useState()
    const history = useHistory()

    useEffect(() => {
        let mounted = true
        if (mounted) {
            getAllPosts().then(res =>
                setPosts(res.data))
        }
        mounted = false

    }, [])

    return (
        <>
            <Router>
                <nav>
                    {
                        user ?
                            <>
                                <Link to='/'>Home</Link>
                                <Link to='/admin'>Admin</Link>
                                <Link to='/settings'>Settings</Link>
                                <button onClick={() => {
                                    localStorage.removeItem('access_token')
                                    axiosInstance.defaults.headers['Authorization'] = null
                                }}>Logout</button>
                            </>
                            :
                            <>

                                <Link to="/login">Login</Link>
                                <Link to='/register'>Register</Link>
                            </>
                    }
                </nav>

                <Switch>
                    <PrivateRoute exact path='/' user={user} Component={Home} />
                    <PrivateRoute exact path='/admin' user={user} Component={Admin} />
                    <PrivateRoute exact path="/settings" user={user} Component={Settings} />
                    <Route exact path="/login">
                        <Login user={user} />
                    </Route>
                    <Route exact path="/register">
                        <Register />
                    </Route>
                </Switch>
            </Router>
        </>
    )
}

export default App