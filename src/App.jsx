import { useState } from "react"
import { parseJwt, token, addTokenToBlacklist, axiosInstance } from "./service"
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from "./components/Home"
import Admin from "./components/Admin"
import Settings from "./components/Settings"
import Login from "./components/Login"
import Register from "./components/Register"


const App = () => {
    const [user, setUser] = useState(parseJwt(token)?.user_name)


    return (
        <>
            <Router>
                <nav>
                    {
                        user ?
                            <>
                                <Link to='/home'>Home</Link>
                                <Link to='/admin'>Admin</Link>
                                <Link to='/settings'>Settings</Link>
                                <button onClick={() => {
                                    addTokenToBlacklist({ refresh_token: localStorage.getItem('refresh_token') })
                                    localStorage.removeItem('access_token')
                                    localStorage.removeItem('refresh_token')
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
                    <Route exact path='/home'>
                        <Home user={user} />
                    </Route>
                    <Route exact path='/admin'>
                        <Admin />
                    </Route>
                    <Route exaact path="/settings">
                        <Settings />
                    </Route>
                    <Route exact path="/login">
                        <Login />
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