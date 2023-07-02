
import {SET_USER_INFO} from './actionType'
const initState = {
    currentUser :null
}
function reducer(state=initState,action){
    switch (action.type) {
        case SET_USER_INFO:
            return {currentUser:action.payload}
        default:
            return state;
    }
}
export default reducer