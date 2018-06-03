class MUtil{
    // Ajax 请求后端数据
    request(param){
        return new Promise((resolve, reject) => {
            $.ajax({
                type     : param.type || 'get',
                url      : param.url || '',
                dataType : param.dataType || 'json',
                data     : param.data || null,
                success(res){
                    if(res.status === 0){
                        typeof resolve === 'function' && resolve(res.data,res.msg);
                    }
                    else if(res.status === 10){
                        this.doLogin();
                    }
                    else{
                        typeof reject === 'function' && reject(res.msg,res.data);
                    }
                },
                error(err){
                    typeof reject === 'function' && reject(err.statusText);

                }
            });
        });
    }
    // 未登录状态，跳转登录页面
    doLogin(){
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname)
    }
    // 获取 登陆后跳转地址
    getRedirect(name){
        return window.location.href.split(name + '=')[1]
    }
    // 获取 错误提示
    errTips(errMsg){
        alert(errMsg || '好像哪里不对了~')
    }
    // 本地存储内容
    setStorage(name, data){
        let storageDataType = typeof data;
        if(storageDataType === 'object'){
            window.localStorage.setItem(name,JSON.stringify(data))
        }
        else if(['string','boolean','number'].indexOf(storageDataType)){
            window.localStorage.setItem(name,data)
        }
        else{
            alert('该类型不能用于本地存储')
        }
    }

    // 取本地存储内容
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data)
        }
        else{
            return ''
        }
    }

    // 删除本地存储
    deleteStorage(name){
        window.localStorage.removeItem(name);
    }
}

export default MUtil;