import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import './index.scss';
import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class Login extends React.Component{
    constructor(props){
        super()
        this.state = {
            username: '',
            password: ''
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
        console.log(e)
        _mm.request({
            url: 'http://www.baidu.com'
        })
    };
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
                                    onChange = {e => this.onInputChange(e)}
                                />
                            </div>
                            <div className="form-group">
                            <input 
                                type = "password"
                                name = 'password'
                                className="form-control"
                                placeholder="请输入密码"
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