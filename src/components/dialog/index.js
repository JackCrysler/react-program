import React, {Component} from 'react'
import { Masker } from './masker'
import { DialogBox } from './dialog_box'
import { DialogTitle, DialogInfo, DialogButtons } from './dialog_component'
import './dialog.css'
class Dialog extends Component{
    constructor(){
        super()
        this.close = this.close.bind(this)
    }

    close(){
        this.props.close()
        this.props.callback();
        
    }

    render(){
        return (
            <Masker>
                <DialogBox>
                    <DialogTitle>{this.props.title}</DialogTitle>
                    <DialogInfo>{this.props.info}</DialogInfo>
                    <DialogButtons close={this.props.close}>
                        <button onClick={this.close}>确定</button>
                        <button onClick={this.props.close}>取消</button>
                    </DialogButtons>
                </DialogBox>
            </Masker>
        )
    }
}

export default Dialog