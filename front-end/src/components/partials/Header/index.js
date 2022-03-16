import React from "react";
import { doLogout, isLogged } from "../../../helpers/AuthHandler";

import { HeaderArea } from "./styled";

const Header = () => {
    const logged = isLogged()

    const handleLogout = () => {
        doLogout()
        window.location.href = '/'
    }

    return (
        <HeaderArea>
            <div className="container">
                <div className="logo">
                    <span className="logo--first">My</span>
                    <span className="logo--last">Pharma</span>
                </div>
                {logged ? 
                    <button onClick={handleLogout}>Sair</button>
                    :
                    ""
                }
                
            </div>
        </HeaderArea>
    )
}

export default Header;