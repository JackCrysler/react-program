import React,{Component} from 'react'
import {loginout} from '../../utils/utils'
import Dialog from './../../components/dialog'
import './setting.scss'
class Setting extends Component{
    constructor(){
        super()
        this.state={
            flag:false
        }
        this.logout=this.logout.bind(this)
        this.close=this.close.bind(this)
        this.callback=this.callback.bind(this)
    }
    render(){
        let {flag} = this.state
        return <div id="setting">
            <header>设置</header>
            <button className="logout" onClick={this.logout}>退出登录</button>
            {flag&&<Dialog title="提示信息"
                    info={'您确定要退出吗？'}
                    close={this.close } 
                    callback={this.callback}/>}
        </div>
    }
    close(){
        this.setState({
            flag:false
        })
    }
    callback(){
       loginout()
       this.props.history.push('/index/home')
    }
    logout(){
        this.setState({
            flag:true
        })
    }
}
export default Setting