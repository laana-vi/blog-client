import { useEffect, useState } from "react"
import { getAllCategories, getAllPosts, parseJwt, token } from "./service"
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import Admin from "./components/admin/Admin"
import AdminPost from "./components/admin/AdminPost"
import Login from "./components/authorization/Login"
import Register from "./components/authorization/Register"
import Home from "./components/blog/Home"
import Settings from "./components/settings/Settings"
import PasswordReset from "./components/settings/PasswordReset"
import PasswordResetConfirm from "./components/settings/PasswordResetConfirm"
import Header from "./components/Header"
import Footer from "./components/Footer"
import BasicRoute from "./components/BasicRoute"
import PublicRoute from "./routes/PublicRoute"
import PrivateRoute from "./routes/PrivateRoute"





const App = () => {
    const [user, setUser] = useState(parseJwt(token)?.user_name)
    const [categories, setCategories] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getAllCategories().then(res => setCategories(res.data))
    }, [])

    useEffect(() => {
        getAllPosts().then(res => {
            user && setPosts(res.data)
        })
    }, [user])

    return (
        <>
            <Router>
                <Header user={user} />
                <main>
                    <Switch>
                        <PublicRoute exact path="/" Component={() => <BasicRoute user={user} />} />
                        <PrivateRoute exact path="/home" user={user} Component={() => <Home user={user} posts={posts} />} />
                        <PrivateRoute exact path="/admin" user={user} Component={() => <Admin user={user} categories={categories} />} />
                        <PrivateRoute exact path="/admin/:id" user={user} Component={() => <AdminPost categories={categories} />} />
                        <PrivateRoute exact path="/settings" user={user} Component={Settings} />
                        <PublicRoute exact path="/login" Component={() => <Login user={user} />} />
                        <PublicRoute exact path="/register" Component={() => <Register />} />
                        <PublicRoute exact path="/password-reset" Component={() => <PasswordReset />} />
                        <PublicRoute exact path="/password-reset-confirm" Component={() => <PasswordResetConfirm />} />

                    </Switch>
                </main>
                <Footer />
            </Router>
        </>
    )
}

export default App