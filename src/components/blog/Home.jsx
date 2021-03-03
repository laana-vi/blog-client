import { useState } from "react"
import { Link } from "react-router-dom"
import { getAuthorName, getTime, truncate } from "../../service"
import Loading from "../basic/Loading"
import Pagination from "../basic/Pagination"
import { StyledFilter } from "../styled/StyledFilter"


const Home = ({ posts, users, categories, setSelect, loading, postsPerPage, totalPosts, paginate }) => {
    const [search, setSearch] = useState('')

    if (loading) {
        return (
            <Loading></Loading>
        )
    }
    else {
        return (
            <>
            <StyledFilter>
            <div className='filter'>
                    <div>
                    <input className="search" type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
                    </div>
                   <div>
                   <select className="select" onChange={(e) => {
                        setSelect(e.target.value)
                    }}>
                        <option className="option-item" defaultValue="-1">CATEGORY</option>
                        {categories.map(category => <option className="option-item" key={category.id} value={category.id}>{category.name.toUpperCase()}</option>)}
                    </select>
                   </div>
                   
                </div>
            </StyledFilter>
            
                
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