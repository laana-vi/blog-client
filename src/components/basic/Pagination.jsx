import { StyledPagination } from "../styled/StyledPagination"

const Pagination = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }
    return (
        <StyledPagination currentPage={currentPage}>
            <div className="pagination">
                <nav>
                    <ul>
                        {pageNumbers.map(number => (
                            <button className="page" key={number} currentPage={currentPage} onClick={() => {
                                paginate(number)
                                window.location.reload()
                            }}>{number}</button>
                        ))}
                    </ul>
                </nav>
            </div>
        </StyledPagination>

    )
}

export default Pagination 