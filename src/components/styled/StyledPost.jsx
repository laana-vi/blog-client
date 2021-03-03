import styled from "styled-components";

export const StyledPost = styled.div`
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

.btn-like {
    border: none;
    background-color: transparent;
    color: #FFF7EB;
    padding-left: 30px;
    display: inline-block;
}
.like {
    display: flex;
    flex-direction: row;
    align-self: flex-end;
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
    margin: 10px 10px 50px 10px;
    padding: 70px 20px 10px 20px;
    max-width: 70%;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif;
    font-size: 15px;
    color:#FFF7EB;
    box-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
}
.post-pic {
    width: 1100px;
    background-size: cover;
    padding-bottom: 30px;
}

@media screen and (max-width: 18002px){
    .post-pic {
        width: 900px;
        background-size: cover;
    }

}

@media screen and (max-width: 1592px){
    .post-pic {
        width: 700px;
        background-size: cover;
    }

}

@media screen and (max-width: 1166px){
    .post-pic {
        width: 600px;
        background-size: cover;
    }
}
@media screen and (max-width: 1090px){
    .post-pic {
        width: 500px;
        background-size: cover;
    }
}
@media screen and (max-width: 868px){
    .post-pic {
        width: 400px;
        background-size: cover;
    }
    .post-item {
        max-width: 100%;
    }
}
@media screen and (max-width: 724px){
    .post-pic {
        width: 300px;
        background-size: cover;
    }
    .post-item {
        max-width: 100%;
    }
}
@media screen and (max-width: 400px){
    .post-pic {
        width: 270px;
        background-size: cover;
    }
    .post-item {
        max-width: 100%;
    }
}

@media screen and (max-width: 299px){
    .post-pic {
        width: 220px;
        background-size: cover;
    }
    .post-item {
        max-width: 100%;
    }
}
.title, .author, .content, .likes {
    align-self: flex-start;
}
.likes {
    font-size: 20px;
}
.title{
    padding-bottom: 20px;
    font-size: 22px;
}
.content {
    padding-bottom: 15px;
    font-size: 19px;
}
.author{
    padding-bottom: 15px;
    font-size: 18px;
}

.timestamp {
    align-self: flex-end;
    font-size: 17px;
}
`
