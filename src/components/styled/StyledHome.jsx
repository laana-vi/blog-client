import styled from "styled-components";

export const StyledHome = styled.div`
.home-wrapper {
    display: flex;
        flex-direction: column;
        justify-content: center;
        align-content: center;
        width: 100%;
        background-color: transparent;
        height: 100%;
        margin-top: 100px;
        box-sizing: border-box;
        flex-wrap: wrap;
}
.post-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    background-color: #272D2D;
    border-radius: 5px;
    border : none;
    margin: 10px 10px 30px 10px;
    padding: 70px 20px 10px 30px;
    max-width: 900px;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    font-size: 15px;
    color:#FFF7EB;
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
}
.post-pic {
    width: 700px;
    background-size: cover;
    padding-bottom: 30px;
}

@media screen and (max-width: 939px){
    .post-pic {
        width: 500px;
        background-size: cover;
    }
}
@media screen and (max-width: 625px){
    .post-pic {
        width: 300px;
        background-size: cover;
    }
}

@media screen and (max-width: 299px){
    .post-pic {
        width: 270px;
        background-size: cover;
    }
}
.title, .author, .content, .likes {
    align-self: flex-start;
}
.title{
    padding-bottom: 20px;
    font-size: 20px;
}
.title:hover {
    transform: scale(1.1);
    color: #A14016;
}
.content {
    padding-bottom: 15px;
    font-size: 17px;
}
.author{
    padding-bottom: 15px;
    font-size: 17px;
}

.timestamp {
    align-self: flex-end;
    font-size: 15px;
}
`