import * as React from "react";

import Footer from "../components/AI/footer/footerAI";
import MainAI from "../components/AI/main/mainAi";
import Header from "../components/AI/header/headerAI";

import { AIContainers } from "../style/containers";
const { Container } = AIContainers;

const AiPage = () =>{
    return(
        <Container>
            <Header />
            <MainAI />
            <Footer />
        </Container>
    )
}

export default AiPage;