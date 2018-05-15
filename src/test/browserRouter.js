import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'; 

class Child1 extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div>
                    Child1 conponent
                    <Switch>
                        <Route exact path={`${this.props.match.path}`} render={(route) => {
                            return <div>当前组件是不带参数的Child1</div>
                        }} />
                        <Route path={`${this.props.match.path}/sub`} render={(route) => {
                            return <div>当前组件是带子路径为sub的Child1</div>
                        }} />
                        <Route path={`${this.props.match.path}/:id`} render={(route) => {
                            return <div>当前组件是带参数的Child1,参数是：{route.match.params.id}</div>
                        }} />
                        
                    </Switch>
            </div>
        )
    }
}
class Child2 extends React.Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return (
            <div>
                <p>Child2 conponent</p>
            </div>
        )
    }
}
class Wrapper extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <Link to='/a'>组件 Child1</Link>
                <br/> 
                <Link to='/a/132'>带参数的组件 Child1</Link>
                <br/>
                <Link to='/a/sub'>/a/sub</Link>
                <br/>
                <Link to='/b'>组件 Child2</Link> 
                {this.props.children}
            </div>
        )
    }
}

                
ReactDom.render(
    <Router>
        <Wrapper>
            <Route path='/a' component={Child1} />
            <Route path='/b' component={Child2} />
        </Wrapper>
    </Router>
    
    ,document.getElementById('app'))