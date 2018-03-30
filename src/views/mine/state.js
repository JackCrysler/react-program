export default function mapStateToProps(state){
    let userInfo=null;
    if(!state.user_info || !state.user_info.name){
        userInfo = JSON.parse(localStorage.getItem('user-info'))
    }else{
        userInfo = state.user_info
    }
    return {
        userInfo
    }
}