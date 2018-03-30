import React, { Component } from 'react'
import Header from '../../components/header'
import Button from '../../components/button'
import $http from '../../utils/http'
import { getCookie } from '../../utils/utils'
import Loading from '../../components/notify'
import Dialog from '../../components/dialog'
import './deliveryList.scss'
import { connect } from 'react-redux'
import mapStateToProps from './state'
import mapDispatchToProps from './dispatch'
class DeliveryList extends Component {
    constructor() {
        super()
        this.toConsignee = this.toConsignee.bind(this)
    }
    render() {
        let { history, deliveryList } = this.props;
        return (
            <div id="delivery">
                <header>
                    <Header history={history}><h1>收货地址</h1></Header>
                </header>
                <section>
                    {deliveryList.length == 0
                        ?
                        <p>目前没有邮寄地址信息。</p>
                        :
                        <ul>
                            {deliveryList.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <p>{item.name+" "+item.phone}</p>
                                        <p>{item.province+item.city+item.region+item.address}</p>
                                        <div><span onClick={()=>{this.toEdit(index)}}>编辑</span><span onClick={()=>{this.toDelete(index)}}>删除</span></div>
                                    </li>
                                )
                            })}
                        </ul>
                    }
                </section>
                <Button onClick={this.toConsignee}><span className="iconfont icon-tips"></span>添加地址</Button>
                <Loading container="#delivery" type="loading" ref="loading" />
            </div>
        )

    }

    toConsignee() {
        this.props.history.push('/consignee')
    }
    toEdit(index){
        this.props.toEditDelivery(index);
        this.props.history.push('/consignee');
    }
    toDelete(index){
        
        this.refs.loading.mountNotify()
        this.props.toDeleteDelivery(index)
    }
    componentWillMount() {

    }
    componentDidMount() {
        this.props.getDelivery()
        this.refs.loading.mountNotify()
    }
    componentDidUpdate() {
        if (this.props.deliveryList.length > 0) {
            this.refs.loading.unMountNotify()
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DeliveryList)