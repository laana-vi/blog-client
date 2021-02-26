import { Link } from "react-router-dom"
import { getAuthorName, getTime, truncate } from "../../service"

const Home = ({ posts, users }) => {

    return (
        <>
            {posts.map(post => {
                return (
                    <div key={post.id}>

                        <Link to={`/home/${post.slug}`}>
                            <div>
                                <img style={{ maxWidth: "300px" }} src={post.image} alt="" />
                            </div>
                            <h3>{post.title}</h3>
                            <p>{truncate(post.content)}</p>
                            <p>Written by: {getAuthorName(users, post?.author)?.user_name}</p>
                            <p>Likes: {post?.likes?.length}</p>
                            <small>{getTime(post.timestamp)}</small>
                        </Link>
                    </div>
                )
            })}
        </>
    )
}

export default Home