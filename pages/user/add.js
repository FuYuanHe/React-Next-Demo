import router from "next/router"
import Layout from "."
import { useRef } from "react"
import request from "utils/request"
function UserAdd() {
    const inputRef = useRef(null)
    const inputRef1 = useRef(null)
    const handleSubmit = async(e) => {
        // 先阻止默认事件
        e.preventDefault();
        const name = inputRef.current.value
        const password = inputRef1.current.value
        const user = {name,password}
        let res = await request.post('/api/register',user)
        console.log('res',res);
        if(res.data.success){
            router.push('/user/list')
        }else{
            alert('添加用户出错了')
        }
    }
    return (
        <Layout>
            <form onSubmit={handleSubmit}>
                <p>用户名：</p>
                <span>
                    <input ref={inputRef} />
                </span>
                <p>密码：</p>
                <span>
                    <input ref={inputRef1} />
                </span>
                <input type="submit"></input>
            </form>
        </Layout>
    )
}
export default UserAdd