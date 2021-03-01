import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { editLikesBySlug, getAuthorName, getPostBySlug, getTime, parseJwt, token } from "../../service"

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
        })
        return () => { mounted = false }
    }, [slug])
    return (
        <div>
            <div>
                <img style={{ maxWidth: "300px" }} src={post?.image} alt="" />
            </div>
            <h3>{post?.title}</h3>
            <p>{post?.content}</p>
            <p>Written by: {getAuthorName(users, post?.author)?.user_name}</p>
            <small>{post && getTime(post?.timestamp)}</small>
            <p>Likes: {likes}</p>
            <button onClick={() => {
                editLikesBySlug(slug, { "likes": [...post?.likes, userId] }).then(res => {
                    setLikes(res?.data?.likes?.length)
                    console.log(res.data)
                })
            }}>Like</button>
            <button onClick={() => {
                let index = post.likes.indexOf(userId)
                let tmp = post.likes
                tmp.splice(index, 1)
                if (index !== -1) {
                    editLikesBySlug(slug, { "likes": tmp }).then(res => {
                        setLikes(res?.data?.likes.length)
                        history.push('/blog')
                        window.location.reload()
                    })
                }
            }}>Unlike</button>
        </div>
    )
}

export default Post