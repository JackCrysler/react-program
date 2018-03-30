import {UPDATE_GOODS_COUNT,UPDATE_GOODS_SELECTED} from './../../store/reducers'
export default function mapDispatchToProps(dispatch){
    return {
        updateCount(count,id){
            dispatch({
                type:UPDATE_GOODS_COUNT,
                data:count,
                id
            })
        },
        toggleSelect(selected,id){
            dispatch({
                type:UPDATE_GOODS_SELECTED,
                data:selected,
                id
            })
        }
    }
}