import styled from "styled-components";

export const PageArea = styled.div`
    background-color: #DDD;
`

export const CategoryArea = styled.div`
    max-width: 1200px;
    margin: auto;

    .header--{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        h1{
            margin:0;
            padding: 15px 0;
        }

        div{
            margin: 15px 0;
        }

        hr{
            width: 100%;
        }
    }

    .body{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .order{
            margin: 5px 0;
            span{
                font-size: 17px;
                font-weight: bold;
            }

            select{
                outline: 0;
                border: 0;
                font-size: 15px;
                border-radius: 5px;
            }
        }

        .search{
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            input{
                width: 200px;
                height: 40px;
                outline:0;
                border: none;
                border-radius: 5px;
                font-size: 15px;
                padding: 10px;
                margin: 5px 0;
                margin-right: 8px;
            }

            select{
                outline: 0;
                height: 40px;
                border: 1px solid #DDD;
                padding: 5px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 15px;
                margin-right: 8px;
                width: 200px;
            }
        }
    }

    .body--products{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        margin: 15px 0;

        .container{
            border-radius: 20px;
            margin-bottom: 20px;
            margin-right: 20px;
            box-shadow: 0px 0px 10px white;
            background-color: white;
            width: 290px;
            height: 350px;
            padding: 15px;
            display: flex;
            flex-direction: column;
            align-items: center;

            h3{
                text-align: center;
                margin:0;
                margin-bottom: 10px;
            }

            .description, .infos{
                text-overflow: ellipsis;
                overflow-y: auto;
                overflow-x: hidden;
                width: 100%;
                text-align: center;
                margin-bottom: 10px;
            }

            .infos{
                height: 30px;
            }

            button{
                background-color: #0089FF;
                border: 0;
                outline: 0;
                cursor: pointer;
                padding: 5px 10px;
                border-radius: 5px;
                color: #FFF;
                font-size: 17px;
                margin-right: 15px;

                &:hover {
                    background-color: #006FCE;
                }

                &:active{
                    background-color: #999;
                }
            }
        }
    }

    .pagination{
        display: flex;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        width: 100%;
        margin: 15px 0;

        .pagItem{
            cursor: pointer;
            margin-right: 6px;
            border:0;
            height: 30px;
            width: 30px;
            border-radius: 10px;
            background-color: #0089FF;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all ease 0.1s;
            color: white;
            &:hover{
                background-color: #006FCE;
            }
            &.active{
                font-weight: bold;
                background-color: #005AA8;
            }
        }
    }
`

export const CreateCategoryModal = styled.div`
    .form{
        background-color: #DDD;
        border-radius: 5px;
        padding: 10px;
        box-shadow: 0px 0px 5px #999;
        width: 60%;
        margin-bottom: 20px;
        .modal--form--area{
            display: flex;
            align-items: center;
            padding: 10px;
            max-width: 500px;
        }
        .modal--form--title{
            width: 30%;
            text-align: right;
            font-weight: bold;
            font-size: 14px;
            padding-right: 10px;
        }
        .modal--form--input{
            flex: 1;
            input, select{
                width: 100%;
                font-size: 14px;
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
    @media (max-width: 700px) {
        .form{
            width: 95%;
            .modal--form--area{
                flex-direction: column;
            }
            .modal--form--title{
                width: 100%;
                text-align: center;
                margin-bottom: 5px;
            }
            .modal--form--input {
                width: 100%;
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