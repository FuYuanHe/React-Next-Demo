import Layout from ".."
import request from "utils/request"
function UserDetail(props){
    return (
        <Layout>
            ID:{props.user && props.user.id}
            <div></div>
            Name:{props.user && props.user.name}
        </Layout>
    )
}
UserDetail.getInitialProps = async (ctx) =>  {
    const response = await request.get(`/api/users/${ctx.query.id}`)
    console.log('response',response);
    return {user:response.data.data}
}
export default UserDetail