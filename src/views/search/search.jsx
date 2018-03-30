import React, { Component } from 'react'
import './search.scss'
import {connect} from 'react-redux'
class Search extends Component {
    constructor() {
        super()
        this.state = {
            historylist: []
        }
        this.toSearch = this.toSearch.bind(this)
        this.clearHistory = this.clearHistory.bind(this)
        this.testSaga = this.testSaga.bind(this)
    }
    render() {
        let { historylist } = this.state;
        let {goodsList} = this.props;

        return <div id="search">
            <header><input type="text" ref="keyWords" /><button onClick={this.toSearch}>搜索</button></header>
            <section className="recent-search">
                <p>最紧搜索   <span onClick={this.clearHistory} className="iconfont icon-tips"></span></p>
                {historylist.length == 0 ? <p>暂无搜索记录...</p> :
                    <ul className="ks-clear">
                        {this.state.historylist.map((item, index) => {
                            return <li key={index} onClick={() => { this.toResult(item) }}>{item}</li>
                        })}
                    </ul>
                }
            </section>
            <section className="common-search">
                <p>大家都在搜</p>
                <ol className="ks-clear">
                    <li onClick={this.testSaga}>点我测试saga中间件</li>
                    <li>巧克力</li>
                </ol>
                <p>通过saga请求数据，将异步转同步，并且渲染结果：{goodsList.data&& goodsList.data.data[0].goods_name}</p>
            </section>
        </div>
    }
    testSaga(){
        this.props.dispatch({
            type:'GET_GOODS_LIST'
        })
    }
    clearHistory(){
        localStorage.removeItem('SearchHistory');
        this.setState({
            historylist:[]
        })
    }
    toSearch() {
        if (!this.refs.keyWords.value) return;
        let keyWords = this.refs.keyWords.value;
        let ls = localStorage;
        if (ls.getItem('SearchHistory')) {
            let shArr = JSON.parse(ls.getItem('SearchHistory'));
            if (shArr.indexOf(keyWords) > -1) return;
            shArr.push(keyWords);
            ls.setItem('SearchHistory', JSON.stringify(shArr))
        } else {
            ls.setItem('SearchHistory', JSON.stringify([keyWords]))
        }
        this.props.history.push('/index/result', {
            key_words: keyWords
        })
    }
    toResult(keyWords) {
        this.props.history.push('/index/result', {
            key_words: keyWords
        })
    }
    componentDidMount() {
        if (localStorage.getItem('SearchHistory')) {
            this.setState({
                historylist: JSON.parse(localStorage.getItem('SearchHistory'))
            })
        }
    }
}
export default connect(function(state){
    return {
        goodsList:state.goods_list
    }
},null,null,{pure:false})(Search)