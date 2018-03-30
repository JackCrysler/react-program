export default function mapDispatch(dispatch){
    return {

        getDelivery(){
            dispatch({
                type:'GET_DELIVERY_LIST'
            })
        },
        toEditDelivery(index){
            dispatch({
                type:'EDIT_DELIVERY',
                data:index
            })
        },
        toDeleteDelivery(index){
            dispatch({
                type:'DELETE_DELIVERY',
                data:index
            })
        }
    }
}