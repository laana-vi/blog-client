import { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import { usePost } from "../../hooks/usePost"
import { addPost, deletePost, getAllPosts, getTime, parseJwt, slugify, token } from "../../service"
import Error from "../basic/Error"
import { StyledAdmin } from "../styled/AdminStyle"
import { StyledForm } from "../styled/StyledForm"
import { FaTimes } from "react-icons/fa";


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
            <div>
                <StyledAdmin>
                    <div className="posts-wrapper">
                        {
                            posts.map(post => {
                                return (
                                    <div className="post-item" key={post.id}>
                                        <Link className='post' to={`/admin/${post.id}`}>
                                            <p>{post.title}</p>
                                        <small>{getTime(post.timestamp)}</small></Link>
                                        <button className="post-delete-btn" onClick={() => {
                                            deletePost(post.id).then(res => {
                                                history.push('/home')
                                                window.location.reload()
                                            })

                                        }}><FaTimes /></button>
                                    </div>
                                )
                            })
                        }
                    </div>
                </StyledAdmin>
                <StyledForm>
                    <div className='from-wrapper add-post'>
                        <h3>ADD NEW POST</h3>
                        <label className="label-item">TITLE: </label>
                        <input className='input-item' type="text" onChange={(e) => {
                            setTitle(e.target.value.toUpperCase())
                            setSlug(slugify(e.target.value))
                        }} />
                        <label className="label-item populated">SLUG: {slug}</label>
                        <label className="label-item">CONTENT: </label>
                        <textarea className="content" id="" rows="15" onChange={(e) => {
                            setContent(e.target.value)
                        }}></textarea>
                        <label className="label-item populated">AUTHOR: {user}</label>
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
                        }}>ADD POST</button>
                        <Error error={error} setError={setError} />
                    </div>
                </StyledForm>
            </div>

        </>
    )
}

export default Admin