import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom';
import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class TopNav extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            username: _mm.getStorage('userInfo').username || '匿名用户'
        }
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
                            <span>欢迎，{this.state.username}</span>
                            <i className="fa fa-caret-down"></i>
                        </a>
                        <ul className="dropdown-menu dropdown-user">
                            <li><a href="#"><i className="fa fa-user fa-fw"></i> User Profile</a>
                            </li>
                            <li><a href="#"><i className="fa fa-gear fa-fw"></i> Settings</a>
                            </li>
                            <li className="divider"></li>
                            <li><a href="#"><i className="fa fa-sign-out fa-fw"></i> Logout</a>
                            </li>
                        </ul>
                        
                    </li>       
                </ul>
            </div>
    }
}

export default TopNav;