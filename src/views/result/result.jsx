import React,{Component} from 'react'

class Result extends Component{
    render(){
        return <h1>Result</h1>
    }
    componentDidMount(){
        let {location} = this.props;
    }
}

export default Result