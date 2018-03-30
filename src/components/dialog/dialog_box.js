import React, {Component} from 'react'
let dialog_box_stlye={
    position:'absolute',
    top:'50%',
    left:'50%',
    width:"80%",
    height:"30%",
    background:'#fff',
    transform:'translate3d(-50%,-50%,0)',
    borderRadius:'10px'
}

class DialogBox extends Component{
    render(){
        return (
            <div className="dialog-box" style={dialog_box_stlye}>
                {this.props.children}
            </div>
        )
    }
}

export { DialogBox } 