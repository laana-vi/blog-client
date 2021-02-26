import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { editLikesBySlug, getPostBySlug, getTime, parseJwt, token } from "../../service"

const Post = ({ posts, users }) => {
    let { slug } = useParams()
    const [post, setPost] = useState()
    const [likes, setLikes] = useState()
    const history = useHistory()

    const userId = parseJwt(token).user_id

    useEffect(() => {
        let mounted = true
        getPostBySlug(slug).then(res => {
            if (mounted) {
                setPost(res.data)
                setLikes(res.data.likes.length)
            }
            mounted = false
        })
    }, [slug])
    return (
        <div>
            <div>
                <img style={{ maxWidth: "300px" }} src={post?.image} alt="" />
            </div>
            <h3>{post?.title}</h3>
            <p>{post?.content}</p>
            <small>{post && getTime(post?.timestamp)}</small>
            <p>Likes: {likes}</p>
            <button onClick={() => {
                editLikesBySlug(slug, { "likes": [...post?.likes, userId] }).then(res => {
                    setLikes(res?.data?.likes?.length)
                    history.push('/home')
                    window.location.reload()
                })
            }}>Like</button>
            <button onClick={() => {
                let index = post.likes.indexOf(userId)
                let tmp = post.likes
                tmp.splice(index, 1)
                if (index !== -1) {
                    editLikesBySlug(slug, { "likes": tmp }).then(res => {
                        setLikes(res?.data?.likes.length)
                        history.push('/home')
                        window.location.reload()
                    })
                }
            }}>Unlike</button>
        </div>
    )
}

export default Post