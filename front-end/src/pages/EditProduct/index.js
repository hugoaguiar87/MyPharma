import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import { requestApi } from "../../helpers/Requests";
import { EditArea, ErrorMessage, PageArea } from "./styled";

const EditProduct = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const [categoriesTotal, setCategoriesTotal] = useState(0)
    const [allCategories, setAllCategories] = useState()
    const [brandsTotal, setBrandsTotal] = useState(0)
    const [allBrands, setAllBrands] = useState()

    const [productInfos, setProductInfos] = useState()
    const [newName, setNewName] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [newPrice, setNewPrice] = useState('')
    const [newStock, setNewStock] = useState('')
    const [newCategory, setNewCategory] = useState('')
    const [newBrand, setNewBrand] = useState('')
    const [error, setError] = useState('')
    const [update, setUpdate] = useState(false)
    const [disabled, setDisabled] = useState(false)

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

    useEffect(() => {
        const loadProduct = async () => {
            const json = await requestApi.products({ id })
            setProductInfos(json.products[0])
        }
        loadProduct()
    }, [update])

    const handleEditProduct = async () => {
        setDisabled(true)
        setError('')
        let priceFormated = newPrice.replace(/\./g, '')
        priceFormated = priceFormated.replace(',', '.')

        const json = await requestApi.editProduct(id, newName, newDescription, priceFormated, newStock, newCategory, newBrand)
        if(json.error){
            setError(json.error)
            setDisabled(false)
            return
        } else {
            alert("Produto editado com sucesso!")
            setUpdate(!update)
            setDisabled(false)
            setNewName('')
            setNewDescription('')
            setNewPrice('')
            setNewStock('')
            setNewCategory('')
            setNewBrand('')
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

    return (
        <PageArea>
            <EditArea>
                <h1>Editar Produto</h1>

                {productInfos ? 
                    <div className='form'>

                        {error &&
                            <ErrorMessage>{error}</ErrorMessage>
                        }
                        <label className="area">
                            <div className="area--title">Nome</div>
                            <div className="area--input">{productInfos.name}</div>
                            <div className="area--title">Novo Nome</div>
                            <div className="area--input">
                                <input 
                                    type='text'
                                    placeholder="Digite o novo nome..."
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    disabled={disabled}
                                />
                            </div>
                        </label> 
                                
                        <label className="area">
                            <div className="area--title">Descrição</div>
                            <div className="area--input">{productInfos.description}</div>
                            <div className="area--title">Nova Descrição</div>
                            <div className="area--input">
                                <textarea
                                    value={newDescription}
                                    onChange={(e) => setNewDescription(e.target.value)}
                                    disabled={disabled}
                                >
                                </textarea>
                            </div>
                        </label>

                        <label className="area">
                            <div className="area--title">Preço</div>
                            <div className="area--input">R$ {productInfos.price}</div>
                            <div className="area--title">Novo Preço</div>
                            <div className="area--input">
                                <MaskedInput 
                                    placeholder="R$"
                                    value={newPrice}
                                    onChange={e => setNewPrice(e.target.value)}
                                    disabled={disabled}
                                    mask= {priceMask}
                                />
                            </div>
                        </label>

                        <label className="area">
                            <div className="area--title">Estoque</div>
                            <div className="area--input">{productInfos.stock}</div>
                            <div className="area--title">Novo Estoque</div>
                            <div className="area--input">
                                <input 
                                    type="number"
                                    min={0}
                                    value={newStock}
                                    onChange={e => setNewStock(e.target.value)}
                                    disabled={disabled}
                                />
                            </div>
                        </label> 

                        <label className="area">
                            <div className="area--title">Categoria</div>
                            <div className="area--input">{productInfos.category?.name}</div>
                            <div className="area--title">Nova Categoria</div>
                            <div className="area--input">
                                <select
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    disabled={disabled}
                                >
                                    <option value=''>Selecione uma categoria...</option>
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

                        <label className="area">
                            <div className="area--title">Marca</div>
                            <div className="area--input">{productInfos.brand?.name}</div>
                            <div className="area--title">Nova Marca</div>
                            <div className="area--input">
                                <select
                                    value={newBrand}
                                    onChange={(e) => setNewBrand(e.target.value)}
                                    disabled={disabled}
                                >
                                    <option value=''>Selecione uma marca...</option>
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

                        <label className="area">
                            <div className="area--title"></div>
                            <div className="area--input">
                                <button onClick={() => navigate('/products')}>Voltar</button>
                            </div>
                            <div className="area--title"></div>
                            <div className="area--input">
                                <button onClick={() => handleEditProduct()}>Editar Produto</button>
                            </div>
                        </label>
                    </div>
                    :
                    <h2>Produto não encontrado!</h2>
                }                
                
            </EditArea>
        </PageArea>
    )
}

export default EditProduct;