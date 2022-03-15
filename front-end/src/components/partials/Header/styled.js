import styled from "styled-components";

export const HeaderArea = styled.div`
    background-color: #F7F7F7;
    height: 60px;
    box-shadow: 0 0 12px 3px #DDD;

    .container{
        display: flex;
        align-items: center;
        max-width: 1200px;
        height: 100%;
        margin: auto;
    }

    .logo{
        flex: 1;
        font-size: 30px;
        font-style: italic;

        .logo--first{
            color: #0693e3;
        }

        .logo--last{
            color: #00d084;
        }
    }

    button{
        background-color: #00a5fe;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 15px;
        padding: 15px 20px;
        height: 25px;
        border-radius: 200px;
        color: #FFFFFF;
        box-shadow: 0 0 15px -4px rgb(0 0 0 / 37%);
        border: 0;
        cursor: pointer;

        &:hover{
            background-color: #008BD6;
        }
    }


`