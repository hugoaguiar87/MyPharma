import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { requestApi } from "../../helpers/Requests";
import { EditArea, ErrorMessage, PageArea } from "./styled";

const EditBrand = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const [brandInfos, setBrandInfos] = useState()
    const [newName, setNewName] = useState('')
    const [error, setError] = useState('')
    const [update, setUpdate] = useState(false)
    const [disabled, setDisabled] = useState(false)

    useEffect(() => {
        const loadBrand = async () => {
            const json = await requestApi.brands({ id })
            setBrandInfos(json.brands[0])
        }
        loadBrand()
    }, [update])

    const handleEditBrand = async () => {
        setDisabled(true)
        setError('')

        const json = await requestApi.editBrand(id, newName)
        if(json.error){
            setError(json.error)
            setDisabled(false)
            return
        } else {
            alert("Marca editada com sucesso!")
            setUpdate(!update)
            setDisabled(false)
            setNewName('')
            return
        }
    }

    return (
        <PageArea>
            <EditArea>
                <h1>Editar Marca</h1>

                {brandInfos ? 
                    <div className='form'>

                        {error &&
                            <ErrorMessage>{error}</ErrorMessage>
                        }
                        <label className="area">
                            <div className="area--title">Nome</div>
                            <div className="area--input">{brandInfos.name}</div>
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
                            <div className="area--title"></div>
                            <div className="area--input">
                                <button onClick={() => navigate('/brands')}>Voltar</button>
                            </div>
                            <div className="area--title"></div>
                            <div className="area--input">
                                <button onClick={() => handleEditBrand()}>Editar Marca</button>
                            </div>
                        </label>
                    </div>
                    :
                    <h2>Marca não encontrada!</h2>
                }                
                
            </EditArea>
        </PageArea>
    )
}

export default EditBrand;