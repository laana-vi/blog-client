const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <div>
            <nav>
                <ul>
                    {pageNumbers.map(number => (
                        <button key={number} onClick={() => paginate(number) }>{number}</button>
                    ))}
                </ul>
            </nav>
        </div>
    )
}

export default Pagination 