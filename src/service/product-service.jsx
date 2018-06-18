import MUtil from 'util/mm.jsx';
const _mm = new MUtil();

class User {
    // 用户登录
    login(loginInfo){
        //return _mm.request({

        return _mm.request({ // 这里加不加 return 都会成功返回，因为_mm 的构造函数就是 promise 对象
            type: 'post',
            url: '/manage/user/login.do',
            data: loginInfo
        })
    }

    // 获取用户列表
    getProductList(pageNum){
        return _mm.request({
            type: 'post',
            url : '/manage/product/list.do',
            data: {
                pageNum: pageNum
            }
        })
    }
}

export default User;