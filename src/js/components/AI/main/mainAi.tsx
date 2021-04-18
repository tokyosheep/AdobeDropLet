import * as React from "react";
import { useCallback } from "react";
import { useSelector , useDispatch } from "react-redux";
import { AIContainers } from "../../../style/containers";
import { StateType } from "../../../redux/stateType";

import { selectedAI_set , selectedAI_setAction } from "../../../redux/actions/AIActions";

import { ActionSelector } from "../../../parts/selector";
const { MainAICompo } = AIContainers;

export type HandleFunc = (index:number,name:string)=>void;

const MainAI = () =>{
    const dispatch = useDispatch();
    const actions = useSelector((state:StateType)=>state.AIActions);
    const selectedAc = useSelector((state:StateType)=>state.selectedAiAction);
    const handleSet = useCallback((index,name)=>{
        dispatch(selectedAI_set(
            {name:name,index:index},
            {name:actions[index].actions[0],index:0}
        ));
    },[selectedAc]);
    const handleAction = useCallback((index,name)=>{
        dispatch(selectedAI_setAction({name:name,index:index}));
    },[selectedAc]);
    return(
        <MainAICompo>
            <ActionSelector actions={actions.map(ac=>ac.setName)} name="action sets" index={selectedAc.set.index} func={handleSet}/>
            <ActionSelector actions={actions[selectedAc.set.index].actions} name="actions" index={selectedAc.action.index} func={handleAction}/>
        </MainAICompo>
    )
}

export default MainAI;