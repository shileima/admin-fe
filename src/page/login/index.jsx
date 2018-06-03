import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import './index.scss';

import User  from 'service/user-service.jsx';
import MUtil from 'util/mm.jsx';

const _mm =   new MUtil();
const _user = new User();

class Login extends React.Component{
    constructor(props){
        super()
        this.state = {
            username: '',
            password: '',
            redirect: _mm.getRedirect('redirect') || '/'
        }
    };
    onInputChange(e){
        let inputName  = e.target.name,
            inputValue = e.target.value;
        this.setState({
            [inputName]: inputValue
        })
    };
    onSubmit(e){
        let loginInfo = {
            username: this.state.username,
            password: this.state.password
        }
        let checkResult = _user.checkLoginInfo(loginInfo)
        if(checkResult.status){
            _user.login(loginInfo).then(res => {
                _mm.setStorage('userInfo',res)
                this.props.history.push(this.state.redirect)
            },errMsg => {
                _mm.errTips(errMsg);
            })
        }else{
            _mm.errTips(checkResult.msg)
        }
    };
    onInputKeyUp(e){
        if(e.keyCode === 13){
            this.onSubmit();
        }
    }
    componentWillMount(){
        document.title = '登录 - MMALL ADMIN'
    }
    render(){
        return <div className="row">
            <div className="col-md-4 col-md-offset-4">
                <div className="panel panel-default login-panel">
                    <div className="panel-heading">欢迎登录商城系统 MALL</div>
                    <div className="panel-body">
                        <div>
                            <div className="form-group">
                                <input 
                                    type = "text"
                                    name = 'username' 
                                    className = "form-control" 
                                    placeholder = "请输入用户名"
                                    onKeyUp  = {e => this.onInputKeyUp(e)}
                                    onChange = {e => this.onInputChange(e)}
                                />
                            </div>
                            <div className="form-group">
                            <input 
                                type = "password"
                                name = 'password'
                                className="form-control"
                                placeholder="请输入密码"
                                onKeyUp  = {e => this.onInputKeyUp(e)}
                                onChange = {e => this.onInputChange(e)}
                            />
                            </div>
                            <button
                                className = "btn btn-primary btn-lg btn-block"
                                onClick = {e => this.onSubmit(e)}
                            >登录</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}

export default Login;