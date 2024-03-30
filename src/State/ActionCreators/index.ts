import { ActionType } from "../ActionType";
import{Dispatch} from "redux";
import { Action } from "../Actions";


export const ChangeToken = (state:string) => {
    return (dispatch : Dispatch<Action>) => {
        dispatch({
            type: ActionType.CHANGE_TOKEN,
            payload: state,
        });
    }
}
