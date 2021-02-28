import { useState } from "react"
import { Link } from "react-router-dom"
import { getAuthorName, getTime, truncate } from "../../service"
import Pagination from "../basic/Pagination"

const Home = ({ posts, setPosts, users, categories, setSelect, loading, postsPerPage, totalPosts, paginate }) => {
    const [search, setSearch] = useState('')

    if (loading) {
        return (
            <p>Loading...</p>
        )
    }
    else {
        return (
            <>
                <input type="text" placeholder="search..." onChange={(e) => setSearch(e.target.value)} />
                <select onChange={(e) => {
                    setSelect(e.target.value)
                }}>
                    <option defaultValue="-1">Select a category</option>
                    {categories.map(category => <option key={category.id} value={category.id}>{category.name}</option>)}
                </select>
                {posts.filter(post => post.content.toLowerCase().includes(search.toLowerCase()) || post.title.toLowerCase().includes(search.toLowerCase()) || getAuthorName(users, post?.author)?.user_name.toLowerCase().includes(search.toLowerCase())).map(post => {
                    return (
                        <div key={post.id}>
                            <div>
                                <img style={{ maxWidth: "300px" }} src={post.image} alt="" />
                            </div>
                            <Link to={`/home/${post.slug}`}>
                                <h3>{post.title}</h3>
                            </Link>
                            <p>{truncate(post.content)}</p>
                            <p>Written by: {getAuthorName(users, post?.author)?.user_name}</p>
                            <p>Likes: {post?.likes?.length}</p>
                            <small>{getTime(post.timestamp)}</small>
                        </div>
                    )
                })}
                <Pagination postsPerPage={postsPerPage} totalPosts={totalPosts} paginate={paginate} />
            </>
        )
    }

}

export default Home