import React, {Component} from 'react'
import propTypes from 'prop-types'
let dialog_title_stlye={
    
}

class DialogTitle extends Component{
    render(){
        return (
            <div className="dialog-title" style={dialog_title_stlye}>
                <h1>{this.props.children}</h1>
            </div>
        )
    }
}
DialogTitle.propTypes={
    'children':propTypes.string
}


let dialog_box_stlye = {

}

class DialogInfo extends Component{
    render(){
        return (
            <div className="dialog-info" style={dialog_box_stlye}>
                {this.props.children}
            </div>
        )
    }
}

const dialog_buttons_stlye = {

}

class DialogButtons extends Component{
    componentDidMount(){
        console.log(this.props)
    }
    render(){
        return (
            <div className="dialog-buttons" style={dialog_buttons_stlye}>
                {this.props.children}
            </div>
        )
    }
}


export { DialogTitle,DialogInfo,DialogButtons } 