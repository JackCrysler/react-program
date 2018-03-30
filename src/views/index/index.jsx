import React, { Component } from 'react'
import './index.scss'
import $http from '../../utils/http'
import RouterWrapper from '../../components/route'
import { NavLink } from 'react-router-dom'

import 'react-toast-mobile/lib/react-toast-mobile.css'
class Index extends Component {
    render() {
        let { routes } = this.props
        return <div id="index">
            <div className="content">

                <RouterWrapper routes={routes}></RouterWrapper>

            </div>
            <ul className="nav">
                <li>
                    <NavLink to="/index/home" activeClassName="tab-active">
                        <span className="iconfont icon-home"></span>
                        <span>首页</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/index/catagory" activeClassName="tab-active">
                        <span className="iconfont icon-catagory"></span>
                        <span>分类</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/index/cart" activeClassName="tab-active">
                        <span className="iconfont icon-cart"></span>
                        <span>购物车</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/index/mine" activeClassName="tab-active">
                        <span className="iconfont icon-mine"></span>
                        <span>我的</span>
                    </NavLink>
                </li>
            </ul>
        </div>
    }
    componentDidMount() {

    }
}

export default Index