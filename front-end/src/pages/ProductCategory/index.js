import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { requestApi } from "../../helpers/Requests";
import { CategoryArea, PageArea, CreateCategoryModal, ErrorMessage } from "./styled";
import Modal from "../../components/Modal";

let timer
const ProductCategory = () => {
    const urlParams = useLocation()
    const useQueryString = () => {
        return new URLSearchParams(urlParams.search)
    }
    const query = useQueryString()
    const navigate = useNavigate()

    const [searchName, setSearchName] = useState( query.get('searchName') !== null ? query.get('searchName') : '' )
    const [searchDescription, setSearchDescription] = useState( query.get('searchDescription') !== null ? query.get('searchDescription') : '' )

    const [modalSignupCategory, setModalSignupCategory] = useState(false)

    const [categoriesTotal, setCategoriesTotal] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const [categories, setCategories] = useState('')
    const [order, setOrder] = useState("asc")
    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')


    const getCategories = async () => {
        let offset = (currentPage - 1) * 12

        const json = await requestApi.categories({
            sort: order,
            limit: 12,
            searchName,
            searchDescription,
            offset
        })
        setCategories(json.categories)
        setCategoriesTotal(json.total)
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        let queryString = []
        if(searchName){
            queryString.push(`searchName=${searchName}`)
        }
        if(searchDescription){
            queryString.push(`searchDescription=${searchDescription}`)
        }

        navigate(`?${queryString.join("&")}`)

        if(timer){
            clearTimeout(timer)
        }

        timer = setTimeout(getCategories, 2000)
        setCurrentPage(1)
    }, [searchName, searchDescription, order, update])

    useEffect(() => {
        if(categories.length > 0){
            setPageCount( Math.ceil( categoriesTotal / categories.length ) )
        } else {
            setPageCount(0)
        }
    }, [categoriesTotal])

    useEffect(() => {
        getCategories()
    }, [currentPage])
    
    const handleDelete = async (id) => {
        const confirm = window.confirm("Confirma a exclusão dessa categoria?")
        
        if(confirm){
            const json = await requestApi.delCategory(id)

            if(json.error){
                return alert("Ocorreu algum erro! Tente novamente.")
            } else if (json.status){
                alert("Categoria excluída com sucesso!")
                setUpdate(!update)
                return
            } else{
                return alert("Ocorreu algum erro! Tente novamente.")
            }
        }
    }

    const signupCategory = () => {
        const handleSubmit = async () => {
            setDisabled(true)
            setError('')
            let json

            json = await requestApi.createCategory(name, description)
            if(json.error){
                setError(json.error)
                setDisabled(false)
                return
            } else {
                alert("Categoria cadastrada com sucesso!")
                setModalSignupCategory(false)
                setUpdate(!update)
                setDisabled(false)
                setName('')
                setDescription('')
                return
            }            
        }

        return(
            <CreateCategoryModal>
                {modalSignupCategory ? 
                    <Modal onClose={() => setModalSignupCategory(false)}>
                        <h2>Cadastrar Categoria</h2>
                        {error && 
                            <ErrorMessage>{error}</ErrorMessage>
                        }
                        <div className="form">
                            <label className="modal--form--area">
                                <div className="modal--form--title">Nome: </div>
                                <div className="modal--form--input">
                                    <input 
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        disabled={disabled}
                                    />
                                </div>
                            </label>

                            <label className="modal--form--area">
                                <div className="modal--form--title">Descrição: </div>
                                <div className="modal--form--input">
                                    <input 
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                        disabled={disabled}
                                    />
                                </div>
                            </label>

                            <label className="modal--form--area">
                                <div className="modal--form--title"></div>
                                <button onClick={handleSubmit}>Cadastrar</button>
                            </label>
                        </div>
                    </Modal> 
                    : null
                }
            </CreateCategoryModal>            
        )
    }

    let pagination = []
    for(let i=0; i<pageCount; i++){
        pagination.push(i+1)
    }

    return(
        <PageArea>
            <CategoryArea>
                <div className="header--">
                    <h1>Categorias de Produtos</h1>
                    <div>
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" onClick={() => setModalSignupCategory(true)}>CADASTRAR CATEGORIA</Button>
                            <Button variant="contained" onClick={() => navigate('/dashboard')}>VOLTAR</Button>
                        </Stack>
                    </div>                    
                    <hr/>
                </div>

                <div className="body">
                    <div className="order">
                        <span>Ordenação: </span>
                        <select value={order} onChange={(e) => setOrder(e.target.value)} >
                            <option value="asc">Crescente</option>
                            <option value="desc">Decrescente</option>
                        </select>
                    </div>

                    <div className="search">
                        <input 
                            placeholder="Procurar por nome..."
                            value={searchName}
                            onChange={(e) => setSearchName(e.target.value)}
                        />

                        <input 
                            placeholder="Procurar por descrição..."
                            value={searchDescription}
                            onChange={(e) => setSearchDescription(e.target.value)}
                        />
                    </div>

                    <div className="body--cats">
                        {categories && 
                            categories.map((cat, key) => {
                                return(
                                    <div className="container" key={key}>
                                        <h3>{cat.name}</h3>
                                        <div className="description">{cat.description}</div>
                                        <div className="buttons">
                                            <button onClick={() => navigate(`/products/category/edit/${cat._id}`)}>Editar</button>
                                            <button onClick={() => handleDelete(cat._id)}>Excluir</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {!categories && loading && <div>Carregando...</div>}
                    {(categories.length === 0 || !categories) && !loading &&
                        <h2> Nenhuma categoria encontrada! </h2>
                    }

                    <div className="pagination">
                        {pagination.map((i,k)=>{
                            return(
                                <button 
                                    key={k} 
                                    className={i===currentPage ? "pagItem active" : "pagItem"}
                                    onClick={() => setCurrentPage(i)}
                                > 
                                    {i} 
                                </button>
                            )
                        })}
                    </div>
                </div>

                {signupCategory()}
            </CategoryArea>
        </PageArea>
    )
}

export default ProductCategory;