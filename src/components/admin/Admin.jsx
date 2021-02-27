import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { usePost } from "../../hooks/usePost"
import { addPost, deletePost, getAllPosts, parseJwt, token } from "../../service"
import slugify from 'react-slugify'

const Admin = ({ user, categories }) => {
    const [posts, setPosts] = useState([])
    const userId = parseJwt(token).user_id
    const [title, setTitle, content, setContent, author, setAuthor, category, setCategory, slug, setSlug, image, setImage] = usePost()

    useEffect(() => {
        let mounted = true
        getAllPosts().then(res => {
            if (mounted) {
                setPosts([...res.data].filter(post => post.author == userId))
            }
            mounted = false
        })
    }, [userId])

    return (
        <>
            {
                posts.map(post => {
                    return (
                        <div key={post.id}>
                            <Link to={`/admin/${post.id}`}>{post.title}</Link>
                            <button onClick={() => {
                                deletePost(post.id).then(res => console.log(res))
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
                        {categories.map(category => <option key={category.id} value={category.name}>{category.name}</option>)}
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
                    formData.append('category', category)
                    formData.append('image', image[0])
                    formData.append('timestamp', date)
                    addPost(formData).then(res => console.log(res))
                }}>Add post</button>
            </div>
        </>
    )
}

export default Admin