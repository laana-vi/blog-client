import { useEffect, useState } from "react"
import { getAllCategories, getAllPosts, parseJwt, token } from "./service"
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import Home from "./components/Home"
import Admin from "./components/Admin"
import Settings from "./components/Settings"
import Login from "./components/Login"
import Register from "./components/Register"
import PrivateRoute from "./routes/PrivateRoute"
import Header from "./components/Header"
import Footer from "./components/Footer"
import PublicRoute from "./routes/PublicRoute"
import AdminPost from "./components/AdminPost"


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
    }, [])


    return (
        <>
            <Router>
                <Header user={user} />
                <main>
                    <Switch>
                        <PrivateRoute exact path='/' user={user} Component={() => <Home user={user}  posts={posts} />} />
                        <PrivateRoute exact path='/admin' user={user} Component={() => <Admin user={user} categories={categories} />} />
                        <PrivateRoute exact path='/admin/:id' user={user} Component={() => <AdminPost categories={categories} />} />
                        <PrivateRoute exact path="/settings" user={user} Component={Settings} />
                        <PublicRoute exact path="/login" Component={() => <Login user={user} />} />
                        <PublicRoute exact path="/register" Component={() => <Register />} />
                    </Switch>
                </main>
                <Footer />
            </Router>
        </>
    )
}

export default App