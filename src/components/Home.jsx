const Home = ({ user, posts }) => {
    return (
        <>
            <h1>{user}</h1>
            {posts.map(post => <div key={post.id}><img src={post.image} alt={post.title} /></div>)}
        </>
    )
}

export default Home