import React,{Component} from 'react'
import $http from '../../utils/http'
import SwiperComponent from '../../components/swiper/swiper'
import './home.scss'
import GoodsItem from '../../components/goodsItem/goodsItem'
import Notify from '../../components/notify'
class Home extends Component{
    constructor(){
        super()
        this.state={
            goodslist:[],
            channel_id:4,
            caniquery:true
        }
        this.toSearch=this.toSearch.bind(this)
        this.scrolling = this.scrolling.bind(this)
    }
    toSearch(){
        let {history} = this.props;
        history.push('/index/search')
    }
    render(){
        return <div id="home" onScroll={this.scrolling} ref="scroller">
            <div ref="doc">
                <header><input type="text" onFocus={this.toSearch} /></header>
                <div>
                    <SwiperComponent></SwiperComponent>
                </div>
                <section className="home-cat ks-clear">
                    <dl>
                        <dt><img src={require('../../static/img/1.png')} alt=""/></dt>
                        <dd>家乡味道</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/2.png')} alt=""/></dt>
                        <dd>进口食品</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/3.png')} alt=""/></dt>
                        <dd>家乡味道</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/4.png')} alt=""/></dt>
                        <dd>进口食品</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/1.png')} alt=""/></dt>
                        <dd>家乡味道</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/2.png')} alt=""/></dt>
                        <dd>进口食品</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/3.png')} alt=""/></dt>
                        <dd>家乡味道</dd>
                    </dl>
                    <dl>
                        <dt><img src={require('../../static/img/4.png')} alt=""/></dt>
                        <dd>进口食品</dd>
                    </dl>
                </section>
                <div className="goods-list ks-clear">
                    {
                        this.state.goodslist.map((item,index)=>{
                            return <GoodsItem key={index} data={item} history={this.props.history} location={this.props.location}></GoodsItem>
                        })
                    }
                </div>
                <Notify ref="notify" container={'#index .content'}/>
            </div>
        </div>
    }
    componentDidMount(){
        window.mountNotify = this.refs.notify.mountNotify;
        
        $http.post('/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
        .then(res=>{
            this.setState({
                goodslist:JSON.parse(res).data.data||[]
            })
        })
    }
    scrolling(){
        if(this.state.channel_id>9)return; 
        if(!this.state.caniquery) return; 
        let {scroller,doc} = this.refs
        let st = scroller.scrollTop;
        let sw = scroller.offsetHeight;
        let dh = doc.offsetHeight;

        if(dh-(st+sw)<50){
            this.setState({
                caniquery:false
            })
            console.log('满足条件，请求数据...')
            this.setState({
                channel_id:++this.state.channel_id
            })
            let {goodslist} = this.state;
            $http.post('/mall/index/getGoodsChannel',{channel_id:this.state.channel_id})
            .then(res=>{
                this.setState({
                    goodslist:[...goodslist,...JSON.parse(res).data.data]
                })
                this.setState({
                    caniquery:true
                })
            })
        }
    }
}

export default Home