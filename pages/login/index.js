import Layout from "../user"
import { useRef } from "react"
import {useDispatch} from 'react-redux'
import { SET_USER_INFO } from "store/actionType"
import request from "utils/request"
import {router} from 'next/router'

function login(){
    const dispatch = useDispatch()
    const inputRef = useRef(null)
    const inputRef1 = useRef(null)
    const handleSubmit = async(event)=>{
        event.preventDefault()
        const name = inputRef.current.value
        const password = inputRef1.current.value
        const user = {name,password}
        let res = await request.post('/api/login',user)
        console.log('res',res);
        if(res.data.success){
            // 将用户信息保存到仓库中
            dispatch({type:SET_USER_INFO,payload:user})
            router.push('/')
        }else{
            alert('登录失败')
        }
    }
    return (
        // <Layout>
            <form>
                <p>用户名：</p>
                <span>
                    <input ref={inputRef} />
                </span>
                <p>密码：</p>
                <span>
                    <input ref={inputRef1} />
                </span>
                <button onClick={handleSubmit}>注册</button>
            </form>
        // </Layout>
    )
}
export default login