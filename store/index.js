import {createStore} from 'redux'
import reducer from './reducer'

function getStore(initState){
    return createStore(reducer,initState)
}
export {
    getStore
}