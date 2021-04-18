import { AIActionActions , ActionType , SelectedAIAction , ActionObj } from "../redux/AIactions";

export const actionsAI_set:(actions:ActionType[])=>AIActionActions = actions =>({type:"actionsAI_set",actions:actions});

export const actionsAI_remove:()=>AIActionActions = () => ({type:"actionsAI_remove"});



export const selectedAI_set:(set:ActionObj,action:ActionObj)=>SelectedAIAction = (set,action)=>{
    return {type:"selectedAI_set",set:set,action:action};
}

export const selectedAI_setAction:(action:ActionObj)=>SelectedAIAction = action =>{
    return {type:"selectedAI_setAction",action:action};
}
