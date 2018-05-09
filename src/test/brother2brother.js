import React from 'react';
import ReactDom from 'react-dom';

class Child1 extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            bgColor: 'yellow'
        }
    }
    handleClick(){
        //将父组件的函数通过 props 传递给子组件来执行
        this.props.changeChild2Color("red")
    }
    render(){
        return (
            <div>
                <p>Child1: I am 21 years old，and you?</p>
                <button onClick={()=>{this.handleClick()}} style={{cursor: "pointer"}}>子组件改变父组件值</button>
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
    handleClick(){
        //将父组件的函数通过 props 传递给子组件来执行
        this.props.changeColor("red")
    }
    render(){
        return (
            <div style={{backgroundColor: this.props.bgColor}}>
                <p>Child2: 我的背景色是 {this.props.bgColor}</p>
            </div>
        )
    }
}
class Father extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            child2BgColor: 'grey'
        }
    }
    onChild2BgColorChange(color){
        this.setState({
            child2BgColor: color
        })
    }
    render(){
        return (
            <div>
                兄弟组件见通信：点击 child1的按钮改变 child2 的背景色
                <Child1 changeChild2Color={(color)=>{this.onChild2BgColorChange(color)}}/>
                <Child2 bgColor={this.state.child2BgColor}/>
            </div>
        )
    }
}

                
ReactDom.render(<Father />,document.getElementById('root'))