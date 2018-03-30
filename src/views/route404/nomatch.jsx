import React,{Component} from 'react'

class NoMatch extends Component{
    render(){
        return <div>
        <img src={require('../../static/img/nomatch.svg')} alt=""/>
        </div>
    }
}

export default NoMatch