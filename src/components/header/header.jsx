import React,{Component} from 'react'
import './header.scss'
class Header extends Component{
    constructor(){
        super()
        this.goBack = this.goBack.bind(this)
    }
    render(){
        return <header><span onClick={this.goBack} className="iconfont icon-left-arrow"></span><span>{this.props.children}</span></header>
    }
    goBack(){
        this.props.history.go(-1)
    }
}

export default Header