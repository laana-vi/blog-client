import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { usePost } from "../hooks/usePost"
import { addPost, deletePost, getAllPosts, parseJwt, token } from "../service"
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
                    <div>
                        <label>Title: </label>
                    </div>
                    <input type="text" onChange={(e) => {
                        setTitle(e.target.value)
                        setSlug(slugify(e.target.value))
                    }} />
                </div>
                <div>
                    <p>Slug: {slug}</p>
                </div>
                <div>
                    <div>
                        <label>Content: </label>
                    </div>

                    <textarea id="" cols="50" rows="10" onChange={(e) => {
                        setContent(e.target.value)
                    }}></textarea>
                </div>
                <div>
                    <p>Author: {user}</p>
                </div>
                <div>
                    <label>Category: </label>
                    <select onChange={(e) => {
                        setCategory(e.target.value)
                    }}>
                        {categories.map(category => <option key={category.id} value={category.name}>{category.name}</option>)}
                    </select>
                </div>
                <div>
                    <div>
                        <label>Image: </label>
                    </div>
                    <input type="file" onChange={(e) => {
                        setImage(e.target.files)
                    }} />
                </div>
                <button onClick={() => {
                    let formData = new FormData()
                    formData.append('title', title)
                    formData.append('content', content)
                    formData.append('slug', slug)
                    formData.append('author', author)
                    formData.append('category', category)
                    formData.append('image', image[0])
                    addPost(formData).then(res => console.log(res))
                }}>Add post</button>
            </div>
        </>
    )
}

export default Admin