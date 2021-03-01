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
    const [user] = useState(parseJwt(token)?.user_name)
    const [categories, setCategories] = useState([])
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])
    const [select, setSelect] = useState('-1')
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage] = useState(5)
    const [loading, setLoading] = useState(false)


    let indexOfLastPost = currentPage * postsPerPage
    let indexOfFirstPost = indexOfLastPost - postsPerPage
    let currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)


    useEffect(() => {
        let mounted = true
        setLoading(true)
        getAllCategories().then(res => {
            if (mounted) {
                setCategories(res.data)
                setLoading(false)
            }
        })
        return () => { mounted = false }
    }, [])

    useEffect(() => {
        let mounted = true
        getAllPosts().then(res => {
            if (mounted) {
                user && setPosts(res.data)
            }
        })
        return () => { mounted = false }
    }, [user])

    useEffect(() => {
        let mounted = true
        getAllUsers().then(res => {
            if (mounted) {
                setUsers(res.data)
            }
        })
        return () => { mounted = false }
    }, [])

    return (
        <>
            <Router>
                <Header user={user} />
                <main>
                    <Switch>
                        <PublicRoute exact path="/" Component={() => <BasicRoute />} />
                        <PublicRoute exact path="/login" Component={() => <Login />} />
                        <PublicRoute exact path="/register" Component={() => <Register />} />
                        <PublicRoute exact path="/password-reset" Component={() => <PasswordReset />} />
                        <PublicRoute exact path="/password-reset-confirm" Component={() => <PasswordResetConfirm />} />
                        <PublicRoute exact path="/blog" Component={() => <Home user={user} posts={select === '-1' ? currentPosts : currentPosts.filter(post => post.category === Number(select))} users={users} categories={categories} setSelect={setSelect} loading={loading} postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />} />
                        <PrivateRoute exact path="/blog/:slug" user={user} Component={() => <Post user={user} users={users} />} />
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