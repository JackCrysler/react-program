import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

export class Notify extends Component {
    constructor(){
        super()
        this.state={
            isOpen:true
        }
        this.notifyStyle={
            position:'absolute'
        }
        this.contentStyle={
            position:'absolute',
            left:'50%',
            top:'50%',
            transform:'translate3d(-50%,-50%,0)',
            border:'1px solid red',
            padding:'10px',
            width:'80%',
            color:'#fff',
            background:'rgba(0,0,0,0.7)'
        }
        this.openNotify = this.openNotify.bind(this)
    }
    render() {
        let {isOpen } = this.state;
        let {msg} = this.props;
        return isOpen ? (
            <div id="notify" style={this.contentStyle}>
                <div>{msg}</div>
            </div>
        ):null
    }
    openNotify(){
        this.setState({
            isOpen:true
        })
    }
    componentWillUnmount(){
        console.log('即将删除notify组件')
    }
    componentDidMount(){
        this.timer = setTimeout(()=>{
            this.props.autoClose()
        },2000)
    }
    componentWillUnmount(){
        clearTimeout(this.timer)
    }
}

export class Loading extends Component {
    constructor(){
        super()
        this.state={
            isOpen:true
        }
        this.notifyStyle={
            position:'absolute',
            top:'0',
            left:'0',
            width:"100%",
            height:'100%',
            background:'rgba(0,0,0,0.7)'
        }
        this.contentStyle={
            position:'absolute',
            left:'50%',
            top:'50%',
            transform:'translate3d(-50%,-50%,0)',
            textAlign:'center'
        }
    }
    render() {
        let {isOpen } = this.state;
        let {msg} = this.props;
        return isOpen ? (
            <div id="notify" style={this.notifyStyle}>
                <div style={this.contentStyle}>
                <img src={require("../../static/img/tail-spin.svg")} width="50" alt="" />
                </div>
            </div>
        ):null
    }
    componentWillUnmount(){
        console.log('即将删除notify组件')
    }
}


/**
 * @callback mountNotify 打开组件的函数
 * @callback unMountNotify 关闭组件的函数 
 * @param(string) container 指定将来组件要渲染的容器
 * @param(string) type 指定组件的类型
 *      default:notify
 *      notify:notify
 *      loading:loading 
 *      
 */

class NotifyPortals extends Component {
    constructor() {
        super()
        this.state = {
            isMounted: false,
            renderTo: document.body,
            msg:'some message for you... '
        }
        
        document.body.style.cssText = "position:relative";
        this.mountNotify = this.mountNotify.bind(this)
        this.unMountNotify = this.unMountNotify.bind(this)
    }
    render() {
        let { isMounted, renderTo, msg } = this.state;
        let {type} = this.props;
        
        return isMounted && ReactDOM.createPortal(type=='loading'?<Loading />:<Notify msg={msg} autoClose={this.unMountNotify} />, renderTo)
    }
    componentDidMount() {
        let { container } = this.props;
        if (typeof container == 'string') {
            let el = document.querySelector(container);
            
            el.style.cssText = "position:relative";
            this.setState({
                renderTo: el
            })
        } else {
            console.log('container目前只支持字符串')
        }
    }
    mountNotify(msg){
        this.setState({
            isMounted:true,
            msg
        })
    }
    unMountNotify(){
        this.setState({
            isMounted:false
        })
    }
}

NotifyPortals.propTypes={
    container:PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired
}

export default NotifyPortals