import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import MUtil from 'util/mm.jsx';
import User  from 'service/user-service.jsx';

const _mm   = new MUtil();
const _user = new User();

class TopNav extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: _mm.getStorage('userInfo').username || ''
        }
    }
    onLogout(){
        _user.logout().then(res => {
            console.log(this)
            _mm.deleteStorage('userInfo');
            /* this.props.history.push('/login'); */ // 这里的 this.props 是空的，没有继承路由里面的内容
            window.location.href = '/login';
        },errMsg => {
            _mm.errTips(errMsg)
        })
    }
    render(){
        return <div className="navbar navbar-default top-navbar">
                <div className="navbar-header">
                    <Link className="navbar-brand" to="/"><b>HAPPY</b>MALL</Link>
                </div>
                <ul className="nav navbar-top-links navbar-right">         
                    <li className="dropdown">
                        <a className="dropdown-toggle" data-toggle="dropdown" href="javascript:;" aria-expanded="false">
                            <i className="fa fa-user fa-fw"></i> 
                            {
                                this.state.username
                                ? <span>欢迎，{this.state.username}</span>
                                : <span>欢迎您</span>
                            }
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li><a href="#" onClick={() => this.onLogout()}><i className="fa fa-sign-out fa-fw"></i>Logout</a>
                            </li>
                        </ul>
                        
                    </li>       
                </ul>
            </div>
    }
}

export default TopNav;