import { ActionType  , SelectedSet } from "./redux/AIactions";

export type StateType = {
    AIActions:ActionType[],
    selectedAiAction:SelectedSet
}