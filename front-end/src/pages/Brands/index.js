import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setOrder, setUpdate, setDisabled } from "../../redux/reducers/configStatesReducer";

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { requestApi } from "../../helpers/Requests";
import { CategoryArea, PageArea, CreateCategoryModal, ErrorMessage } from "./styled";
import Modal from "../../components/Modal";

let timer
const Brands = () => {
    const dispatch = useDispatch()
    const urlParams = useLocation()
    const useQueryString = () => {
        return new URLSearchParams(urlParams.search)
    }
    const query = useQueryString()
    const navigate = useNavigate()

    const [search, setSearch] = useState( query.get('search') !== null ? query.get('search') : '' )
    
    const [modalSignupBrand, setModalSignupBrand] = useState(false)

    const [brandsTotal, setBrandsTotal] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const order = useSelector((state) => state.configStates.order)
    const update = useSelector((state) => state.configStates.update)
    const disabled = useSelector((state) => state.configStates.disabled)

    const [brands, setBrands] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [name, setName] = useState('')


    const getBrands = async () => {
        let offset = (currentPage - 1) * 12

        const json = await requestApi.brands({
            sort: order,
            limit: 12,
            search,
            offset
        })
        setBrands(json.brands)
        setBrandsTotal(json.total)
        setLoading(false)
    }

    useEffect(() => {
        setLoading(true)
        let queryString = []
        if(search){
            queryString.push(`searchName=${search}`)
        }

        navigate(`?${queryString.join("&")}`)

        if(timer){
            clearTimeout(timer)
        }

        timer = setTimeout(getBrands, 2000)
        setCurrentPage(1)
    }, [search, order, update])

    useEffect(() => {
        if(brands.length > 0){
            setPageCount( Math.ceil( brandsTotal / brands.length ) )
        } else {
            setPageCount(0)
        }
    }, [brandsTotal])

    useEffect(() => {
        getBrands()
    }, [currentPage])
    
    const handleDelete = async (id) => {
        const confirm = window.confirm("Confirma a exclusão dessa marca?")
        
        if(confirm){
            const json = await requestApi.delBrand(id)

            if(json.error){
                return alert("Ocorreu algum erro! Tente novamente.")
            } else if (json.status){
                alert("Marca excluída com sucesso!")
                dispatch(setUpdate(!update))
                return
            } else{
                return alert("Ocorreu algum erro! Tente novamente.")
            }
        }
    }

    const signupBrand = () => {
        const handleSubmit = async () => {
            dispatch(setDisabled(true))
            setError('')

            const json = await requestApi.createBrand(name)
            if(json.error){
                setError(json.error)
                dispatch(setDisabled(false))
                return
            } else {
                alert("Marca cadastrada com sucesso!")
                setModalSignupBrand(false)
                dispatch(setUpdate(!update))
                dispatch(setDisabled(false))
                setName('')
                return
            }            
        }

        return(
            <CreateCategoryModal>
                {modalSignupBrand ? 
                    <Modal onClose={() => setModalSignupBrand(false)}>
                        <h2>Cadastrar Marca</h2>
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
                    <h1>Marcas</h1>
                    <div>
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" onClick={() => setModalSignupBrand(true)}>CADASTRAR MARCA</Button>
                            <Button variant="contained" onClick={() => navigate('/dashboard')}>VOLTAR</Button>
                        </Stack>
                    </div>                    
                    <hr/>
                </div>

                <div className="body">
                    <div className="order">
                        <span>Ordenação: </span>
                        <select value={order} onChange={(e) => dispatch( setOrder(e.target.value) )} >
                            <option value="asc">Crescente</option>
                            <option value="desc">Decrescente</option>
                        </select>
                    </div>

                    <div className="search">
                        <input 
                            placeholder="Procurar por nome..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    <div className="body--brands">
                        {brands && 
                            brands.map((b, key) => {
                                return(
                                    <div className="container" key={key}>
                                        <h3>{b.name}</h3>
                                        <div className="buttons">
                                            <button onClick={() => navigate(`/brands/edit/${b._id}`)}>Editar</button>
                                            <button onClick={() => handleDelete(b._id)}>Excluir</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {!brands && loading && <div>Carregando...</div>}
                    {(brands.length === 0 || !brands) && !loading &&
                        <h2> Nenhuma marca encontrada! </h2>
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

                {signupBrand()}
            </CategoryArea>
        </PageArea>
    )
}

export default Brands;