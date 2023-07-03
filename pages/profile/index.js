import Router from "next/router"
import request from "utils/request"
function Profile(props) {
    return (
        <div>
            Profile页面
            当前用户：{props.currentUser && props.currentUser.name}
            <button onClick={() => Router.back()}>返回</button>
        </div>
    )
}

// 通过接口查询
// Profile.getInitialProps = async (ctx)=>{
//     const options = {url:'/api/validate'}
//     if(ctx.req && ctx.req.headers.cookie){
//         options.headers = options.headers||{}
//         options.headers['cookie'] = ctx.req.headers.cookie
//     }
//     const response = await request(options).then(res=>res.data)
//     if(response.success){
//         return {currentUser:response.data}
//     }else{
//         if(ctx.req){
//             ctx.res.writeHead(302,{loaction:'/login'})
//             ctx.res.end()
//         }else{
//             Router.push('/login') 
//         }
//         return {}
//     }
// }

// 通过store获取
Profile.getInitialProps = async (ctx, store) => {
    const state = store.getState()
    const currentUser = state.currentUser
    if (currentUser) {
        return { currentUser }
    } else {
        if (ctx.req) {
            ctx.res.writeHead(302, { loaction: '/login' })
            ctx.res.end()
        } else {
            Router.push('/login')
        }
        return {}
    }

}

export default Profile