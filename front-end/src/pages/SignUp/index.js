import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDisabled } from "../../redux/reducers/configStatesReducer";

import { requestApi } from "../../helpers/Requests";
import { PageArea, ErrorMessage } from "./styled";

const SignUp = () => {
    const dispatch = useDispatch()

    const disabled = useSelector((state) => state.configStates.disabled)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPasswor] = useState('')
    const [error, setError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        dispatch(setDisabled(true))
        setError('')

        if(password !== confirmPassword){
            dispatch(setDisabled(false))
            return setError('Senhas diferentes!')
        }

        const json = await requestApi.signup( name, email, password)

        if(json.error){
            setError(json.error)
        } else if (json.token){
            alert("Cadastro realizado com sucesso!")
            window.location.href = '/'
        } else {
            setError("Ocorreu algum erro! Tente Novamente")
        }

        dispatch(setDisabled(false))
    }

    return (
        <PageArea>
            <div className="container">
                <h1>Cadastro</h1>

                {error && 
                    <ErrorMessage> {error} </ErrorMessage>
                }

                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--tittle">Nome</div>
                        <div className="area--input">
                            <input 
                                placeholder="Digite seu nome..."
                                type="text"
                                value={name}
                                onChange={ (e) => setName(e.target.value) }
                                disabled={disabled}
                                required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--tittle">Email</div>
                        <div className="area--input">
                            <input 
                                placeholder="Digite seu email..."
                                type="email"
                                value={email}
                                onChange={ (e) => setEmail(e.target.value) }
                                disabled={disabled}
                                required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--tittle">Senha</div>
                        <div className="area--input">
                            <input 
                                placeholder="Digite sua senha..."
                                type="password"
                                value={password}
                                onChange={ (e) => setPassword(e.target.value) }
                                disabled={disabled}
                                required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--tittle">Confirmar Senha</div>
                        <div className="area--input">
                            <input 
                                placeholder="Digite sua senha novamente..."
                                type="password"
                                value={confirmPassword}
                                onChange={ (e) => setConfirmPasswor(e.target.value) }
                                disabled={disabled}
                                required
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--tittle"></div>
                        <button disabled={disabled}>Cadastrar</button>
                    </label>
                </form>
            </div>
        </PageArea>
    )
}

export default SignUp;