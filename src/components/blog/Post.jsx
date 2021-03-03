import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { editLikesBySlug, getAuthorName, getPostBySlug, getTime, parseJwt, token } from "../../service"
import { FaLongArrowAltUp, FaLongArrowAltDown, FaHeart } from "react-icons/fa";
import { StyledPost } from "../styled/StyledPost";

const Post = ({ posts, users, user }) => {
    let { slug } = useParams()
    const [post, setPost] = useState()
    const [likes, setLikes] = useState()
    const history = useHistory()

    const userId = parseJwt(token)?.user_id

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
        <StyledPost>
            <div className="post-item">
                    <img className="post-pic" src={post?.image} alt="" />
                <h3 className="title">{post?.title}</h3>
                <p className="content">{post?.content}</p>
                <p className="author">Author: {getAuthorName(users, post?.author)?.user_name}</p>
                <small className="timestamp">{post && getTime(post?.timestamp)}</small>
                <p className="likes"><FaHeart size={20}/> {likes}</p>

                {
                    user &&
                    <div className="like">
                        <button className="btn-like" onClick={() => {
                            editLikesBySlug(slug, { "likes": [...post?.likes, userId] }).then(res => {
                                setLikes(res?.data?.likes?.length)
                                history.push('/home')
                                window.location.reload()
                                
                            })
                        }}><FaLongArrowAltUp size={20} className="icon" /></button>
                        <button className="btn-like" onClick={() => {
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
                        }}><FaLongArrowAltDown size={20} className="icon" /></button>
                    </div>
                }
            </div>
        </StyledPost>

    )
}

export default Post