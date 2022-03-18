import styled from "styled-components";

export const PageArea = styled.div`
    background-color: #DDD;
`

export const MessageArea = styled.div`
    max-width: 1200px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 82vh;

    button {
        background-color: #0089FF;
        border: 0;
        outline: 0;
        border-radius: 5px;
        font-size: 15px;
        color: #FFF;
        padding: 5px 10px;
        cursor: pointer;
        &:hover{
            background-color: #006FCE ;
        }
    }
`

