import React from 'react';
import ReactDom from 'react-dom';

class Child extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bgColor: 'yellow'
        }
    }
    handleClick(){
        //将父组件的函数通过 props 传递给子组件来执行
        this.props.changeColor("red")
    }
    render(){
        return (
            <div>
                <p>I am 21 years old，and you?</p>
                <button onClick={()=>{this.handleClick()}} style={{cursor: "pointer"}}>子组件改变父组件值</button>
            </div>
        )
    }
}

class Father extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bgColor: 'grey'
        }
    }
    changeBgcolor(color){
        this.setState({
            bgColor: color
        })
    }
    render(){
        return (
            <div style={{backgroundColor:this.state.bgColor}}>
                将父组件的函数通过 props 值 changeColor 来传递给子组件来执行
                <Child changeColor={(color)=>{this.changeBgcolor(color)}}/>
            </div>
        )
    }
}

                
ReactDom.render(<Father />,document.getElementById('root'))