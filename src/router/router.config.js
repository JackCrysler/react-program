import React,{Component} from 'react'
import Loadable from 'react-loadable'
import {Loading} from '../components/notify'

let Login = Loadable({
    loader:()=>import(/* webpackChunkName:'login' */'../views/login'),
    loading(){
        return <Loading>loading....</Loading>
    }
})

//import Login from '../views/login'
import Register from '../views/register'
import Setting from '../views/setting'
import Index from '../views/index'
import Home from '../views/home'
import Detail from '../views/detail'
import Cart from '../views/cart'
import Catagory from '../views/catagory'
import Mine from '../views/mine'
import Consignee from '../views/consignee'
import DeliveryList from '../views/deliveryList'
import List from '../views/list'
import Search from '../views/search/search'
import SearchResult from '../views/result'
//404页面
import NoMatch from '../views/route404/nomatch'
let router={
    routes:[
        {
            path:'/detail',
            component:Detail
        },
        {
            path:'/login',
            component:Login
        },
        {
            path:'/register',
            component:Register
        },
        {
            path:'/setting',
            component:Setting
        },
        {
            path:'/consignee',
            component:Consignee
        },
        {
            path:'/deliverylist',
            component:DeliveryList
        },
        {
            path:"/index",
            component:Index,
            children:[
                {
                    path:"/index/home",
                    component:Home
                },
                {
                    path:"/index/catagory",
                    component:Catagory
                },
                {
                    path:"/index/cart",
                    component:Cart,
                    authorization:true
                },
                {
                    path:"/index/mine",
                    component:Mine,
                    authorization:true
                },
                {
                    path:"/index/search",
                    component:Search
                },
                {
                    path:"/index/result",
                    component:SearchResult
                }
            ]
        },
        {
            component:NoMatch
        }
    ]
}

export default router