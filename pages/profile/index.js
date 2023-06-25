import Router from "next/router"
function Profile (){
    return (
        <div>
            Profile页面
            <button onClick={()=>Router.back()}>返回</button>
        </div>
    )
}
export default Profile