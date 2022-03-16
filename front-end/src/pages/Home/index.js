import React, { useState } from "react";
import { Navigate } from "react-router-dom"

import { doLogin, isLogged } from "../../helpers/AuthHandler";
import { requestApi } from "../../helpers/Requests";
import { ErrorMessage, PageArea } from "./styled";

const Home = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberPassword, setRememberPassword] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [error, setError] = useState('')

    const logged = () => {
        const log = isLogged()

        return (log ? <Navigate to='/dashboard'/> : "")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setDisabled(true)
        setError('')

        const json = await requestApi.login(email, password)

        if(json.error){
            setError(json.error)
        } else if (json.token){
            doLogin(json.token, rememberPassword)
            window.location.href = '/dashboard'
        } else {
            setError("Ocorreu algum erro! Tente Novamente")
        }

        setDisabled(false)
    }

    return(
        <PageArea>
            {logged()}

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

                <div className="area">
                    <div className="area--tittle"></div>
                    <span>Não é cadastro? <a href="/signup">Cadastre-se</a></span>
                </div>
            </div>
        </PageArea>
    )
}

export default Home;