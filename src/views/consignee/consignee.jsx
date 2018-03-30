import React,{Component,PureComponent} from 'react'
import propTypes from 'prop-types'
import Header from '../../components/header'
import Button from '../../components/button'
import './consignee.scss'
import $http from '../../utils/http'
import {getCookie} from '../../utils/utils'
import Notify from '../../components/notify'
import {connect} from 'react-redux'
class Input extends Component{
    constructor(){
        super()
        this.getVal = this.getVal.bind(this)
    }
    render(){
        return <input type="text" ref={e=>{e&&(e.value=this.props.value||'')}} onChange={this.getVal} placeholder={this.props.placeholder}/>
    }
    getVal(e){
        this.props.onChange(e.target.value)
    }
    shouldComponentUpdate(props,state){
        if(props.value){
            return true
        }
        return false
        
    }
}

Input.propTypes = {
    onChange:propTypes.func.isRequired
}

class Select extends Component{
    constructor(){
        super()
        this.getVal=this.getVal.bind(this)
    }
    render(){
        let {data} = this.props;
        
        return <select name="" id="" onChange={this.getVal}>
            <option value="0">请选择</option>
            {   
                data && data.map((item,index)=>{
                    return item.name?<option key={index} value={item.name}>{item.name}</option>:<option key={index} value={item}>{item}</option>
                })
            }
        </select>
    }
    getVal(e){
        this.props.onChange(e.target.value)
    }
}

Select.propTypes = {
    onChange:propTypes.func.isRequired
}

class Consignee extends Component{
    constructor(){
        super()
        this.toSave = this.toSave.bind(this)
        this.inputChange = this.inputChange.bind(this)
        this.name="";
        this.phone="";
        this.address='';
        this.state={
            notifyType:'loading',
            cities:[],
            regions:[]
        }
        this.reRenderCity = this.reRenderCity.bind(this)
        this.reRenderRegion = this.reRenderRegion.bind(this)
    }
    reRenderCity(province){
        let {pcrData} = this.props;

        pcrData.forEach(item=>{
            if(item.name==province){
                this.setState({
                    cities:item.city
                })
                return
            }
        })
    }
    reRenderRegion(city){
        let {cities} = this.state;
        cities.forEach(item=>{
            if(item.name==city){
                this.setState({
                    regions:item.area
                })
                return
            }
        })
    }
    render(){
        let {editInfo,pcrData} = this.props;
        this.name=editInfo && editInfo.name;
        this.phone=editInfo && editInfo.phone;
        this.address=editInfo && editInfo.address;
        let {cities,regions} = this.state;
        return (
            <div id="consignee">
                <Header history={this.props.history}><h1>{editInfo ?'修改邮寄地址':'添加邮寄地址'}</h1></Header>
                <section>
                    <Input placeholder="收货人姓名" onChange={(val)=>{this.inputChange('name',val)}} value={editInfo && editInfo.name} />
                    <Input placeholder="手机号" onChange={(val)=>{this.inputChange('phone',val)}} value={editInfo && editInfo.phone} />
                    <Select onChange={(val)=>{this.inputChange('province',val);this.reRenderCity(val)}} data={pcrData}></Select>
                    <Select onChange={(val)=>{this.inputChange('city',val);this.reRenderRegion(val)}} data={cities}></Select>
                    <Select onChange={(val)=>{this.inputChange('region',val)}} data={regions} ></Select>
                    <Input placeholder="详细地址" onChange={(val)=>{this.inputChange('address',val)}} value={editInfo && editInfo.address}  />
                </section>
                <Button onClick={this.toSave}>保存</Button>
                <Notify container="#consignee" type={this.state.notifyType} ref="tips"/>
            </div>
        )
    }
    inputChange(a,b){
        this[a] = b;
    }
    toSave(){
        this.setState({
            notifyType:'notify'
        })
        let reg_exp_name=/([A-Za-z\d\u4e00-\u9fa5]+)$/g;
        let reg_exp_phone = /^1[3578]\d{9}$/;
        let {tips} = this.refs;
        if(!reg_exp_name.test(this.name)){
            tips.mountNotify('请输入用户名')
            return;
        }
        if(!reg_exp_phone.test(this.phone)){
            tips.mountNotify('请输入手机号')
            return;
        }
        if(!this.province || !this.city || !this.region){
            tips.mountNotify('请选择省市区')
            return;
        }
        if(!this.address){
            tips.mountNotify('请填写街道')
            return;
        }

        $http.post('/user/Mail/addNew',{
            name:this.name,
            phone:this.phone,
            province:this.province,
            city:this.city,
            region:this.region,
            address:this.address,
            token:getCookie('token')
        }).then((res)=>{
            if(res.success==1){
                this.props.history.replace('/deliverylist')
            }

        })
    }
    componentDidMount(){
        this.refs.tips.mountNotify()
        this.props.fetchPCR(()=>{
            this.refs.tips.unMountNotify()
        })
    }
}
export default connect(function(state){
    return {    
        editInfo:state.edit_info,
        pcrData:state.pcr_data
    }
},function(dispatch){
    return {
        fetchPCR(callback){
            dispatch({
                type:'PCR_DATA',
                fn:callback
            })           
        }
    }
})(Consignee)