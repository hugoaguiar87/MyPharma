import React from "react";
import { useNavigate } from "react-router-dom";

import { DashArea, PageArea } from "./styled";

const Dashboard = () => {
    const navigate = useNavigate()

    return(
        <PageArea>
            <DashArea>
                <h1>Dashboard</h1>

                <div className="options--area">
                    <div className="categ--area" onClick={ () => navigate('/') }>
                        <h3>PRODUTOS</h3>
                        <div className="desciption">
                            <ul>
                                <li>Cadastrar</li>
                                <li>Editar</li>
                                <li>Excluir</li>
                            </ul>
                        </div>
                    </div>    

                    <div className="categ--area" onClick={ () => navigate('/') }>
                        <h3>MARCAS</h3>
                        <div className="desciption">
                            <ul>
                                <li>Cadastrar</li>
                                <li>Editar</li>
                                <li>Excluir</li>
                            </ul>
                        </div>
                    </div>

                    <div className="categ--area" onClick={ () => navigate('/') }>
                        <h3>CATEGORIAS DE PRODUTOS</h3>
                        <div className="desciption">
                            <ul>
                                <li>Cadastrar</li>
                                <li>Editar</li>
                                <li>Excluir</li>
                            </ul>
                        </div>
                    </div>

                    <div className="categ--area" onClick={ () => navigate('/user') }>
                        <h3>MINHA CONTA</h3>
                        <div className="desciption">
                            <ul>
                                <li>Editar</li>
                                <li>Excluir</li>
                            </ul>
                        </div>
                    </div>                                        
                </div>
            </DashArea>
        </PageArea>
    )
}

export default Dashboard;