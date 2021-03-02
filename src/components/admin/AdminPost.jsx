import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { usePost } from "../../hooks/usePost"
import { editPost, getPostById, slugify } from "../../service"
import Error from "../basic/Error"
import { StyledForm } from "../styled/StyledForm"

const AdminPost = ({ posts, categories }) => {
    let { id } = useParams()
    const [title, setTitle, content, setContent, author, setAuthor, category, setCategory, slug, setSlug, image, setImage, timestamp, setTimestamp] = usePost()
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
        })
        return () => { mounted = false }
    }, [id, setTitle, setContent, setAuthor, setCategory, setSlug, setImage, setTimestamp])
    return (
        <StyledForm>
            <div className='from-wrapper add-post'>
                <h3>EDIT POST</h3>
                <label className="label-item">TITLE: </label>
                <input className='input-item' value={title} type="text" onChange={(e) => {
                    setTitle(e.target.value)
                    setSlug(slugify(e.target.value))
                }} />
                <label className="label-item populated">SLUG: {slug}</label>
                <label className="label-item">CONTENT: </label>
                <textarea value={content} className="content" id="" rows="15" onChange={(e) => {
                    setContent(e.target.value)
                }}></textarea>             
                    <label className="label-item">CATEGORY: </label>                   
                    <select className='input-item select' onChange={(e) => {
                        setCategory(e.target.value)
                    }}>
                        <option className="option-item" defaultValue='-1'>SELECT CATEGORY</option>
                        {categories.map(category => <option className="option-item" key={category.id} value={category.id}>{category.name.toUpperCase()}</option>)}
                    </select>
                    <label htmlFor="img" className="custom-file-input"></label>
                    <input type="file" className="img-input" name="uploadfile" id="img" onChange={(e) => {
                        setImage(e.target.files)
                    }} />
                <button className='button-item' onClick={() => {
                    let formData = new FormData()
                    formData.append('title', title)
                    formData.append('content', content)
                    formData.append('slug', slug)
                    formData.append('author', author)
                    formData.append('category', Number(category))
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
        </StyledForm>

    )
}

export default AdminPost