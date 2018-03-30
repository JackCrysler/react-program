import React, {Component} from 'react'
let mask_stlye={
    position:'fixed',
    top:0,
    left:0,
    width:"100%",
    height:"100%",
    background:'rgba(0,0,0,0.7)'
}

class Masker extends Component{
    render(){
        return (
            <div className="dialog-masker" style={mask_stlye}>
                {this.props.children}
            </div>
        )
    }
}

export { Masker } 