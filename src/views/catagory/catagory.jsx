import React,{Component} from 'react'
import './catagory.scss'
import $http from '../../utils/http'
class Catagory extends Component{
    constructor(){
        super()
        this.state={
            activeIndex:0
        }
    }
    render(){
        let catList=['家乡味道','进口食品','牛奶乳品','休闲零食','生鲜果蔬','米面粮油','调味调料','酒水饮料']
        return <div id="catagory">
        <header><input type="text"/></header>
        <div className="catagory-wrap ks-clear">
            <div className="left-side">
                <ul>
                    {
                        catList.map((item,index)=>{
                            return <li className={this.state.activeIndex==index?'catagory-active':''} key={index} onClick={()=>{this.toggleActive(index)}}>{item}</li>
                        })
                    }
                </ul>
            </div>
            <div className="right-side">
                
            </div>
        </div>
        
        </div>
    }
    toggleActive(idx){
        /* $http.get('/mobile/Category/categorySon',{sonid:idx+1}).then((res)=>{
            console.log(res)

        }) */

        //$http.jsonp('http://apis.map.qq.com/ws/geocoder/v1/?location=36,113&key=7SFBZ-SLNRP-UTZDY-VMH2X-NQG5T-D3FRF&output=jsonp&callback=findLocation','findLocation').then(res=>{console.log(res)})

        this.setState({
            activeIndex:idx
        })
    }
}
export default Catagory