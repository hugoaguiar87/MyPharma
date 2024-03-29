import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUpdate, setDisabled } from "../../redux/reducers/configStatesReducer";

import { requestApi } from "../../helpers/Requests";
import { EditArea, ErrorMessage, PageArea } from "./styled";

const EditCategory = () => {
    const dispatch = useDispatch()
    const {id} = useParams()
    const navigate = useNavigate()

    const [categoryInfos, setCategoryInfos] = useState()
    const [newName, setNewName] = useState('')
    const [newDescription, setNewDescription] = useState('')
    const [error, setError] = useState('')

    const update = useSelector((state) => state.configStates.update)
    const disabled = useSelector((state) => state.configStates.disabled)

    useEffect(() => {
        const loadCategory = async () => {
            const json = await requestApi.categories({ id })
            setCategoryInfos(json.categories[0])
        }
        loadCategory()
    }, [update])

    const handleEditCategory = async () => {
        dispatch(setDisabled(true))
        setError('')

        const json = await requestApi.editCategory(id, newName, newDescription)
        if(json.error){
            setError(json.error)
            dispatch(setDisabled(false))
            return
        } else {
            alert("Categoria editada com sucesso!")
            dispatch(setUpdate(!update))
            dispatch(setDisabled(false))
            setNewName('')
            setNewDescription('')
            return
        }
    }

    return (
        <PageArea>
            <EditArea>
                <h1>Editar Categoria</h1>

                

                {categoryInfos ? 
                    <div className='form'>

                        {error &&
                            <ErrorMessage>{error}</ErrorMessage>
                        }
                        <label className="area">
                            <div className="area--title">Nome</div>
                            <div className="area--input">{categoryInfos.name}</div>
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
                            <div className="area--input">{categoryInfos.description}</div>
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
                            <div className="area--title"></div>
                            <div className="area--input">
                                <button onClick={() => navigate('/products/categories')}>Voltar</button>
                            </div>
                            <div className="area--title"></div>
                            <div className="area--input">
                                <button onClick={() => handleEditCategory()}>Editar Categoria</button>
                            </div>
                        </label>
                    </div>
                    :
                    <h2>Categoria não encontrada!</h2>
                }                
                
            </EditArea>
        </PageArea>
    )
}

export default EditCategory;