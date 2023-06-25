import App from "next/app";
import Link from "next/link";
import styles from './_app.module.css'
import '../styles/global.css'

class LayoutApp extends App {
    static async getInitialProps({Component,ctx}){
        let pageProps = {}
        if(Component.getInitialProps&&typeof Component.getInitialProps ==='function'){
            pageProps = await Component.getInitialProps(ctx)
        }
        return {pageProps}
    }
    render() {
        let { Component,pageProps } = this.props
        return (
            <div>
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
                    </ul>
                </header>
                <Component {...pageProps}/>
                <footer style={{textAlign:"center"}}>博客尾部组件</footer>
            </div>
        )
    }
}
export default LayoutApp