import { ActionType } from "../ActionType";
interface Token{
    type: ActionType.CHANGE_TOKEN; 
    payload: string; 
}


export type Action = Token;