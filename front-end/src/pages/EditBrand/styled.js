import styled from "styled-components";

export const PageArea = styled.div`
    background-color: #DDD;
`

export const EditArea = styled.div`
    max-width: 1200px;
    margin: auto;
    height: 82vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2, h1{
        margin: 0;
        padding: 20px 0;
        text-align: center;
    }

    .form{
        background-color: white;
        border-radius: 5px;
        padding: 10px;
        box-shadow: 0px 0px 5px #999;
        width: 700px;

        .area{
            display: flex;
            align-items: center;
            padding: 15px;
        }
        .area--title{
            width: 100px;
            text-align: right;
            font-weight: bold;
            font-size: 17px;
            padding-right: 10px;
        }
        .area--input{
            flex: 1;
            font-size: 18px;
            text-overflow: ellipsis;
            overflow-y: auto;
            overflow-x: hidden;
            
            input{
                width: 100%;
                font-size: 15px;
                padding: 5px;
                border: 1px solid #DDD;
                outline: 0;
                border-radius: 5px;
                transition: all ease 0.4s;
                &:focus{
                    border: 1px solid black;
                }
            }
        }
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
    }
`

export const ErrorMessage = styled.div`
    margin: 10px 0;
    background-color: #FFCACA;
    color: #000;
    border: 2px solid #FF0000;
    padding: 10px;
`