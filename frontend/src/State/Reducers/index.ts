import{combineReducers} from "redux"
import TokenReducer from "./TokenReducer"
import UserNameReducer from "./UserNameReducer"
const rootReducer = combineReducers({
    token:TokenReducer,
    username:UserNameReducer
})

export default rootReducer

export type MainState = ReturnType<typeof rootReducer>