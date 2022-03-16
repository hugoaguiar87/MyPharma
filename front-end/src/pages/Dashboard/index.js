import React from "react";

import { DashArea, PageArea } from "./styled";

const Dashboard = () => {
    return(
        <PageArea>
            <DashArea>
                <h1>Dashboard</h1>

                <div className="options--area">
                    <div className="categ--area">
                        <h3>PRODUTOS</h3>
                        <div className="desciption">
                            <ul>
                                <li>Cadastrar</li>
                                <li>Editar</li>
                                <li>Excluir</li>
                            </ul>
                        </div>
                    </div>    

                    <div className="categ--area">
                        <h3>MARCAS</h3>
                        <div className="desciption">
                            <ul>
                                <li>Cadastrar</li>
                                <li>Editar</li>
                                <li>Excluir</li>
                            </ul>
                        </div>
                    </div>

                    <div className="categ--area">
                        <h3>CATEGORIAS DE PRODUTOS</h3>
                        <div className="desciption">
                            <ul>
                                <li>Cadastrar</li>
                                <li>Editar</li>
                                <li>Excluir</li>
                            </ul>
                        </div>
                    </div>

                    <div className="categ--area">
                        <h3>USUÁRIOS</h3>
                        <div className="desciption">
                            <ul>
                                <li>Cadastrar</li>
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