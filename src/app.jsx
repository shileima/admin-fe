import React        from 'react';
import ReactDom     from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'; 

import Layout       from 'component/layout/index.jsx';
import Home         from 'page/home/index.jsx';
import UserList     from 'page/user/index.jsx';
import OrderList    from 'page/order/index/index.jsx';
import Login        from 'page/login/index.jsx';
import ErrorPage    from 'page/error/index.jsx';

import ProductRouter from 'page/product/router.jsx';
import OrderDetail   from './page/order/detail.jsx';

class App extends React.Component{
    render(){
        let LayoutRouter = (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home} />
                    {/* <ProductRouter /> */} {/* 放这里会影响 user 的路由 */}  
                    <Route path="/user/list" component={UserList} />   
                    <Route path="/order/index" component={OrderList} />  
                    <Route path="/order/detail/:oid" component={OrderDetail} />  
                    <Redirect exact from="/user" to="/user/list" />
                    <Redirect exact from="/order" to="/order/list" />
                    <ProductRouter />                                         
                    <Route component={ErrorPage} />                            
                </Switch>
            </Layout>
        );
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        {/* props 去掉也可以运行 */}
                        <Route path="/" render={ (props) => LayoutRouter} />  
                    </Switch>  
                </Router>
            </div>
        )
    }
}

                
ReactDom.render(<App />,document.getElementById('app'))