export type ActionType = {
    setName:string,
    actions:string[]
};

const initActions:ActionType[] = [{
    setName:"",
    actions:[""]
}];

export type AIActionActions = 
    {type:"actionsAI_set",actions:ActionType[]}|
    {type:"actionsAI_remove"};

type AIActionReducer = (state:ActionType[],action:AIActionActions)=>ActionType[];

export const AIActions:AIActionReducer = (state=initActions,action)=>{
    switch(action.type){
        case "actionsAI_set":
            return action.actions;

        case "actionsAI_remove":
            return [];

        default:
            return state;
    }
}

export type ActionObj = {
    name:string,
    index:number
}

export type SelectedSet = {
    set:ActionObj,
    action:ActionObj
};

const initSelectedAI:SelectedSet = {
    set:{
        name:"",
        index:0
    },
    action:{
        name:"",
        index:0
    }
}

export type SelectedAIAction = 
    {type:"selectedAI_set",set:ActionObj,action:ActionObj}|
    {type:"selectedAI_setAction",action:ActionObj};

type SelectedReducer = (state:SelectedSet,action:SelectedAIAction)=>SelectedSet;

export const selectedAiAction:SelectedReducer = (state=initSelectedAI,action)=>{
    switch(action.type){
        case "selectedAI_set":
            return{
                set:action.set,
                action:action.action
            };

        case "selectedAI_setAction":
            return {
                set:state.set,
                action:action.action
            };

        default:
            return state;
    }
}