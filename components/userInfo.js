function UserInfo(props){
    return (
        <div>
            Name:{props.user && props.user.name}
        </div>
    )
}
export default UserInfo