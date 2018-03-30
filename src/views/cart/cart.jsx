import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import mapStateToProps from './state'
import mapDispatchToProps from './dispatch'
import './cart.scss'
import CartItem from '../../components/cartItem/cartItem'
import Loading from '../../components/notify'
class Cart extends PureComponent {
    constructor() {
        super()
        this.state = {
            str: "all",
            edit: '编辑',
            pay:"结算"
        }
        this.cartEdit = this.cartEdit.bind(this)
        this.toDelGoods = this.toDelGoods.bind(this)
    }
    render() {
        let { str, edit, pay } = this.state;
        let { cartList, totalCost, selectAll, toggleSelectAll } = this.props;
        return (
            <div id="cart">
                <Loading container={'#cart'} type="loading" ref="loading" />
                <header>购物车 <span className="edit" onClick={this.cartEdit}>{edit}</span></header>
                <div className="goods-list">
                    <ul>
                        {
                            cartList.map((item, index) => {
                                return <CartItem key={'cartItem' + index} item={item}></CartItem>
                            })
                        }
                    </ul>
                </div>
                <footer>
                    <div onClick={() => {
                        this.setState({
                            str: str == "all" ? 'none' : 'all'
                        });
                        toggleSelectAll(str)
                    }}>全选<span className={"select-btn iconfont " + (selectAll ? 'icon-selected' : '')}></span></div>
                    <div>总价<span className="total-cost">￥{totalCost}</span><span className="cart-btn" onClick={this.toDelGoods}>{pay}</span></div>
                </footer>
            </div>
        )
    }
    cartEdit() {
        this.setState({
            edit: this.state.edit == '编辑' ? "完成" : "编辑",
            pay: this.state.edit == '编辑' ? "删除" : "结算"
        })
    }
    toDelGoods(){
        if(this.state.pay=='结算') return; 
        let selectedID=[];
        this.props.cartList.forEach(item=>{
            if(item.selected==1){
                selectedID.push(item.goods_id)
            }
        })
        this.refs.loading.mountNotify()
        this.props.delCartGoods(selectedID,function(){
            if(this.refs.loading){ this.refs.loading.unMountNotify()}
        }.bind(this))

    }
    componentDidMount() {
        //console.log(this.props)
        this.refs.loading.mountNotify()
        this.props.fetchGoodsList(this.props.history,function(){
            if(this.refs.loading){ this.refs.loading.unMountNotify()}
        }.bind(this))
    }
    componentDidUpdate() {
        //console.log('updated')
        //this.forceUpdate()
    }
    componentWillUnmount(){
        //console.log('willUnmount')
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)