import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import slugify from 'react-slugify'
import { usePost } from "../../hooks/usePost"
import { editPost, getPostById } from "../../service"
import Error from "../basic/Error"

const AdminPost = ({ posts, categories }) => {
    let { id } = useParams()
    const [title, setTitle, content, setContent, author, setAuthor, category, setCategory, slug, setSlug, image, setImage,timestamp, setTimestamp] = usePost()
    const [error, setError] = useState('')
    const history = useHistory()

    useEffect(() => {
        let mounted = true
        getPostById(id).then(res => {
            if (mounted) {
                setTitle(res.data.title)
                setContent(res.data.content)
                setAuthor(res.data.author)
                setCategory(res.data.category)
                setSlug(res.data.slug)
                setImage(res.data.image)
                setTimestamp(res.data.timestamp)
            }
            mounted = false
        })
    }, [id, setTitle, setContent, setAuthor, setCategory, setSlug, setImage, setTimestamp])
    return (
        <div>
            <h3>Edit post</h3>
            <div>
                <label>Title: </label>
                <input value={title} type="text" onChange={(e) => {
                    setTitle(e.target.value)
                    setSlug(slugify(e.target.value))
                }} />
            </div>
            <p>Slug: {slug}</p>
            <div>
                <div>
                    <label>Content: </label>
                </div>

                <textarea value={content} id="" cols="50" rows="10" onChange={(e) => {
                    setContent(e.target.value)
                }}></textarea>
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
                <label>Image: </label>
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
                formData.append('id', id)
                formData.append('timestamp', timestamp)
                image[0] !== 'h' && formData.append('image', image[0])
                editPost(id, formData).then(res => {

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
                })
            }}>Edit post</button>
            <Error error={error} setError={setError} />
        </div>
    )
}

export default AdminPost