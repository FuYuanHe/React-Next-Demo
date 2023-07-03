import Link from "next/link"
import Layout from "."
import request from "utils/request"
function UserList(props){
    return (
        <Layout>
            <ul>
                {
                    props.list && Array.isArray(props.list)&& props.list.map(user=><li key={user.id}><Link href={`/user/detail/${user.id}`}>{user.name}</Link></li>)
                }
            </ul>
        </Layout>
    )
}
// UserList.getInitialProps = async ()=>{
//     const response = await request.get('/api/users')

//     return {
//         list:response.data.data
//     }
// }

// 新的方法
export async function getServerSideProps(){
    // const res = await request.get('http://localhost:5000/api/users')
    const res = await request.get('/api/users')
    return {
        props:{
            list:res.data.data
        }
    }
}
export default UserList