import React,{Component} from 'react'
import ReactDOM from 'react-dom'
console.log(process.env.NODE_ENV)
require('isomorphic-fetch');
import {Provider} from 'react-redux'
import store from './store/store'

// config router 
import router from './router/router.config'
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import RouterWraper from './components/route'
import NoMatch from './views/route404/nomatch'

//font set & common style set
import fontset from './utils/fontset'
import './static/css/reset.css'
import './static/font/iconfont.css'
import './static/css/common.css'
import './static/css/goodsItem.scss'

//call react-dom to render root 
ReactDOM.render(<Provider store={store}>
    <BrowserRouter>
        <Switch>
            <Redirect exact from="/" to="/index/home"></Redirect>        
            <RouterWraper routes={router.routes}></RouterWraper>
        </Switch>
    </BrowserRouter>
</Provider>,
document.querySelector('#root'))