import React from 'react';
import ReactDom from 'react-dom';

class Component extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name:'Loading',
            age : 20
        }
    }
    handleClick(){
        this.setState({
            age: this.state.age + 1
        })
    }
    render(){
        return (
            <div>
                <h1>Hello,I am {this.state.name}</h1>
                <p>I am {this.state.age} years old</p>
                <button onClick={()=>{this.handleClick()}}>加一岁</button>
            </div>
        )
    }
}
                
ReactDom.render(<Component/>,document.getElementById('root'))