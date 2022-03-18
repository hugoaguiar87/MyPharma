import React from "react";
import { useNavigate } from "react-router-dom";
import { MessageArea, PageArea } from "./styled";

const NotFound = () => {
    const navigate = useNavigate()
    
    return (
        <PageArea>
            <MessageArea>
                <h1>Página não encontrada!</h1>
                <button onClick={() => navigate('/dashboard')}>Voltar para Dashboard</button>
            </MessageArea>            
        </PageArea>
    )
}

export default NotFound;