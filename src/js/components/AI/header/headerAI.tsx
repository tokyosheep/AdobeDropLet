import * as React from "react";
import styled from "styled-components";

import { AIContainers } from "../../../style/containers";
const { HeaderAi } = AIContainers;

const Title = styled.h1`
    font-size: 16px;
    color: #fff;
    font-weight: 3000;
`;

const Header = () =>{
    return(
        <HeaderAi>
            <Title>AI droplet</Title>
        </HeaderAi>
    )
}

export default Header;