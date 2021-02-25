import { useEffect } from "react"
import { useParams } from "react-router-dom"
import slugify from 'react-slugify'
import { usePost } from "../../hooks/usePost"
import { editPost, getPostById } from "../../service"

const AdminPost = ({ posts, categories }) => {
    let { id } = useParams()
    const [title, setTitle, content, setContent, author, setAuthor, category, setCategory, slug, setSlug, image, setImage] = usePost()

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
            }
            mounted = false
        })
    }, [id, setTitle, setContent, setAuthor, setCategory, setSlug, setImage])
    return (
        <div>
            <h3>Edit post</h3>
            <div>
                <label>Title: </label>
                <input placeholder={title} type="text" onChange={(e) => {
                    setTitle(e.target.value)
                    setSlug(slugify(e.target.value))
                }} />
            </div>
            <p>Slug: {slug}</p>
            <div>
                <div>
                    <label>Content: </label>
                </div>

                <textarea placeholder={content} id="" cols="50" rows="10" onChange={(e) => {
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
                image[0] !== 'h' && formData.append('image', image[0])
                editPost(id, formData)
            }}>Edit post</button>
        </div>
    )
}

export default AdminPost