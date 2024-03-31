import { ActionType } from "../ActionType";
interface Token{
    type: ActionType.CHANGE_TOKEN; 
    payload: string; 
}
interface UserName{
    type: ActionType.CHANGE_USERNAME; 
    payload: string; 
}


export type Action = Token|UserName;