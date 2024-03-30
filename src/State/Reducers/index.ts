import{combineReducers} from "redux"
import TokenReducer from "./TokenReducer"
const rootReducer = combineReducers({
    token:TokenReducer,
})

export default rootReducer

export type MainState = ReturnType<typeof rootReducer>