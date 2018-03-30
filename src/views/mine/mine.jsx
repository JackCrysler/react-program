import React, { Component } from 'react'
import './mine.scss'
import {connect} from 'react-redux'
import mapStateToProps from './state'
class Mine extends Component {
    constructor() {
        super()
        this.toSetting = this.toSetting.bind(this)
        this.toDeliveryList = this.toDeliveryList.bind(this)
    }
    render() {
        let {userInfo} = this.props;
        return <div id="mine">
            <header>
                <span className="iconfont icon-setting" onClick={this.toSetting}></span><span>我的717商城</span>

            </header>
            <section className="user-info">
                <dl>
                    <dt></dt>
                    <dd>
                        <p>{userInfo.name}</p>
                        <p>{userInfo.nickName}</p>
                    </dd>
                </dl>
            </section>
            <section>
                <ul className="account-manage">
                    <li>
                        <span className="iconfont icon-file"></span>
                        <p>
                            <span className="title">账户管理</span>
                            <span className="iconfont icon-right-arrow"></span>
                        </p>
                    </li>
                    <li>
                        <span className="iconfont icon-file"></span>
                        <p onClick={this.toDeliveryList}>
                            <span className="title">地址管理</span>
                            <span className="iconfont icon-right-arrow"></span>
                        </p>
                    </li>
                    <li>
                        <span className="iconfont icon-file"></span>
                        <p>
                            <span className="title">联系客服</span>
                            <span className="iconfont icon-right-arrow"></span>
                        </p>
                    </li>
                </ul>
            </section>

        </div>
    }
    toDeliveryList(){
        this.props.history.push('/deliverylist')
    }
    toSetting() {
        this.props.history.push('/setting')
    }
}
export default connect(mapStateToProps)(Mine)