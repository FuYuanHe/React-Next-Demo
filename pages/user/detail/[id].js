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
UserDetail.getInitialProps = async (ctx) =>  {
    const response = await request.get(`/api/users/${ctx.query.id}`)
    console.log('response',response);
    return {user:response.data.data}
}
export default UserDetail