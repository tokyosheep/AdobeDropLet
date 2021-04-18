import styled from "styled-components";

export const AIContainers = {
    Container:styled.div`
        display:grid;
        background: rgb(200,150,150);
        grid-template-columns:100%;
        grid-template-rows:50px minmax(300px,1fr) 50px;
        grid-template-areas:
        "headerAI"
        "mainAI"
        "footerAI";
    `,
    HeaderAi:styled.header`
        grid-area:headerAI;
    `,
    MainAICompo:styled.main`
        grid-area:mainAI;
        padding:5px;
        box-sizing:border-box;
    `,
    FooterAI:styled.footer`
        grid-area:footerAI;
    `
};