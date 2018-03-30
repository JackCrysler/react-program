//中间件 ： 在action到reducer中间添加一些逻辑，监听action触发新的action

import {takeEvery,takeLatest,call,put,all} from 'redux-saga/effects'

import {$http,getCookie} from '../utils/utils'
import {DELIVERY_LIST,DELIVERY_LIST_ERR} from '../store/reducers'
//每一个saga就是一个sagagenerator函数

//worker saga
function* fetchData(){
    //使用call去请求数据，call(fn,param)，即fn(param)
    //实现异步转同步
    try{
        let res = yield call($http.post,'/mall/index/getGoodsChannel',{channel_id:3});

        console.log('数据请求成功')
        //saga中替代dispatch来触发action的函数
        yield put({
            type:"TEST_SAGA",
            data:JSON.parse(res)
        })
    }
    catch(err){
        yield put({
            type:"TEST_SAGA_ERROR",
            data:err
        })
    }    
}

function* fetchDelivery(){
    try{
        let res = yield call($http.post,'/user/Mail/list',{token:getCookie('token')});
        yield put({
            type:DELIVERY_LIST,
            data:res
        })
    }
    catch(err){
        yield put({
            type:DELIVERY_LIST_ERR,
            data:res
        })
    }
}
 
function* editDelivery(action){
    try{
        let res = yield call($http.post,'/user/Mail/editlist',{token:getCookie('token'),index:action.data});
        yield put({
            type:"EDIT_DELIVERY_INFO",
            data:res
        })
    }
    catch(err){
        yield put({
            type:"EDIT_DELIVERY_INFO_ERR",
            data:res
        })
    }
}

function* deleteDelivery(action){
    try{
        let res = yield call($http.post,'/user/Mail/deletelist',{token:getCookie('token'),index:action.data});
        console.log(res)
        if(res.success==1){
            yield put({
                type:"DELETE_DELIVERY_INFO",
                data:res.leftList
            })
        }else{
            console.log(err)    
        }
        
    }
    catch(err){
        console.log(err)
    }
}

function* fetchPCR(action){
    try{
        let PCR = yield $http.get('/user/Mail/pcr');
        
        yield put({
            type:'GET_PCR_DATA',
            data:PCR
        })
        action.fn()
    }
    catch(err){
        console.log(err)
    }
}

//watcher saga
function* watchFetch(){
    //监听每一个type为GET_GOODS_LIST的action
    yield takeLatest(['GET_GOODS_LIST'],fetchData)
}

function* watchDelivery(){
    yield takeEvery(['GET_DELIVERY_LIST'],fetchDelivery)
}

function* watchEditDelivery(){
    yield takeEvery(['EDIT_DELIVERY'],editDelivery)
}

function* watchDeleteDelivery(){
    yield takeEvery(['DELETE_DELIVERY'],deleteDelivery)
}

function* watchPCRdata(){
    yield takeEvery(['PCR_DATA'],fetchPCR)
}


export default function* rootSaga(){
    yield all([watchFetch(),watchDelivery(),watchEditDelivery(),watchDeleteDelivery(),watchPCRdata()])
}
