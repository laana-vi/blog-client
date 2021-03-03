import { useState } from "react"
import { Link } from "react-router-dom"
import { getAuthorName, getTime, truncate } from "../../service"
import Loading from "../basic/Loading"
import Pagination from "../basic/Pagination"
import { StyledFilter } from "../styled/StyledFilter"
import { StyledHome } from "../styled/StyledHome"
import { FaHeart } from "react-icons/fa";




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
                <StyledHome>
                    <div className="home-wrapper">
                        {posts.filter(post => post.content.toLowerCase().includes(search.toLowerCase()) || post.title.toLowerCase().includes(search.toLowerCase()) || getAuthorName(users, post?.author)?.user_name.toLowerCase().includes(search.toLowerCase())).map(post => {
                            return (
                                <div className="post-item" key={post.id}>
                                    <Link to={`/home/${post.slug}`}>
                                        <img className="post-pic" src={post.image} alt="" />
                                    </Link>
                                    <Link className="title" to={`/home/${post.slug}`}>
                                        <h3>{post.title}</h3>
                                    </Link>
                                    <p className="content">{truncate(post.content)}</p>
                                    <p className="author">Author: {getAuthorName(users, post?.author)?.user_name}</p>
                                    <p className="likes"><FaHeart size={20}/> {post?.likes?.length}</p>
                                    <small className="timestamp">{getTime(post.timestamp)}</small>
                                </div>
                            )
                        })}
                        <Pagination postsPerPage={postsPerPage} totalPosts={totalPosts} paginate={paginate} />
                    </div>
                </StyledHome>


            </>
        )
    }

}

export default Home