import React from 'react';
import ReactDom from 'react-dom';
import { HashRouter as Router, Route, Link } from 'react-router-dom'; 

class Child1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bgColor: 'yellow'
        }
    }
    
    render(){
        return (
            <div>
                <p>Child1 conponent</p>
            </div>
        )
    }
}
class Child2 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bgColor: 'yellow'
        }
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
    
    ,document.getElementById('root'))