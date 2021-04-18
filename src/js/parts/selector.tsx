import * as React from "react";
import styled from "styled-components";

import { HandleFunc } from "../components/AI/main/mainAi";
import { StdTitle } from "../style/mixin";

const ActionBoxWrapper = styled.div`
    padding: 5px;
    width: 100%;
    box-sizing:border-box;
    border: 1px solid #666;
    border-radius: 5px;
    background:rgba(250,150,100,0.2);
`;

const ActionSelectorWrapper = styled.ul`
    height: 60px;
    width: 100%;
    overflow:scroll;
    background: rgba(0,0,0,0.2);
    list-style:none;
    padding: 0;
    cursor: pointer;
`;

const ActionRadioLabel = styled.label<{checked:boolean}>`
    width: 100%;
    height: 20px;
    text-align:center;
    border-bottom: 1px solid #000;
    display: block;
    background:${props => props.checked ? "rgba(200,200,200,0.2)" : "rgba(0,0,0,0)"};
`;

const RadioInput = styled.input`
    display: none;
`;

const RadioTitle = styled.p`
    margin: 0;
    color: #fff;
    font-size: 12px;
    font-weight: 200;
`;

export const ActionSelector:(props:{actions:string[],name:string,index:number,func:HandleFunc})=>JSX.Element = ({actions,name,index,func}) =>{
    const aciontBoxes = actions.map((ac,i)=>{
        return(
            <li key={i}>
                <ActionRadioLabel checked={index===i}>
                    <RadioInput type="radio" checked={index === i} onChange={(e)=>func(i,ac)}></RadioInput>
                    <RadioTitle>{ac}</RadioTitle>
                </ActionRadioLabel>
            </li>
        )
    })
    return(
        <ActionBoxWrapper >
            <StdTitle>{name}</StdTitle>
            <ActionSelectorWrapper>
                {aciontBoxes}
            </ActionSelectorWrapper>
        </ ActionBoxWrapper >
    )
}