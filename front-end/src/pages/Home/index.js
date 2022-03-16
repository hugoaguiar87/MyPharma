import React, { useState } from "react";

import { doLogin } from "../../helpers/AuthHandler";
import { requestApi } from "../../helpers/Requests";
import { ErrorMessage, PageArea } from "./styled";

const Home = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberPassword, setRememberPassword] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')

    const [json, setJson] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisabled(true)
        setError('')

        const json = await requestApi.login(email, password)
        setJson(json)

        if(json.error){
            setError(json.error)
        } else {
            doLogin(json.token, rememberPassword)
            window.location.href = '/dashboard'
        }

        setDisabled(false)
    }

    console.log(error)

    return(
        <PageArea>
            <div className="container">
                <h1>Login</h1>

                {error && 
                    <ErrorMessage> {error} </ErrorMessage>
                }

                <form onSubmit={handleSubmit}>
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
                        <div className="area--tittle">Lembrar Senha</div>
                        <div className="area--input--checkbox">
                            <input 
                                type="checkbox"
                                value={rememberPassword}
                                onChange={ () => setRememberPassword(!rememberPassword) }
                                disabled={disabled}
                            />
                        </div>
                    </label>

                    <label className="area">
                        <div className="area--tittle"></div>
                        <button disabled={disabled}>Entrar</button>
                    </label>
                </form>
            </div>
        </PageArea>
    )
}

export default Home;