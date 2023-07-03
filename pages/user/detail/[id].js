import Layout from ".."
import { useState } from "react"
import request from "utils/request"
import dynamic from "next/dynamic"
const DynamicUserInfo = dynamic(()=>import('../../../components/UserInfo'))
function UserDetail(props){
    const [show,setShow] = useState(false)
    return (
        <Layout>
            ID:{props.user && props.user.id}
            <div></div>
            <button onClick={()=>setShow(!show)}>显示/隐藏</button>
            {
              show &&  props.user &&  <DynamicUserInfo user={props.user} />
            }
        </Layout>
    )
}
// UserDetail.getInitialProps = async (ctx) =>  {
//     const response = await request.get(`/api/users/${ctx.query.id}`)
//     console.log('response',response);
//     return {user:response.data.data}
// }

export async function getStaticProps() {
    const res = await request.get(`/api/users/${ctx.query.id}`)
    return {user:res.data.data}
}
export async function getStaticPaths(){
    const res = await request.get('/api/users')
    const users = res.data.data
    // 用户详情页的路径字符串数组，在编译的时候回调用此方法获取数组，依次访问此路径，并根据路径生成静态HTML文件
    const paths =users.map(user=>`/user/detail/${user.id}`)
    return {
        paths
    }
}
export default UserDetail