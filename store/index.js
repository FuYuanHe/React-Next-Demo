import {createStore} from 'redux'
import reducer from './reducer'

export default function (initState){
    return createStore(reducer,initState)
}
