import { AIActions , selectedAiAction } from "../redux/AIactions";
import { combineReducers , createStore } from "redux";

const rootReducer = combineReducers({
    AIActions,
    selectedAiAction
});

const configStore = () => createStore(rootReducer);

export default configStore;
