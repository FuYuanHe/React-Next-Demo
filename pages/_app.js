import App from "next/app";
import Link from "next/link";

class LayoutApp extends App{
    render(){
        let {Component} = this.props
        return (
            <div>
                <Component />
            </div>
        )
    }
}
export default LayoutApp