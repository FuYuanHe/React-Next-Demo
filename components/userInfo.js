import { useState } from 'react'
function UserInfo(props){
    const [createAt,setCreateAt] = useState(props.user.createAt)
    const changeTime = async() => {
        const moment = await import('moment')
        setCreateAt(moment.default(createAt).fromNow())
    }
    return (
        <div>
            Name:{props.user && props.user.name}
            <br/>
            createAt:{createAt}
            <br/>
            <button onClick={changeTime}>切换时间</button>
        </div>
    )
}
export default UserInfo