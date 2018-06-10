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
    // 验证登录数据是否合法
    checkLoginInfo(loginInfo){
        let username = $.trim(loginInfo.username);
        let password = $.trim(loginInfo.password);
        if(typeof username != 'string' || username.length === 0){
            return {
                status: 0,
                msg: '用户名填写不正确'
            }
        }
        if(typeof password != 'string' || password.length === 0){
            return {
                status: 0,
                msg: '密码填写不正确'
            }
        }
        return {
            status: 1,
            msg: '验证通过！'
        }
    }

    // 退出请求
    logout(){
        return _mm.request({
            type : 'post',
            url  : '/user/logout.do'
        })
    }

    // 获取用户列表
    getUserList(pageNum){
        return _mm.request({
            type: 'post',
            url : '/manage/user/list.do',
            data: {
                pageNum: pageNum
            }
        })
    }
}

export default User;