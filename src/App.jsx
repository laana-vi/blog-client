import { useEffect, useState } from "react"
import { getAllCategories, getAllPosts, getAllUsers, parseJwt, token } from "./service"
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import Admin from "./components/admin/Admin"
import AdminPost from "./components/admin/AdminPost"
import Login from "./components/authorization/Login"
import Register from "./components/authorization/Register"
import Home from "./components/blog/Home"
import Settings from "./components/settings/Settings"
import PasswordReset from "./components/settings/PasswordReset"
import PasswordResetConfirm from "./components/settings/PasswordResetConfirm"
import Header from "./components/basic/Header"
import Footer from "./components/basic/Footer"
import BasicRoute from "./components/basic/BasicRoute"
import PublicRoute from "./routes/PublicRoute"
import PrivateRoute from "./routes/PrivateRoute"
import Post from "./components/blog/Post"





const App = () => {
    const [user, setUser] = useState(parseJwt(token)?.user_name)
    const [categories, setCategories] = useState([])
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        let mounted = true
        getAllCategories().then(res => {
            if (mounted) {
                setCategories(res.data)
            }
            mounted = false
        })
    }, [])

    useEffect(() => {
        let mounted = true
        getAllPosts().then(res => {
            if (mounted) {
                user && setPosts(res.data)
            }
            mounted = false
        })
    }, [user])

    useEffect(() => {
        let mounted = true
        getAllUsers().then(res => {
            if (mounted) {
                setUsers(res.data)
            }
            mounted = false
        })
    }, [])

    return (
        <>
            <Router>
                <Header user={user} />
                <main>
                    <Switch>
                        <PublicRoute exact path="/" Component={() => <BasicRoute user={user} />} />
                        <PublicRoute exact path="/login" Component={() => <Login user={user} />} />
                        <PublicRoute exact path="/register" Component={() => <Register />} />
                        <PublicRoute exact path="/password-reset" Component={() => <PasswordReset />} />
                        <PublicRoute exact path="/password-reset-confirm" Component={() => <PasswordResetConfirm />} />
                        <PrivateRoute exact path="/home" user={user} Component={() => <Home user={user} posts={posts} users={users} />} />
                        <PrivateRoute exact path="/home/:slug" user={user} Component={() => <Post user={user} users={users} />} />
                        <PrivateRoute exact path="/admin" user={user} Component={() => <Admin user={user} categories={categories} />} />
                        <PrivateRoute exact path="/admin/:id" user={user} Component={() => <AdminPost categories={categories} />} />
                        <PrivateRoute exact path="/settings" user={user} Component={() => <Settings user={user} />} />
                    </Switch>
                </main>
                <Footer />
            </Router>
        </>
    )
}

export default App