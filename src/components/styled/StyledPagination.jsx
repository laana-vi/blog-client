import styled from "styled-components";

export const StyledPagination = styled.div`
.pagination {
    display: flex;
    flex-direction: row;
    justify-content: center;

}
.page {
    border: none;
    background-color: transparent;
    color: #FFF7EB;
    padding-left: 30px;
    display: inline-block;
    font-size: 20px;
    width: fit-content;
    padding: 0 30px 0 30px;

}
.page:hover {
    transform: scale(1.1);
    color: #A14016;
}
`