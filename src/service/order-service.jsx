import MUtil from 'util/mm.jsx';
const _mm = new MUtil();

class Product {
    // 用户登录
    login(loginInfo){
        //return _mm.request({

        return _mm.request({ // 这里加不加 return 都会成功返回，因为_mm 的构造函数就是 promise 对象
            type: 'post',
            url: '/manage/user/login.do',
            data: loginInfo
        })
    }

    // 获取订单列表
     getOrderList(listParam){
        let url = '';
        let data = {};
        if(listParam.listType === 'list' ){
            url  = '/manage/order/list.do';
            data = {
                pageNum: listParam.pageNum
            }
        }else if(listParam.listType === 'search'){
            url  = '/manage/order/search.do';
            data = {
                pageNum     : listParam.pageNum,
                orderNo     : listParam.orderNo
            }
        }

        return _mm.request({
            type: 'post',
            url : url,
            data: data
        })
    }

    // 获取东单详情
    getOrderDetail(orderNo){
        return _mm.request({
            type : 'POST',
            url : '/manage/order/detail.do',
            data : {
                orderNo : orderNo
            }
        })
    }

    // 发货状态变更
    sendGoods(orderNo){
        return _mm.request({
            type : 'POST',
            url : '/manage/order/send_goods.do',
            data : {
                orderNo : orderNo
            }
        })
    }
}

export default Product;