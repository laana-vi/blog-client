import styled from "styled-components";

export const StyledAdmin = styled.div`

.posts-wrapper {
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
    border-radius: 10px;
    flex-wrap: wrap;
    
    
}
.post-item {
    display: flex;
    border-bottom: 2px solid #FFF7EB;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 50%;  
    padding: 20px 0px 20px 0px; 
    background-color: #272D2D;
    
}
@media screen and (max-width: 1384px){
.post-item {
    width: 70% !important; 
    }
}

@media screen and (max-width: 835px){
.post-item {
    width: 95% !important; 
    }
}
.post {
    font-family: 'Open Sans', sans-serif;
    font-size: 20px;
    margin-right: auto;
    transition: 0.3s;
}
.post:hover {
    color: #A14016;
    transform: scale(1.1)
}

.post-delete-btn{
    text-align: center;
    font-family: 'Open Sans', sans-serif;
    font-size: 15px;
    font-weight: bolder;
    width: fit-content;
    height: fit-content;
    padding:5px;
    border-radius: 12px; ;
    background-color: #272D2D;
    border : none;
    color: #9b1e1e;
    transition: 0.3s;
    margin-left: auto;
}
.post-delete-btn:hover{
   transform: scale(2.0)
}
`