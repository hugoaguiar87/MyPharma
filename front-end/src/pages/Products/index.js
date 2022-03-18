import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { requestApi } from "../../helpers/Requests";
import { CategoryArea, PageArea, CreateCategoryModal, ErrorMessage } from "./styled";
import Modal from "../../components/Modal";

let timer
const Products = () => {
    const urlParams = useLocation()
    const useQueryString = () => {
        return new URLSearchParams(urlParams.search)
    }
    const query = useQueryString()
    const navigate = useNavigate()

    const [searchName, setSearchName] = useState( query.get('searchName') !== null ? query.get('searchName') : '' )
    const [searchDescription, setSearchDescription] = useState( query.get('searchDescription') !== null ? query.get('searchDescription') : '' )
    const [brand, setBrand] = useState( query.get('brand') !== null ? query.get('brand') : '' )
    const [category, setCategory] = useState( query.get('category') !== null ? query.get('category') : '' )

    const [modalSignupProduct, setModalSignupProduct] = useState(false)

    const [productsTotal, setProductsTotal] = useState(0)
    const [pageCount, setPageCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const [categoriesTotal, setCategoriesTotal] = useState(0)
    const [allCategories, setAllCategories] = useState()
    const [brandsTotal, setBrandsTotal] = useState(0)
    const [allBrands, setAllBrands] = useState()

    const [products, setProducts] = useState('')
    const [order, setOrder] = useState("asc")
    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [stock, setStock] = useState('')
    const [categoryProductSignup, setCategoryProductSignup] = useState('')
    const [brandProductSignup, setBrandProductSignup] = useState('')


    const getProducts = async () => {
        let offset = (currentPage - 1) * 12

        const json = await requestApi.products({
            sort: order,
            limit: 12,
            searchName,
            searchDescription,
            brand,
            category,
            offset
        })
        setProducts(json.products)
        setProductsTotal(json.total)
        setLoading(false)
    }

    const getAllCategories = async () => {
        const json = await requestApi.categories({
            limit: categoriesTotal
        })
        setAllCategories(json.categories)
    }

    const getAllBrands = async () => {
        const json = await requestApi.brands({
            limit: brandsTotal
        })
        setAllBrands(json.brands)
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
        if(brand){
            queryString.push(`brand=${brand}`)
        }
        if(category){
            queryString.push(`category=${category}`)
        }

        navigate(`?${queryString.join("&")}`)

        if(timer){
            clearTimeout(timer)
        }

        timer = setTimeout(getProducts, 2000)
        setCurrentPage(1)
    }, [searchName, searchDescription, brand, category, order, update])

    useEffect(() => {
        if(products.length > 0){
            setPageCount( Math.ceil( productsTotal / products.length ) )
        } else {
            setPageCount(0)
        }
    }, [productsTotal])

    useEffect(() => {
        getProducts()
    }, [currentPage])

    useEffect(() => {
        const loadCategoriesTotal = async () => {
            const json = await requestApi.categories()
            setCategoriesTotal(json.total)
        }
        const loadBrandsTotal = async() => {
            const json = await requestApi.brands()
            setBrandsTotal(json.total)
        }

        loadCategoriesTotal()
        loadBrandsTotal()
    }, [])

    useEffect(() => {
        getAllBrands()
        getAllCategories()
    }, [categoriesTotal, brandsTotal])
    
    const handleDelete = async (id) => {
        const confirm = window.confirm("Confirma a exclusão desse produto?")
        
        if(confirm){
            const json = await requestApi.delProduct(id)

            if(json.error){
                return alert("Ocorreu algum erro! Tente novamente.")
            } else if (json.status){
                alert("Produto excluído com sucesso!")
                setUpdate(!update)
                return
            } else{
                return alert("Ocorreu algum erro! Tente novamente.")
            }
        }
    }

    const signupProduct = () => {
        const handleSubmit = async () => {
            setDisabled(true)
            setError('')
            let priceFormated = price.replace(/\./g, '')
            priceFormated = priceFormated.replace(',', '.')

            const json = await requestApi.createProduct(name, description, priceFormated, stock, categoryProductSignup, brandProductSignup)
            if(json.error){
                setError(json.error)
                setDisabled(false)
                return
            } else {
                alert("Produto cadastrado com sucesso!")
                setModalSignupProduct(false)
                setUpdate(!update)
                setDisabled(false)
                setName('')
                setDescription('')
                setPrice('')
                setStock('')
                setCategoryProductSignup('')
                setBrandProductSignup('')
                return
            }            
        }

        const priceMask = createNumberMask({
            prefix: '',
            includeThousandsSeparator: true,
            thousandsSeparatorSymbol: '.',
            allowDecimal: true,
            decimalSymbol: ',',
            integerLimit: 10
        })

        return(
            <CreateCategoryModal>
                {modalSignupProduct ? 
                    <Modal onClose={() => setModalSignupProduct(false)}>
                        <h2>Cadastrar Produto</h2>
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
                                        required
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
                                        required
                                    />
                                </div>
                            </label>

                            <label className="modal--form--area">
                                <div className="modal--form--title">Preço: </div>
                                <div className="modal--form--input">
                                    <MaskedInput 
                                        placeholder="R$"
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                        disabled={disabled}
                                        mask= {priceMask}
                                        required
                                    />
                                </div>
                            </label>

                            <label className="modal--form--area">
                                <div className="modal--form--title">Estoque: </div>
                                <div className="modal--form--input">
                                    <input 
                                        type="number"
                                        min={0}
                                        value={stock}
                                        onChange={e => setStock(e.target.value)}
                                        disabled={disabled}
                                        required
                                    />
                                </div>
                            </label>

                            <label className="modal--form--area">
                                <div className="modal--form--title">Categoria: </div>
                                <div className="modal--form--input">
                                    <select
                                        value={categoryProductSignup}
                                        onChange={(e) => setCategoryProductSignup(e.target.value)}
                                        disabled={disabled}
                                        required
                                    >
                                        <option value='' disabled>Selecione uma categoria...</option>
                                        {allCategories && 
                                            allCategories.map((i,k) => {
                                                return(
                                                    <option value={i._id} key={k}>{i.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </label>

                            <label className="modal--form--area">
                                <div className="modal--form--title">Marca: </div>
                                <div className="modal--form--input">
                                    <select
                                        value={brandProductSignup}
                                        onChange={(e) => setBrandProductSignup(e.target.value)}
                                        disabled={disabled}
                                        required
                                    >
                                        <option value='' disabled>Selecione uma marca...</option>
                                        {allBrands && 
                                            allBrands.map((i,k) => {
                                                return(
                                                    <option value={i._id} key={k}>{i.name}</option>
                                                )
                                            })
                                        }
                                    </select>
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

    console.log(products)

    return(
        <PageArea>
            <CategoryArea>
                <div className="header--">
                    <h1>Produtos</h1>
                    <div>
                        <Stack spacing={2} direction="row">
                            <Button variant="contained" onClick={() => setModalSignupProduct(true)}>CADASTRAR PRODUTO</Button>
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

                        <select
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        >
                            <option value=''>Filtrar por marca...</option>
                            {allBrands &&
                                allBrands.map((i,k)=> {
                                    return(
                                        <option key={k} value={i._id}>{i.name}</option>
                                    )
                                })
                            }
                        </select>

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value=''>Filtrar por categoria...</option>
                            {allCategories &&
                                allCategories.map((i,k)=> {
                                    return(
                                        <option key={k} value={i._id}>{i.name}</option>
                                    )
                                })
                            }
                        </select>
                    </div>

                    <div className="body--products">
                        {products && 
                            products.map((p, key) => {
                                return(
                                    <div className="container" key={key}>
                                        <h3>{p.name}</h3>
                                        <div className="description">{p.description}</div>
                                        <div className="infos">Preço: R$ {p.price}</div>
                                        <div className="infos">Estoque: {p.stock}</div>
                                        <div className="infos">Categoria: {p.category?.name}</div>
                                        <div className="infos">Marca: {p.brand?.name}</div>
                                        <div className="buttons">
                                            <button onClick={() => navigate(`/products/edit/${p._id}`)}>Editar</button>
                                            <button onClick={() => handleDelete(p._id)}>Excluir</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>

                    {!products && loading && <div>Carregando...</div>}
                    {(products.length === 0 || !products) && !loading &&
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

                {signupProduct()}
            </CategoryArea>
        </PageArea>
    )
}

export default Products;