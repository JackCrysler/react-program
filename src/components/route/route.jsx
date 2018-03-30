import React,{Component} from 'react'
import {Route,Switch} from 'react-router-dom'
import {Redirect} from 'react-router-dom'
import {getCookie} from '../../utils/utils'
function isLogin(){
    return !!getCookie('token')
}

class RouteWrapper extends Component{
    render(){
        const {routes} = this.props
        return <Switch>{routes.map((item,index)=>{
            return <Route exact={item.exact} key={index} path={item.path} render={(location)=>{
                return item.authorization && !isLogin()?
                <Redirect to={{pathname:"/login",state:{from:item.path}}}></Redirect>
                :
                <item.component {...location} routes={item.children}></item.component>
            }}></Route>
        })}</Switch>
    }
}
export default RouteWrapper

{/* <Route component={Test} />
class Test extends Component{
    render(){
        return (
            <div>
                ...
                ...
                ...

                <Route component></Route>
            </div>
        )
    }
}
 */}
