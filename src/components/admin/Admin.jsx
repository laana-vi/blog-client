import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { usePost } from "../../hooks/usePost"
import { addPost, deletePost, getAllPosts, parseJwt, slugify, token } from "../../service"
import Error from "../basic/Error"

const Admin = ({ user, categories }) => {
    const [posts, setPosts] = useState([])
    const [title, setTitle, content, setContent, author, setAuthor, category, setCategory, slug, setSlug, image, setImage, likes, setLikes] = usePost()
    const [error, setError] = useState('')
    const history = useHistory()

    const userId = parseJwt(token).user_id

    useEffect(() => {
        let mounted = true
        getAllPosts().then(res => {
            if (mounted) {
                setPosts([...res.data].filter(post => Number(post.author) === Number(userId)))
            }
        })
        return () => { mounted = false }
    }, [userId])

    return (
        <>
            {
                posts.map(post => {
                    return (
                        <div key={post.id}>
                            <Link to={`/admin/${post.id}`}>{post.title}</Link>
                            <button onClick={() => {
                                deletePost(post.id)
                                history.push('/home')
                                window.location.reload()
                            }}>Delete</button>
                        </div>
                    )
                })
            }
            <div>
                <h3>Add new post</h3>
                <div>
                    <label>Title: </label>
                    <input type="text" onChange={(e) => {
                        setTitle(e.target.value)
                        setSlug(slugify(e.target.value))
                    }} />
                </div>
                <p>Slug: {slug}</p>
                <div>
                    <label>Content: </label>
                    <textarea id="" cols="50" rows="10" onChange={(e) => {
                        setContent(e.target.value)
                    }}></textarea>
                </div>
                <p>Author: {user}</p>
                <div>
                    <label>Category: </label>
                    <select onChange={(e) => {
                        setCategory(e.target.value)
                    }}>
                        <option defaultValue='-1'>Select Category</option>
                        {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                    </select>
                </div>
                <div>
                    <label>Image: </label>
                    <input type="file" onChange={(e) => {
                        setImage(e.target.files)
                    }} />
                </div>
                <button onClick={() => {
                    let date = new Date()
                    date = `${date.getFullYear()}-${date.getUTCMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
                    let formData = new FormData()
                    formData.append('title', title)
                    formData.append('content', content)
                    formData.append('slug', slug)
                    formData.append('author', author)
                    formData.append('category', Number(category))
                    formData.append('image', image[0])
                    formData.append('timestamp', date)
                    
                    addPost(formData).then(res => {
                        if (res.status === 400) {
                            if (res.data.title) {
                                setError(res.data.title)
                            }
                            else if (res.data.content) {
                                setError(res.data.content)
                            }
                            else if (res.data.image) {
                                setError(res.data.image)
                            }
                        }
                        else {
                            history.push('/home')
                            window.location.reload()
                        }
                        console.log(res)
                        console.log(category)
                    })
                }}>Add post</button>
                <Error error={error} setError={setError} />
            </div>
        </>
    )
}

export default Admin