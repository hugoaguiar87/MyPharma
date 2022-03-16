import React, { useEffect, useState } from "react";
import { requestApi } from "../../helpers/Requests";

import { PageArea, UsersArea, EditUserModal, ErrorMessage } from "./styled";
import Modal from "../../components/Modal";

const Users = () => {
    const [user, setUser] = useState({})
    const [modalEditUser, setModalEditUser] = useState(false)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [newEmail, setNewEmail] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')
    const [update, setUpdate] = useState(false)

    useEffect(() => {
        const loadUser = async () => {
            let infos = await requestApi.userInfos()
            setUser(infos.user)
            setName(infos.user.name)
            setEmail(infos.user.email) 
        }

        loadUser()
    }, [update])

    const editUser = () => {
        const handleSubmit = async () => {
            setDisabled(true)
            setError('')
            let json

            if(newPassword){
                if(newPassword === confirmPassword){
                    json = await requestApi.editUser(name, newEmail, newPassword)

                    if(json.error){
                        setError(json.error)
                        setDisabled(false)
                        return
                    } else{
                        setModalEditUser(false)
                        setUpdate(!update)
                        setDisabled(false)
                        setNewEmail('')
                        setNewPassword('')
                        setConfirmPassword('')
                        return
                    }
                } else{
                    setError('Senhas diferentes!')
                    setDisabled(false)
                    return
                }
            }

            json = await requestApi.editUser(name, newEmail)
            if(json.error){
                setError(json.error)
                setDisabled(false)
                return
            } else {
                setModalEditUser(false)
                setUpdate(!update)
                setDisabled(false)
                setNewEmail('')
                return
            }            
        }

        return(
            <EditUserModal>
                {modalEditUser ? 
                    <Modal onClose={() => setModalEditUser(false)}>
                        <h2>Editar Usuário</h2>
                        {error && 
                            <ErrorMessage>{error}</ErrorMessage>
                        }
                        <div className="form">
                            <label className="modal--form--area">
                                <div className="modal--form--title">Nome: </div>
                                <div className="modal--form--input">
                                    <input 
                                        type='text'
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                        disabled={disabled}
                                    />
                                </div>
                            </label>

                            <label className="modal--form--area">
                                <div className="modal--form--title">Email: </div>
                                <div className="modal--form--input">
                                    <input 
                                        type='email'
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        disabled
                                    />
                                </div>
                            </label>

                            <label className="modal--form--area">
                                <div className="modal--form--title">Novo Email: </div>
                                <div className="modal--form--input">
                                    <input 
                                        type='email'
                                        value={newEmail}
                                        onChange={e => setNewEmail(e.target.value)}
                                        disabled={disabled}
                                    />
                                </div>
                            </label>

                            <label className="modal--form--area">
                                <div className="modal--form--title">Nova Senha: </div>
                                <div className="modal--form--input">
                                    <input 
                                        type='password'
                                        value={newPassword}
                                        onChange={e => setNewPassword(e.target.value)}
                                        disabled={disabled}
                                    />
                                </div>
                            </label>

                            <label className="modal--form--area">
                                <div className="modal--form--title">Confirmar Nova Senha: </div>
                                <div className="modal--form--input">
                                    <input 
                                        type='password'
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                        disabled={disabled}
                                    />
                                </div>
                            </label>

                            <label className="modal--form--area">
                                <div className="modal--form--title"></div>
                                <button onClick={handleSubmit}>Alterar</button>
                            </label>
                        </div>
                    </Modal> 
                    : null
                }
            </EditUserModal>            
        )
    }

    return (
        <PageArea>
            <UsersArea>                
                <div className="infos">
                    <h1>Minha Conta</h1>
                    <label className="area">
                        <div className="area--title">Nome:</div>
                        <div className="area--info">{user.name}</div>
                    </label>

                    <label className="area">
                        <div className="area--title">Email:</div>
                        <div className="area--info">{user.email}</div>
                    </label>
                    
                    <div className="area">
                        <div className="area--title"></div>
                        <div className="area--info">
                            <button 
                                className="info--button" 
                                onClick={() => setModalEditUser(true)}
                            >
                                Alterar Dados
                            </button>
                        </div>
                    </div>
                </div>

                {editUser()}               
            </UsersArea>
        </PageArea>
    )
}

export default Users;