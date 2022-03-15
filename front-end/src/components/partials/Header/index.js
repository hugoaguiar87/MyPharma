import React from "react";
import { isLogged } from "../../../helpers/AuthHandler";

import { HeaderArea } from "./styled";

const Header = () => {
    const logged = isLogged()

    return (
        <HeaderArea>
            <div className="container">
                <div className="logo">
                    <span className="logo--first">My</span>
                    <span className="logo--last">Pharma</span>
                </div>
                {logged ? 
                    <button>Sair</button>
                    :
                    ""
                }
                
            </div>
        </HeaderArea>
    )
}

export default Header;