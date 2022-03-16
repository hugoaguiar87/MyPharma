import styled from "styled-components";

export const PageArea = styled.div`
    background-color: #DDD;
    min-height: 80vh;
`

export const DashArea = styled.div`
    max-width: 1200px;
    margin: auto;
    /* height: 80vh; */
    /* display: flex;
    flex-direction: column; */

    h1{
        margin: 0;
        padding: 15px 0;
        text-align: center;
    }

    .options--area{
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        height: 60vh;
    }

    .categ--area{
        border-radius: 20px;
        margin-bottom: 10px;
        margin-right: 10px;
        box-shadow: 0px 0px 10px white;
        background-color: white;
        cursor: pointer;
        width: 250px;
        height: 200px;
        padding: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        h3{
            text-align: center;
            margin:0;
            margin-bottom: 10px;
        }

        &:hover{
            background-color: #F5F5F5;
        }
    }
`