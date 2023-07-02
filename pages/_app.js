import App from "next/app";
import Link from "next/link";
import styles from './_app.module.css'
import '../styles/global.css'
import {Provider} from 'react-redux'
import createStore from '../store'
import request from "utils/request";
import { SET_USER_INFO } from "store/actionType";


function getStore(initState){
    // 区分服务器环境和客户端环境，每次都会创新新的仓库
    if(typeof window === 'undefined'){
        return createStore(initState)
    }else{
        // 客户端只会在首次创建仓库，之后使用老仓库
        if(!window._REDUX_STORE_){
            window._REDUX_STORE_ = createStore(initState)
        }
        return window._REDUX_STORE_
    }
}
class LayoutApp extends App {
    constructor(props){
        super(props)
        this.store = getStore(props.initState)
    }
    static async getInitialProps({Component,ctx}){
        const store = getStore()
        if(typeof window === 'undefined'){
            const options = {url:'/api/validate'}
            if(ctx.req && ctx.req.headers.cookie){
                options.headers = options.headers||{}
                options.headers['cookie'] = ctx.req.headers.cookie
            }
            const response = await request(options).then(res=>res.data)
            if(response.success){
                store.dispatch({type:SET_USER_INFO,payload:response.data})
            }
        }
        let props = {}
        let pageProps = {}
        if(Component.getInitialProps&&typeof Component.getInitialProps ==='function'){
            pageProps = await Component.getInitialProps(ctx)
        }
        props.pageProps = pageProps
        if(typeof window === 'undefined'){
            props.initState = store.getState() 
        }
        // 在服务器端获取props，传递给constructor使用，在客户端使用
        return props
    }
    render() {
        let { Component,pageProps } = this.props
        const state = this.store.getState()
        return (
            <Provider store={this.store}>
                <style>
                    {
                        `li{
                            display:inline-block;
                            margin-left:30px;
                            line-height:60px
                        }
                        `
                    }
                </style>
                <header>
                    <img src="/images/gyy.jpg" className={styles.logo}></img>
                    <ul>
                        <li><Link href={'/'}>首页</Link></li>
                        <li><Link href={'/user'}>用户管理</Link></li>
                        <li><Link href={'/profile'}>个人中心</Link></li>
                        <li>
                            {
                                state.currentUser?<span>{state.currentUser.name}</span>:<Link href={'/login'}>登录</Link>
                            }
                        </li>
                    </ul>
                </header>
                <Component {...pageProps}/>
                <footer style={{textAlign:"center"}}>博客尾部组件</footer>
            </Provider>
        )
    }
}
export default LayoutApp