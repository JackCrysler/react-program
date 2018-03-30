export default function mapStateToProps(state){
    //遍历cartList 计算总价
    let totalCost=0;
    let selectAll = true;//默认全选
    state.cart_list.forEach((item,index)=>{
        if(item.selected==1){
            totalCost+=(item.discount_price*item.count)
        }
        if(item.selected==0){
            selectAll = false
        }
    })


    return {
        cartList:state.cart_list,
        totalCost,
        selectAll
    }
}